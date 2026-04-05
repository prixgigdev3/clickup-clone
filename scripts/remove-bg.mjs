import sharp from 'sharp';
import { readdir, copyFile } from 'fs/promises';
import { join } from 'path';

const imagesDir = join(process.cwd(), 'public/images');

async function removeBackground(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  const rawBuffer = await image
    .ensureAlpha()
    .raw()
    .toBuffer();

  const pixels = new Uint8Array(rawBuffer);

  // Sample bg color from edges (multiple points along all 4 edges)
  let bgSamples = [];
  for (let x = 0; x < width; x += Math.floor(width / 20)) {
    for (const y of [0, 1, 2, height - 1, height - 2, height - 3]) {
      const idx = (y * width + x) * 4;
      bgSamples.push([pixels[idx], pixels[idx + 1], pixels[idx + 2]]);
    }
  }
  for (let y = 0; y < height; y += Math.floor(height / 20)) {
    for (const x of [0, 1, 2, width - 1, width - 2, width - 3]) {
      const idx = (y * width + x) * 4;
      bgSamples.push([pixels[idx], pixels[idx + 1], pixels[idx + 2]]);
    }
  }

  // Compute median bg color (more robust than mean)
  bgSamples.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]));
  const mid = Math.floor(bgSamples.length / 2);
  const bgR = bgSamples[mid][0];
  const bgG = bgSamples[mid][1];
  const bgB = bgSamples[mid][2];

  console.log(`  BG color (median): rgb(${bgR}, ${bgG}, ${bgB})`);

  // First pass: flood-fill from edges to find background region
  // This is more accurate than pure color matching
  const isTransparent = new Uint8Array(width * height); // 0 = opaque, 1 = transparent

  const threshold = 42;

  function colorDist(idx) {
    const r = pixels[idx * 4];
    const g = pixels[idx * 4 + 1];
    const b = pixels[idx * 4 + 2];
    const dr = r - bgR;
    const dg = g - bgG;
    const db = b - bgB;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  // Flood fill from all edge pixels
  const queue = [];
  // Add all edge pixels that match bg
  for (let x = 0; x < width; x++) {
    if (colorDist(x) < threshold) queue.push(x); // top row
    const bottomIdx = (height - 1) * width + x;
    if (colorDist(bottomIdx) < threshold) queue.push(bottomIdx);
  }
  for (let y = 0; y < height; y++) {
    const leftIdx = y * width;
    if (colorDist(leftIdx) < threshold) queue.push(leftIdx);
    const rightIdx = y * width + (width - 1);
    if (colorDist(rightIdx) < threshold) queue.push(rightIdx);
  }

  // BFS flood fill
  const visited = new Uint8Array(width * height);
  for (const idx of queue) {
    visited[idx] = 1;
    isTransparent[idx] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);

    const neighbors = [];
    if (x > 0) neighbors.push(idx - 1);
    if (x < width - 1) neighbors.push(idx + 1);
    if (y > 0) neighbors.push(idx - width);
    if (y < height - 1) neighbors.push(idx + width);

    for (const nIdx of neighbors) {
      if (visited[nIdx]) continue;
      visited[nIdx] = 1;

      if (colorDist(nIdx) < threshold) {
        isTransparent[nIdx] = 1;
        queue.push(nIdx);
      }
    }
  }

  // Apply transparency
  for (let i = 0; i < width * height; i++) {
    if (isTransparent[i]) {
      pixels[i * 4 + 3] = 0;
    }
  }

  // Edge softening pass - smooth the boundary
  const output = new Uint8Array(pixels);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (isTransparent[idx]) continue;

      // Count transparent neighbors in 3x3
      let tCount = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          if (isTransparent[(y + dy) * width + (x + dx)]) tCount++;
        }
      }

      // Soften edges
      if (tCount >= 6) {
        output[idx * 4 + 3] = Math.round(output[idx * 4 + 3] * 0.15);
      } else if (tCount >= 4) {
        output[idx * 4 + 3] = Math.round(output[idx * 4 + 3] * 0.4);
      } else if (tCount >= 2) {
        output[idx * 4 + 3] = Math.round(output[idx * 4 + 3] * 0.75);
      }
    }
  }

  await sharp(Buffer.from(output.buffer), {
    raw: { width, height, channels: 4 }
  })
    .png()
    .toFile(outputPath);
}

async function main() {
  // First, re-copy originals from Downloads so we work on fresh copies
  const downloads = '/Users/johnnynel/Downloads';
  const mapping = [
    ['hf_20260325_120842_f16422a4-cd80-4e07-b3c8-79dfc513d6e6.png', 'agent-1-beard-green.png'],
    ['hf_20260325_122017_075bfd73-3ae6-4d15-9639-754ffc7450f7.png', 'agent-2-redhead.png'],
    ['hf_20260325_122024_55233b7b-6472-4176-b81a-5302f6310411.png', 'agent-3-black-woman.png'],
    ['hf_20260325_122031_bc8af375-333a-45a7-8999-d0f546fc012c.png', 'agent-4-asian.png'],
    ['hf_20260325_122041_88c84bfd-8b73-4222-aad3-4eb4e84d8631.png', 'agent-5-curly-woman.png'],
    ['hf_20260325_122056_2d03d0ea-0499-4cf7-96d9-46f2acbb9fc7.png', 'agent-6-bob-woman.png'],
    ['hf_20260325_122105_8817ca25-ba7c-4478-90c9-ae415277d080.png', 'agent-7-blonde.png'],
    ['hf_20260325_122001_b4579152-62a3-49ac-9d42-082092685687.png', 'agent-8-older.png'],
    ['hf_20260325_122048_e1d2748c-aad9-44da-bcb7-5c39fa9c968b.png', 'agent-9-latino.png'],
    ['hf_20260325_122122_0361ad3d-3f06-4085-850e-b6b0c7cf8695.png', 'agent-10-grey-afro.png'],
    ['hf_20260325_120842_f16422a4-cd80-4e07-b3c8-79dfc513d6e6.png', 'agent-dark.png'],
  ];

  console.log('Re-copying originals from Downloads...');
  for (const [src, dest] of mapping) {
    await copyFile(join(downloads, src), join(imagesDir, dest));
  }

  console.log(`\nProcessing ${mapping.length} agent images with flood-fill bg removal...`);

  for (const [, file] of mapping) {
    const filePath = join(imagesDir, file);
    console.log(`Processing: ${file}`);
    await removeBackground(filePath, filePath);
    console.log(`  ✓ ${file}`);
  }

  console.log('\nAll backgrounds removed!');
}

main().catch(console.error);
