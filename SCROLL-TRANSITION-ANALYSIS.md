# ClickUp Brain Agents - "Become Superhuman" Scroll Transition - Technical Analysis

## 1. HTML STRUCTURE

```html
<!-- OUTER WRAPPER: CSS Grid stacks marquee + dark on same grid cell -->
<div class="reveal-container" ref={revealContainer}>

  <!-- FLASH OVERLAY: Sits at boundary, z-index:3, translateY(-50%) -->
  <img class="reveal-flash"
       src="https://cdn.web.clickup.com/assets/img/super-agents/flash-2.webp"
       alt="Flash" />

  <!-- LIGHT SECTION: marquee-section (white bg, z-index:2) -->
  <section class="marquee-section" ref={marqueeSection}>
    <h1>Become superhuman,<br/>with Super Agents.</h1>

    <!-- RadialMask component wraps pills-wall -->
    <div class="radial-mask" style="
      --radial-offset-y: 350px;
      --radial-start: 10%;
      --radial-end: 70%;
    ">
      <div class="pills-wall">
        <img class="pill-guy"
             src=".../pill_guy.webp" alt="Super Agent" />

        <!-- 10 rows (data-row="0" through "9"), each pill tripled for seamless loop -->
        <div class="pills-row" data-row="0">
          <span class="cu-pill">WRITE COPY</span>
          <span class="cu-pill">ANALYZE DATA</span>
          <!-- ... each row has 3x duplicate pills for infinite marquee -->
        </div>
        <!-- ... rows 1-9 ... -->
      </div>
    </div>
  </section>

  <!-- DARK SECTION: z-index:1, same grid cell as marquee (behind it) -->
  <section class="dark-section" ref={darkSection}>
    <img class="flash-mobile" src=".../flash.webp" alt="Flash" />

    <div class="lined-sector ls-dashed">
      <div class="line line-left" style="--line-color:#2A2A2A;--dash-size:3px;--dash-gap:4px">
      </div>
      <div class="lined-content">
        <div class="superintelligence-content" ref={superintelligenceContent}>
          <!-- Section header: "But works like superheroes" -->
          <div class="cu-section-header dissect">
            <span class="header-eyebrow">[ SUPERINTELLIGENCE ]</span>
            <!-- ... -->
          </div>

          <!-- Capabilities showcase with dark-guy (xray) image -->
          <div class="capabilities-showcase">
            <div class="cap-column cap-middle">
              <div class="cap-media-wrapper">
                <div class="cap-media active" data-index="0">
                  <img class="dark-guy"
                       src=".../pill_guy_xray.webp"
                       alt="Super Agent" />
                  <div class="cap-placeholder"></div>
                </div>
                <!-- tabs 1-6: Knowledge, Collaboration, Skills, Autonomous, Ambient, Feedback -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flash-end-wrapper"></div>
  </section>
</div>

<!-- After reveal-container -->
<div class="post-dark-section">
  <!-- White section that follows -->
</div>
```

## 2. CSS - THE GRID STACKING TRICK

```css
/* Both sections occupy the SAME grid cell - stacked on top of each other */
.reveal-container {
  position: relative;
  display: grid;  /* KEY: CSS Grid for layer stacking */
}

.reveal-container .dark-section,
.reveal-container .marquee-section {
  grid-area: 1/1;  /* BOTH in same cell = stacked */
}

/* Marquee is on top (z-index:2), dark is behind (z-index:1) */
.reveal-container .marquee-section { z-index: 2; }
.reveal-container .dark-section { z-index: 1; }

/* Marquee = white, full viewport height */
.marquee-section {
  position: relative;
  overflow: hidden;
  block-size: 100vh;
  padding: 120px 0;
  background: #fff;
}

/* Dark = black, full viewport height */
.dark-section {
  position: relative;
  overflow: hidden;
  min-block-size: 100vh;
  padding: 64px 0;
  background: #000;
}

/* Flash image straddles the boundary */
.reveal-container .reveal-flash {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;  /* Top of container */
  z-index: 3;
  inline-size: 100%;
  block-size: 450px;
  pointer-events: none;
  transform: translateY(-50%);  /* Centered at boundary */
}

/* White line at bottom of marquee prevents subpixel gap */
.marquee-section:before {
  content: "";
  position: absolute;
  inset-block-end: -5px;
  z-index: 1;
  block-size: 10px;
  background: #fff;
  inset-inline: -5px;
}
```

## 3. CSS - RADIAL MASK (VIGNETTE EFFECT ON PILLS)

```css
.radial-mask {
  --radial-offset-y: 0;
  --radial-start: 10%;
  --radial-end: 70%;

  /* Creates a circular fade-out from center, revealing pill-guy in clear center */
  -webkit-mask-image: radial-gradient(
    circle at 50% calc(50% - var(--radial-offset-y)),
    rgb(0,0,0) var(--radial-start),      /* Fully visible center */
    rgba(0,0,0,0) var(--radial-end)       /* Fades to transparent */
  );
  mask-image: radial-gradient(
    circle at 50% calc(50% - var(--radial-offset-y)),
    rgb(0,0,0) var(--radial-start),
    rgba(0,0,0,0) var(--radial-end)
  );
}

/* Mobile override */
@media (max-width: 991px) {
  .marquee-section .radial-mask {
    --radial-offset-y: 360px !important;
    --radial-start: 50% !important;
    --radial-end: 81% !important;
  }
}
```

## 4. CSS - PILL MARQUEE ANIMATION

```css
.marquee-section .pills-wall {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  inline-size: 100%;
}

/* White gradient fade at bottom of pills */
.marquee-section .pills-wall:after {
  content: "";
  position: absolute;
  inset-block-end: 0;
  z-index: 11;
  block-size: 50px;
  background: linear-gradient(180deg, transparent, #fff);
  pointer-events: none;
  inset-inline: 0;
}

/* Pill-guy centered absolutely in pills-wall */
.marquee-section .pill-guy {
  position: absolute;
  inset-inline-start: 50%;
  inset-block-start: 50%;
  z-index: 10;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

/* Infinite horizontal marquee - pills tripled (3x) for seamless loop */
.marquee-section .pills-row {
  display: flex;
  flex-shrink: 0;
  gap: 16px;
  inline-size: max-content;
  animation: marquee-left 120s linear infinite;
}
.marquee-section .pills-row:nth-child(2n) {
  animation: marquee-right 120s linear infinite;
}

@keyframes marquee-left {
  0%  { transform: translateX(0); }
  to  { transform: translateX(-33.333%); }  /* Move 1/3 (one set of pills) */
}
@keyframes marquee-right {
  0%  { transform: translateX(-33.333%); }
  to  { transform: translateX(0); }
}

/* Pill styling */
.cu-pill {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 21px;
  padding: 16px 32px;
  border: 1px solid #e8e8e8;
  border-radius: 70px;
  color: #838383;
  font-weight: 500;
  font-style: normal;
  font-size: 18px;
  font-family: Sometype Mono, monospace;
  line-height: 22px;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
}
```

## 5. JAVASCRIPT - THE SCROLL ANIMATION (GSAP + ScrollTrigger)

This is the core animation. De-minified and annotated:

```javascript
// Libraries used:
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

// Refs:
// eb = revealContainer ref (.reveal-container)
// eC = marqueeSection ref (.marquee-section)
// ev = revealFlash ref (.reveal-flash)
// ew = darkSection ref (.dark-section)
// ej = superintelligenceContent ref (.superintelligence-content)

// The animation hook receives these refs:
// { revealContainer, marqueeSection, revealFlash, superintelligenceContent, darkSection, setHeaderDarkMode }

// === DESKTOP ANIMATION (min-width: 990px) ===
gsapMatchMedia.add("(min-width: 990px)", () => {

  // INITIAL STATE: marquee-section has clip-path covering full area
  gsap.set(marqueeSection, {
    clipPath: "inset(-1px -1px 0 -1px)"   // Fully visible (no clipping)
  });

  // Flash image positioned at bottom of marquee
  gsap.set(revealFlash, {
    top: marqueeSection.offsetHeight,
    yPercent: -50
  });

  // === MAIN SCROLL TIMELINE ===
  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: revealContainer,     // The grid wrapper
      start: "top top",             // When top hits viewport top
      end: "+=100%",                // Scroll distance = 100vh
      anticipatePin: 1,
      pin: true,                    // PIN the container in place
      scrub: true,                  // Tie animation to scroll position
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setHeaderDarkMode(self.progress >= 1);  // Dark header when fully revealed
      }
    }
  });

  // ANIMATION 1: Clip the marquee section from bottom upward
  // This REVEALS the dark-section behind it
  timeline.to(marqueeSection, {
    clipPath: "inset(-1px -1px calc(100% + 1px) -1px)",  // Clips to nothing (bottom inset = 100%)
    ease: "power2.inOut",
    duration: 1
  }, 0);

  // ANIMATION 2: Move flash image from bottom to top
  timeline.fromTo(revealFlash,
    { top: () => marqueeSection.offsetHeight },  // Start: bottom of marquee
    { top: 0, ease: "power2.inOut", duration: 1 },  // End: top of container
    0
  );

  // ANIMATION 3: Scale up then back down (both marquee + superintelligence content)
  let scaleTargets = superintelligenceContent
    ? [marqueeSection, superintelligenceContent]
    : [marqueeSection];

  // First half: scale up to 1.1
  timeline.to(scaleTargets, {
    scale: 1.1,
    ease: "power2.in",
    duration: 0.5
  }, 0);

  // Second half: scale back to 1.0
  timeline.to(scaleTargets, {
    scale: 1,
    ease: "power2.out",
    duration: 0.5
  }, 0.5);

  // ANIMATION 4: Flash image height grows then shrinks (energy burst effect)
  timeline.to(revealFlash, {
    height: 800,           // Grows tall
    ease: "power2.in",
    duration: 0.5
  }, 0);
  timeline.to(revealFlash, {
    height: 450,           // Shrinks back
    ease: "power2.out",
    duration: 0.5
  }, 0.5);

  // === POST-DARK SECTION HEADER TOGGLE ===
  let postDarkSection = document.querySelector(".post-dark-section");

  if (postDarkSection) {
    ScrollTrigger.create({
      trigger: postDarkSection,
      start: "top top",
      onEnter: () => setHeaderDarkMode(false),     // Back to light header
      onLeaveBack: () => setHeaderDarkMode(true),   // Dark header again
    });
  }
});

// === MOBILE (max-width: 989px) ===
// No clip-path animation - sections stack normally (flex-direction: column)
// Only dark mode header toggle based on dark-section position
gsapMatchMedia.add("(max-width: 989px)", () => {
  ScrollTrigger.create({
    trigger: darkSection,
    start: "top top",
    onEnter: () => setHeaderDarkMode(true),
    onLeaveBack: () => setHeaderDarkMode(false),
  });
});
```

## 6. KEY IMAGES

| Asset | URL | Role |
|-------|-----|------|
| pill_guy.webp | `cdn.web.clickup.com/assets/img/super-agents/pill_guy.webp` | Character in light/white section (centered in pills wall) |
| pill_guy_xray.webp | `cdn.web.clickup.com/assets/img/super-agents/pill_guy_xray.webp` | X-ray/skeleton version in dark section capabilities |
| flash-2.webp | `cdn.web.clickup.com/assets/img/super-agents/flash-2.webp` | Horizontal light flash (desktop) |
| flash.webp | `cdn.web.clickup.com/assets/img/super-agents/flash.webp` | Flash for mobile |

## 7. THE DARK-GUY (XRAY) IN CAPABILITIES SECTION

```css
/* X-ray character positioned ABOVE the capabilities showcase */
.capabilities-showcase .dark-guy {
  position: absolute;
  inset-inline-start: 50%;
  inset-block-start: -166px;       /* Floats above the section */
  z-index: 10;
  object-fit: unset !important;
  inline-size: 440px;
  max-inline-size: none !important;
  max-block-size: none !important;
  pointer-events: none;
  transform: translateX(-50%);     /* Center horizontally */
}

.cap-media-wrapper {
  position: relative;
  inline-size: 100%;
  block-size: 100%;
  min-block-size: 500px;
}

.cap-media {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cap-media.active {
  opacity: 1;
}
```

## 8. HOW THE TRANSITION WORKS - SUMMARY

1. **Layout**: CSS Grid (`display: grid; grid-area: 1/1`) stacks `.marquee-section` (white, z-index:2) directly on top of `.dark-section` (black, z-index:1) in the same grid cell.

2. **Pin**: GSAP ScrollTrigger pins `.reveal-container` when its top reaches the viewport top, for a scroll distance of `100vh`.

3. **Reveal via clip-path**: As you scroll, the white `.marquee-section` is clipped from bottom upward using `clipPath: "inset(-1px -1px calc(100% + 1px) -1px)"`. This progressively exposes the `.dark-section` behind it - like pulling a white curtain upward.

4. **Flash sweep**: A full-width flash/light-burst image (`.reveal-flash`) moves from the bottom of the marquee to the top, synchronized with the clip edge. It grows in height (450px -> 800px -> 450px) creating an energy burst at the transition boundary.

5. **Scale punch**: Both sections scale up to 1.1x at the midpoint, then back to 1.0x, creating a "zoom punch" effect during the transition.

6. **Radial mask on pills**: The pills wall uses a CSS `mask-image: radial-gradient(...)` to create a vignette that fades pills to transparent at edges, keeping the pill-guy character clearly visible at center.

7. **Marquee animation**: Pills scroll horizontally in alternating directions (odd rows left, even rows right) at 120s per loop, with each row's content tripled for seamless wrapping.

8. **Dark section content**: The xray/skeleton character (`pill_guy_xray.webp`) is absolutely positioned above the capabilities showcase in the dark section, visually "replacing" the normal pill_guy once the white section clips away.

9. **Mobile fallback**: No clip-path animation. Sections stack vertically (`flex-direction: column`) with a simple flash image at the boundary.

## 9. RadialMask COMPONENT (React)

```javascript
function RadialMask({ children, className, start, end, offsetY }) {
  const u = `${offsetY ?? 0}px`;
  const m = `${start ?? 10}%`;
  const g = `${end ?? 70}%`;

  const style = {
    "--radial-offset-y": u,
    "--radial-start": m,
    "--radial-end": g,
  };

  const cls = `radial-mask ${className ?? ""}`;

  return <div className={cls} style={style}>{children}</div>;
}
```

## 10. PILL ROW GENERATION

```javascript
// Each row is tripled: [...pills, ...pills, ...pills] for seamless marquee loop
function PillRow(rowData, rowIndex) {
  return (
    <div className="pills-row" data-row={rowIndex}>
      {[...rowData, ...rowData, ...rowData].map((label, i) => (
        <Pill label={label} key={`${rowIndex}-${i}`} />
      ))}
    </div>
  );
}
```
