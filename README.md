# ClickUp Clone — Landing Page

A high-fidelity landing page inspired by ClickUp's "Become Superhuman" design, built with Next.js 16, GSAP scroll-driven animations, and Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 16.2 (App Router)
- **UI:** React 19, Tailwind CSS v4, shadcn/ui, Lucide icons
- **Animation:** GSAP 3 + ScrollTrigger, Lenis smooth scroll
- **Charts:** D3.js
- **Image Processing:** Sharp

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/
  page.tsx              # Main landing page
  layout.tsx            # Root layout
  globals.css           # Global styles + Tailwind
  components/
    HeroHumanLevel.tsx       # Hero section
    SuperhumanTransition.tsx  # Scroll-driven transition effect
    Capabilities.tsx         # Feature capabilities grid
    AgentsInMinutes.tsx      # Agent builder showcase
    BuildAgent.tsx           # Build-your-agent section
    HumanSkills.tsx          # Skills comparison
    Technology.tsx           # Tech stack section
    Security.tsx             # Security & compliance
    Billing.tsx              # Pricing section
    FinalCTA.tsx             # Final call-to-action
    SmoothScroll.tsx         # Lenis scroll wrapper
    Counter.tsx              # Animated number counter
components/ui/             # shadcn/ui primitives
public/images/             # Agent avatars & backgrounds
```

## Deployment

This is a static Next.js site. Deploy to any platform that supports Node.js:

- **Vercel:** `npx vercel`
- **Netlify:** Connect the repo, build command `npm run build`, publish directory `.next`
- **Docker:** Use the [Next.js Docker example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
- **Static export:** Add `output: 'export'` to `next.config.ts`, then deploy the `out/` directory anywhere

## License

Private project.
