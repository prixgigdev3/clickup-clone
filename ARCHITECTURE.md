# Architecture Brief — ClickUp Clone Landing Page

> This document gives an LLM (or developer) complete context to understand, modify, or rebuild this site. Read this first, then the source files.

## What This Is

A high-fidelity single-page marketing site inspired by ClickUp's "Become Superhuman with AI Super Agents" landing page. It's a scroll-driven experience with 11 sections, heavy GSAP animation, and a dark/light visual transition midway through.

## Tech Stack (exact versions matter)

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Framework | Next.js (App Router) | 16.2.1 | Static generation, server components |
| UI | React | 19.2.4 | Latest concurrent features |
| Styling | Tailwind CSS | v4 | Utility-first, `@theme inline` syntax |
| Components | shadcn/ui + Base UI | latest | Button primitives, CVA variants |
| Animation | GSAP + ScrollTrigger | 3.14.2 | Scroll-pinned timelines, scrub |
| Smooth Scroll | Lenis | 1.3.20 | Momentum scroll synced to GSAP ticker |
| Charts | D3.js | 7.9.0 | Dot matrix + wave line in Technology |
| Icons | Lucide React | 1.7.0 | Lightweight SVG icons |
| Images | Sharp | 0.34.5 | Build-time background removal script |
| Fonts | Plus Jakarta Sans + JetBrains Mono | Google Fonts via next/font | Display + mono |

## Page Flow (section order matters)

The page renders these 11 components in exact order inside a `<SmoothScroll>` wrapper:

```
1. HeroHumanLevel       — White bg, fullbody agent, 3-phase pinned scroll timeline
2. Capabilities         — White bg, horizontal card carousel with agent avatars
3. BuildAgent           — Dark bg, banner CTA with dot pattern overlay
4. AgentsInMinutes      — White bg, org chart with agent delegation hierarchy
5. HumanSkills          — White bg, typing email animation + multi-card grid
6. Counter              — White bg, animated number counter (10M+ agents)
7. SuperhumanTransition — WHITE-TO-DARK transition via clip-path reveal + marquee
8. Technology           — Dark bg, 5 bordered cards with radar/globe SVG animations
9. Security             — Dark bg, split-image clip-path + rotating cycle diagram
10. Billing             — Gradient bg, credit card mockup, per-credit pricing
11. FinalCTA            — Dark bg, 5 overlapping agent images + grain texture
```

**Critical design decision:** Section 7 (SuperhumanTransition) is the pivot — it uses CSS Grid stacking + animated clip-path to seamlessly transition from the white-bg first half to the dark-bg second half. This is the most complex component (465 lines).

## Animation Architecture

### GSAP + ScrollTrigger Pattern
Every component follows this pattern:
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".element", {
      scrollTrigger: { trigger: ".section", start: "top 80%", end: "bottom 20%" },
      opacity: 0, y: 40, duration: 0.8, stagger: 0.15
    });
  }, containerRef);
  return () => ctx.revert();  // cleanup
}, []);
```

### Lenis Integration (SmoothScroll.tsx)
Lenis provides momentum-based smooth scrolling. It's synced to GSAP's ticker so pinned ScrollTrigger sections work correctly:
```tsx
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### Key Animation Techniques Used
- **Pinned scroll timelines** — HeroHumanLevel pins for 200vh with 3-phase timeline (text fade → character scale → sidebar slide)
- **Clip-path morphing** — SuperhumanTransition uses `clip-path: inset()` animated from full cover to reveal
- **Scrub** — timeline progress tied to scroll position (scrub: true)
- **Staggered entrances** — cards, images, text blocks fade up with 0.1-0.2s stagger
- **Counter animation** — gsap.to with snap to animate numbers from 0 to target
- **SVG ring rotation** — concentric circles rotating/counter-rotating in Technology radar
- **Marquee** — CSS keyframe infinite scroll-left/scroll-right on duplicated pill elements
- **Grain texture** — procedural SVG feTurbulence filter overlay on FinalCTA

## Design System

### Colors
- **Primary accent:** `#7c3aed` (violet)
- **Gradient:** `#ff6b35 → #ff3366 → #7c3aed → #3b82f6` (orange-to-blue via violet)
- **Dark background:** `#0d0d0d`
- **Dark card:** `#1a1a1a`
- **Green accent:** `#22c55e` (used in Technology section)
- **White sections:** `#ffffff` bg, `#171717` text

### Typography
- **Headings:** Plus Jakarta Sans (variable `--font-jakarta`), typically `text-5xl md:text-7xl font-bold`
- **Mono/Labels:** JetBrains Mono (variable `--font-jetbrains`), uppercase, `tracking-[0.2em]`, `text-xs`
- **Section labels:** `.section-label` class — mono, 0.75rem, uppercase, violet

### Spacing Pattern
- Sections: `py-24 md:py-32` or `py-32 md:py-48`
- Content max-width: `max-w-7xl mx-auto px-6`
- Card gaps: `gap-6` or `gap-8`

## Image Assets (public/images/)

All agent images are AI-generated portraits with backgrounds removed via the Sharp script:

| File | Used In | Description |
|------|---------|-------------|
| agent-hero-fullbody.png | HeroHumanLevel | Full-body agent character (hero) |
| agent-superhuman.png | SuperhumanTransition | Character for dark section reveal |
| agent-1-beard-green.png | Capabilities, Counter, FinalCTA, Technology | Male, beard, green tones |
| agent-2-redhead.png | FinalCTA, Technology | Female, red hair |
| agent-3-black-woman.png | Capabilities, FinalCTA, HumanSkills, Technology | Female, dark skin |
| agent-4-asian.png | AgentsInMinutes, Capabilities, Technology | Male, Asian |
| agent-5-curly-woman.png | AgentsInMinutes, Capabilities, HumanSkills, Technology | Female, curly hair |
| agent-6-bob-woman.png | BuildAgent, HumanSkills, Security | Female, bob cut |
| agent-7-blonde.png | Capabilities, Counter, FinalCTA | Female, blonde |
| agent-8-older.png | AgentsInMinutes, HumanSkills | Male, older |
| agent-9-latino.png | AgentsInMinutes, HumanSkills | Male, Latino |
| agent-10-grey-afro.png | AgentsInMinutes, HumanSkills, Technology | Female, grey afro |
| gradient-bg.webp | BuildAgent, Billing | Warm gradient backdrop |
| gradient-warm.jpg | (available) | Warm gradient alternative |

**Important:** Agent images use `mix-blend-mode: multiply` on white backgrounds and `mix-blend-mode: screen` on dark backgrounds to blend the grey AI-generated backgrounds seamlessly.

## Component Details

### HeroHumanLevel.tsx (222 lines)
3-phase pinned scroll animation over 200vh:
- Phase 1 (0-0.3): Hero text fades out and slides up
- Phase 2 (0.3-0.6): Agent character scales up from 0.8 to 1.1
- Phase 3 (0.6-1.0): Sidebar content slides in from right
Uses radial gradient glow behind character.

### SuperhumanTransition.tsx (465 lines) — Most Complex
CSS Grid stacks white section on top of dark section. GSAP animates `clip-path: inset()` to reveal dark layer beneath:
- Marquee text rows scroll horizontally (pills with capability labels)
- 7 custom SVG wireframe visualizations cycle through on interval
- Flash/glow effect at clip boundary during transition
- Large agent character scales up as dark section reveals
- Gradient sweep animation for dramatic color shift

### Technology.tsx (428 lines) — Most Content-Dense
5 feature cards with unique visualizations:
1. Agent Analytics — animated number counter
2. Ambient Awareness — dot matrix chart with wave line (computed with cos)
3. Live Intelligence — animated radar with concentric rotating SVG rings
4. Infinite Knowledge — integration icon grid (Slack, Drive, Notion, etc.)
5. BrainGPT — chat interface mockup

### Security.tsx (195 lines)
- Split-image effect: left half shows agent photo, right half overlays code text via CSS `clip-path`
- Rotating cycle diagram: 4 labels around SVG circle with rotating arrow indicators
- Three-column card grid: Audit Trail, Data Retention, Self-Reflection

### HumanSkills.tsx (268 lines)
- TypingEmail subcomponent: character-by-character typing animation using setInterval
- Multi-card layout showing agent capabilities with photos
- Org chart mini-view with connecting lines

## Build & Run

```bash
npm install        # Install all dependencies
npm run dev        # Dev server on localhost:3000
npm run build      # Production build (static)
npm start          # Serve production build
```

Node 22+ required (.nvmrc included).

## Key Files for Modification

| Want to change... | Edit this file |
|-------------------|---------------|
| Section order | `app/page.tsx` |
| Colors/fonts/spacing | `app/globals.css` |
| Font families | `app/layout.tsx` |
| Any section content | `app/components/<SectionName>.tsx` |
| shadcn component styles | `components/ui/button.tsx`, `components.json` |
| Tailwind config | `app/globals.css` (v4 uses `@theme inline`) |
| Build config | `next.config.ts` |

## Gotchas

1. **Tailwind v4 syntax** — uses `@theme inline {}` and `@import "tailwindcss"`, NOT the v3 `tailwind.config.js` approach
2. **React 19** — uses latest APIs; no legacy patterns
3. **Next.js 16** — App Router only, no pages/ directory
4. **GSAP cleanup** — every component wraps animations in `gsap.context()` and calls `ctx.revert()` in the useEffect cleanup to prevent memory leaks
5. **Lenis + GSAP sync** — removing the SmoothScroll wrapper will break all pinned ScrollTrigger sections
6. **Mix-blend-mode** — agent images rely on `.agent-img-light` (multiply) and `.agent-img-dark` (screen) classes to hide grey backgrounds; replacing images with transparent PNGs would let you remove these
7. **"use client"** — page.tsx is a client component because all children use browser APIs (GSAP, Lenis, IntersectionObserver)
