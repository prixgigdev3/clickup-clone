"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillRows = [
  { items: ["WRITE COPY", "ANALYZE DATA", "DRAFT EMAILS", "TRACK EXPENSES", "MANAGE INVOICES", "TRACK KEYWORDS", "SCHEDULE POSTS", "RUN REPORTS"], direction: "left" as const },
  { items: ["CREATE BRIEFS", "MONITOR TRENDS", "BOOK MEETINGS", "SET REMINDERS", "TRACK CONTENT", "PLAN CAMPAIGNS", "EDIT COPY", "BRAINSTORM"], direction: "right" as const },
  { items: ["PROOFREAD CONTENT", "SUMMARIZE TEXT", "SEND MESSAGES", "CREATE DASHBOARDS", "DESIGN MOCKUPS", "DEBUG CODE", "REVIEW DOCS"], direction: "left" as const },
  { items: ["UPDATE STYLEGUIDES", "SURVEY USERS", "CHECK LINKS", "FIX ERRORS", "LOG FILES", "SYNC DATA", "MANAGE ASSETS", "BUILD DECKS"], direction: "right" as const },
  { items: ["EDIT DOCUMENTS", "COMPETITIVE ANALYSIS", "AUTOMATE TASKS", "CREATE LOGOS", "OPTIMIZE CONTENT", "TROUBLESHOOT"], direction: "left" as const },
  { items: ["CONDUCT STUDIES", "COMPILE DATA", "PREPARE PRESENTATIONS", "SCHEDULE TASKS", "ROUTE TICKETS", "ARCHIVE FILES"], direction: "right" as const },
  { items: ["WRITE SCRIPTS", "PERFORM AUDITS", "RESOLVE TICKETS", "WRITE PROPOSALS", "CLEAN DATA", "SYNTHESIZE INFORMATION"], direction: "left" as const },
  { items: ["MANAGE BUDGETS", "IMPROVE RANKINGS", "AUTOMATE EMAILS", "GENERATE LEADS", "WRITE PROPOSALS"], direction: "right" as const },
  { items: ["TRACK METRICS", "ANALYZE FEEDBACK", "GENERATE REPORTS", "COORDINATE TEAMS", "MANAGE WORKFLOWS"], direction: "left" as const },
];

const capabilities = [
  { num: "01", name: "Memory", description: "AI agents are sophisticated software entities designed to operate autonomously within digital environments.\n\nAgents have episodic memory, agent preferences memory, short-term memory and long-term memory" },
  { num: "02", name: "Knowledge", description: "Deep understanding of your organization's context, documents, and processes. Infinite connected knowledge from 50+ enterprise integrations." },
  { num: "03", name: "Collaboration", description: "Work alongside humans and other agents in real-time workflows. Agents collaborate like skilled teammates." },
  { num: "04", name: "Skills", description: "500+ human-like skills that agents can learn and execute autonomously. From drafting emails to analyzing data." },
  { num: "05", name: "Autonomous", description: "Self-directed task execution with human oversight and approval. Agents work 24/7 without breaks." },
  { num: "06", name: "Ambient", description: "Always-on monitoring and proactive task management. Context-aware responses to any question." },
  { num: "07", name: "Feedback", description: "Continuous learning from human feedback to improve performance. Advanced reflection loops for quality." },
];

function MarqueeRow({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap py-[7px]">
      <div className={`inline-flex gap-3 ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}>
        {doubled.map((text, i) => (
          <span key={`${text}-${i}`} className="pill text-gray-400 text-[12px] tracking-[0.06em] inline-block">{text}</span>
        ))}
      </div>
    </div>
  );
}

// Base human wireframe used by all capability illustrations
function WireframeBase() {
  return (
    <g>
      <ellipse cx="150" cy="55" rx="42" ry="48" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
      <ellipse cx="150" cy="55" rx="30" ry="35" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      <line x1="140" y1="103" x2="140" y2="125" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
      <line x1="160" y1="103" x2="160" y2="125" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
      <path d="M140,125 L90,140 L75,280 M160,125 L210,140 L225,280" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
      <line x1="90" y1="140" x2="210" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <path d="M90,140 L45,200 L35,270" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
      <path d="M210,140 L255,200 L265,270" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
      <line x1="75" y1="280" x2="225" y2="280" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <path d="M110,280 L100,380 L95,470" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
      <path d="M190,280 L200,380 L205,470" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
      {[[150,55],[90,140],[210,140],[45,200],[255,200],[110,280],[190,280],[100,380],[200,380],[95,470],[205,470]].map(([x,y],i) => (
        <circle key={`j${i}`} cx={x} cy={y} r="2.5" fill="rgba(255,255,255,0.15)" />
      ))}
    </g>
  );
}

// 01 Memory — brain with memory layers radiating outward
function WireframeMemory({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 480" className={className}>
      <WireframeBase />
      {/* Brain glow */}
      <circle cx="150" cy="50" r="25" fill="rgba(255,140,50,0.08)" />
      {/* Memory rings radiating from head */}
      <ellipse cx="150" cy="50" rx="50" ry="30" fill="none" stroke="rgba(255,160,80,0.2)" strokeWidth="0.5" strokeDasharray="3 4" />
      <ellipse cx="150" cy="50" rx="70" ry="42" fill="none" stroke="rgba(255,160,80,0.12)" strokeWidth="0.5" strokeDasharray="3 5" />
      <ellipse cx="150" cy="50" rx="90" ry="54" fill="none" stroke="rgba(255,160,80,0.07)" strokeWidth="0.5" strokeDasharray="3 6" />
      {/* Memory nodes */}
      {[[100,35],[200,35],[85,65],[215,65],[110,20],[190,20]].map(([x,y],i) => (
        <circle key={`m${i}`} cx={x} cy={y} r="3" fill="rgba(255,160,80,0.3)" />
      ))}
      {/* Connecting lines to brain */}
      {[[100,35],[200,35],[85,65],[215,65]].map(([x,y],i) => (
        <line key={`ml${i}`} x1={x} y1={y} x2="150" y2="50" stroke="rgba(255,160,80,0.1)" strokeWidth="0.4" />
      ))}
    </svg>
  );
}

// 02 Knowledge — connected network/constellation around torso
function WireframeKnowledge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 480" className={className}>
      <WireframeBase />
      {/* Knowledge network nodes around torso */}
      {[[50,160],[250,160],[30,220],[270,220],[60,280],[240,280],[40,120],[260,120],[150,130]].map(([x,y],i) => (
        <g key={`k${i}`}>
          <circle cx={x} cy={y} r="4" fill="none" stroke="rgba(100,200,255,0.25)" strokeWidth="0.6" />
          <circle cx={x} cy={y} r="1.5" fill="rgba(100,200,255,0.3)" />
        </g>
      ))}
      {/* Connecting web */}
      <path d="M50,160 L150,130 L250,160 M30,220 L150,130 L270,220 M60,280 L150,130 L240,280 M40,120 L150,130 L260,120 M50,160 L30,220 L60,280 M250,160 L270,220 L240,280" fill="none" stroke="rgba(100,200,255,0.1)" strokeWidth="0.4" />
      {/* Glow at center */}
      <circle cx="150" cy="180" r="30" fill="rgba(100,200,255,0.05)" />
    </svg>
  );
}

// 03 Collaboration — multiple figures linked together
function WireframeCollaboration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 480" className={className}>
      <WireframeBase />
      {/* Secondary figures (smaller, flanking) */}
      {[55, 245].map((cx, i) => (
        <g key={`col${i}`} opacity="0.3">
          <ellipse cx={cx} cy="180" rx="18" ry="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <line x1={cx} y1="202" x2={cx} y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <line x1={cx - 15} y1="220" x2={cx + 15} y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        </g>
      ))}
      {/* Connection lines from main to secondary */}
      <line x1="90" y1="180" x2="73" y2="180" stroke="rgba(34,197,94,0.25)" strokeWidth="0.6" strokeDasharray="3 3" />
      <line x1="210" y1="180" x2="227" y2="180" stroke="rgba(34,197,94,0.25)" strokeWidth="0.6" strokeDasharray="3 3" />
      {/* Collaboration pulse rings */}
      <circle cx="150" cy="200" r="60" fill="none" stroke="rgba(34,197,94,0.08)" strokeWidth="0.5" />
      <circle cx="150" cy="200" r="80" fill="none" stroke="rgba(34,197,94,0.05)" strokeWidth="0.5" />
    </svg>
  );
}

// 04 Skills — hexagonal skill nodes branching from body
function WireframeSkills({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 480" className={className}>
      <WireframeBase />
      {/* Hexagonal skill nodes */}
      {[[50,150,"#ff6b6b"],[250,170,"#7c3aed"],[40,240,"#3b82f6"],[260,240,"#22c55e"],[70,320,"#ff9f43"],[230,320,"#ec4899"]].map(([x,y,c],i) => {
        const nx = Number(x), ny = Number(y), s = 12;
        const hex = `${nx},${ny-s} ${nx+s*0.87},${ny-s/2} ${nx+s*0.87},${ny+s/2} ${nx},${ny+s} ${nx-s*0.87},${ny+s/2} ${nx-s*0.87},${ny-s/2}`;
        return (
          <g key={`sk${i}`}>
            <polygon points={hex} fill="none" stroke={`${c}40`} strokeWidth="0.6" />
            <circle cx={nx} cy={ny} r="2" fill={`${c}60`} />
            <line x1={nx} y1={ny} x2="150" y2="200" stroke={`${c}15`} strokeWidth="0.4" />
          </g>
        );
      })}
    </svg>
  );
}

// 05 Autonomous — orbital paths around the body (self-directed)
function WireframeAutonomous({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 480" className={className}>
      <WireframeBase />
      {/* Orbital rings */}
      <ellipse cx="150" cy="200" rx="100" ry="60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" transform="rotate(-15,150,200)" />
      <ellipse cx="150" cy="200" rx="120" ry="70" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" transform="rotate(15,150,200)" />
      <ellipse cx="150" cy="200" rx="80" ry="45" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" transform="rotate(-30,150,200)" />
      {/* Orbiting dots */}
      <circle cx="250" cy="180" r="4" fill="rgba(124,58,237,0.4)" />
      <circle cx="55" cy="210" r="3" fill="rgba(124,58,237,0.3)" />
      <circle cx="200" cy="145" r="3.5" fill="rgba(124,58,237,0.35)" />
      {/* Center pulse */}
      <circle cx="150" cy="200" r="15" fill="rgba(124,58,237,0.06)" />
    </svg>
  );
}

// 06 Ambient — radar/wave emanation from the body
function WireframeAmbient({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 480" className={className}>
      <WireframeBase />
      {/* Radar waves from chest */}
      {[40, 65, 90, 115, 140].map((r, i) => (
        <circle key={`ar${i}`} cx="150" cy="180" r={r} fill="none" stroke={`rgba(34,197,94,${0.15 - i * 0.025})`} strokeWidth="0.5" />
      ))}
      {/* Signal dots */}
      <circle cx="220" cy="140" r="3" fill="rgba(34,197,94,0.3)" />
      <circle cx="80" cy="220" r="2.5" fill="rgba(34,197,94,0.25)" />
      <circle cx="240" cy="230" r="2" fill="rgba(34,197,94,0.2)" />
      <circle cx="60" cy="150" r="2.5" fill="rgba(34,197,94,0.25)" />
      {/* Center glow */}
      <circle cx="150" cy="180" r="10" fill="rgba(34,197,94,0.1)" />
    </svg>
  );
}

// 07 Feedback — circular arrows / reflection loop around body
function WireframeFeedback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 480" className={className}>
      <WireframeBase />
      {/* Circular feedback loop */}
      <path d="M100,140 A60,60 0 0,1 200,140" fill="none" stroke="rgba(255,200,50,0.2)" strokeWidth="0.7" />
      <path d="M200,140 A60,80 0 0,1 200,280" fill="none" stroke="rgba(255,200,50,0.15)" strokeWidth="0.7" />
      <path d="M200,280 A60,60 0 0,1 100,280" fill="none" stroke="rgba(255,200,50,0.12)" strokeWidth="0.7" />
      <path d="M100,280 A60,80 0 0,1 100,140" fill="none" stroke="rgba(255,200,50,0.1)" strokeWidth="0.7" />
      {/* Arrow heads */}
      <polygon points="195,138 205,140 197,147" fill="rgba(255,200,50,0.25)" />
      <polygon points="105,282 95,280 103,273" fill="rgba(255,200,50,0.2)" />
      {/* Labels */}
      <text x="150" y="125" textAnchor="middle" fill="rgba(255,200,50,0.2)" fontSize="8" fontFamily="monospace">EXECUTE</text>
      <text x="150" y="300" textAnchor="middle" fill="rgba(255,200,50,0.15)" fontSize="8" fontFamily="monospace">REFLECT</text>
    </svg>
  );
}

const wireframeComponents = [
  WireframeMemory,
  WireframeKnowledge,
  WireframeCollaboration,
  WireframeSkills,
  WireframeAutonomous,
  WireframeAmbient,
  WireframeFeedback,
];

/*
 * ARCHITECTURE — Matching ClickUp's exact technique:
 *
 * 1. CSS Grid stacks two sections in the same cell (grid-area: 1/1):
 *    - marqueeSection (white, z-index:2) — heading, pills, person
 *    - darkSection (black, z-index:1) — wireframe, SI content, capabilities
 *
 * 2. GSAP clips the WHITE marqueeSection from bottom using clipPath:
 *    inset(0 0 0 0) → inset(0 0 100% 0)
 *    This progressively reveals the dark section behind it.
 *
 * 3. A gradient flash image sweeps at the clip boundary.
 *
 * 4. Both sections scale to 1.1x at midpoint, then back to 1x.
 *
 * Nothing moves. The white section gets clipped away from bottom.
 * The dark section is always there behind — it's revealed in place.
 */

export default function SuperhumanTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeSectionRef = useRef<HTMLElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const siContentRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(marqueeSectionRef.current, {
        clipPath: "inset(-1px -1px 0px -1px)",
      });

      // Track clip progress to position flash at the exact clip edge
      const clipProgress = { value: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinReparent: false,
          scrub: true,
          pinSpacing: true,
        },
      });

      // Animate clip progress 0→1 and use onUpdate to set both clipPath AND flash position
      tl.to(clipProgress, {
        value: 1,
        ease: "power2.inOut",
        duration: 1,
        onUpdate: () => {
          const p = clipProgress.value;
          const bottomInset = p * 100;

          // Clip the white section from bottom
          if (marqueeSectionRef.current) {
            marqueeSectionRef.current.style.clipPath = `inset(-1px -1px ${bottomInset}% -1px)`;
          }

          // Position flash at the clip edge (100% - bottomInset)% from top
          // The flash is translateY(-50%) so it straddles the boundary
          if (flashRef.current) {
            flashRef.current.style.top = `${100 - bottomInset}%`;
            // Hide flash when fully clipped
            flashRef.current.style.opacity = p >= 0.98 ? "0" : "1";
            // Grow flash at midpoint
            const flashHeight = 30 + 30 * Math.sin(p * Math.PI);
            flashRef.current.style.height = `${flashHeight}vh`;
          }
        },
      }, 0);

      // Scale punch on both sections
      const targets = [marqueeSectionRef.current, siContentRef.current].filter(Boolean);
      tl.to(targets, { scale: 1.1, ease: "power2.in", duration: 0.5 }, 0);
      tl.to(targets, { scale: 1, ease: "power2.out", duration: 0.5 }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {/* CSS Grid container — stacks both sections in same cell */}
      <div
        ref={containerRef}
        className="relative grid h-screen"
        style={{ gridTemplateRows: "1fr", gridTemplateColumns: "1fr" }}
      >
        {/* Flash/gradient sweep at clip boundary */}
        <div
          ref={flashRef}
          className="pointer-events-none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "100%",
            height: "30vh",
            zIndex: 3,
            transform: "translateY(-50%)",
            background: `linear-gradient(to bottom,
              transparent 0%,
              rgba(255,200,150,0.1) 10%,
              rgba(255,180,130,0.3) 20%,
              #ff9f43 32%,
              #ff6b6b 44%,
              #c44569 56%,
              #7c3aed 68%,
              #3b0764 82%,
              transparent 100%
            )`,
          }}
        />

        {/* ====== WHITE SECTION (z-2) — gets clipped from bottom ====== */}
        <section
          ref={marqueeSectionRef}
          className="relative overflow-hidden bg-white"
          style={{ gridArea: "1/1", zIndex: 2, height: "100vh" }}
        >
          {/* Heading */}
          <h2 className="absolute top-[5vh] left-0 right-0 text-center z-[2] text-4xl md:text-5xl lg:text-[3.8rem] font-bold text-gray-900 leading-[1.08] tracking-tight">
            Become superhuman,
            <br />
            with Super Agents.
          </h2>

          {/* Pills */}
          <div className="absolute inset-0 flex flex-col justify-center pt-[12vh] z-[1]">
            <div className="w-full overflow-hidden space-y-0">
              {pillRows.map((row, idx) => (
                <MarqueeRow key={idx} items={row.items} direction={row.direction} />
              ))}
            </div>
          </div>

          {/* Person — centered, large */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-[3]"
            style={{ top: "8%", width: "min(650px, 55vw)", height: "95vh" }}
          >
            <Image src="/images/agent-superhuman.png" alt="Super Agent" fill className="object-contain object-top" />
            <div
              className="absolute bottom-[5%] left-[-30%] right-[-30%] h-[35%] pointer-events-none -z-10"
              style={{
                background: "radial-gradient(ellipse at center bottom, rgba(255,170,110,0.4) 0%, rgba(255,130,90,0.15) 40%, transparent 70%)",
              }}
            />
          </div>
        </section>

        {/* ====== DARK SECTION (z-1) — always behind, revealed by clipping white ====== */}
        <section
          ref={siContentRef}
          className="relative overflow-hidden bg-[#0d0d0d]"
          style={{ gridArea: "1/1", zIndex: 1, minHeight: "100vh" }}
        >
          {/* Wireframe — changes based on active capability, centered like person */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-[0] pointer-events-none"
            style={{ top: "8%", width: "min(450px, 38vw)", height: "80vh" }}
          >
            {wireframeComponents.map((WireframeComp, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: idx === activeIdx ? 1 : 0 }}
              >
                <WireframeComp className="w-full h-full opacity-40" />
              </div>
            ))}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-orange-500/25 blur-2xl" />
            <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-orange-400/40 blur-xl" />
          </div>

          {/* "But works like superheroes" header */}
          <div className="pt-[5vh] px-6 lg:px-8 max-w-7xl mx-auto mb-6">
            <p className="text-[10px] tracking-[0.25em] text-gray-500 mb-4 font-mono">[ SUPERINTELLIGENCE ]</p>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                But works like
                <br />
                superheroes
              </h2>
              <p className="text-gray-400 text-base max-w-sm leading-relaxed pt-2">
                They leverage artificial intelligence to make informed decisions, and execute actions to achieve specific goals.
              </p>
            </div>
          </div>

          {/* Capabilities 3-column layout with wireframe in center */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-[280px_1fr_1fr] gap-6">
              {/* Capability nav */}
              <div className="bg-[#141414] rounded-2xl p-6 border border-white/5">
                <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-6 font-mono">CAPABILITIES</p>
                {capabilities.map((cap, idx) => (
                  <button
                    key={cap.name}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full text-left flex items-center gap-3 py-3.5 border-b border-white/5 transition-all duration-300 ${
                      idx === activeIdx ? "text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    <span className={`text-sm font-mono transition-colors duration-300 ${idx === activeIdx ? "text-purple-400" : "text-gray-700"}`}>
                      {cap.num}
                    </span>
                    <span className="font-semibold text-[15px]">{cap.name}</span>
                  </button>
                ))}
              </div>

              {/* Wireframe body — this column is empty, wireframe is absolutely positioned at page center */}
              <div />

              {/* Content panel */}
              <div className="flex flex-col justify-center">
                <p className="text-[5rem] font-bold text-white/10 mb-2 font-mono leading-none">
                  {capabilities[activeIdx].num}
                </p>
                <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">{capabilities[activeIdx].name}</h3>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line text-[15px]">
                  {capabilities[activeIdx].description}
                </p>
                <button className="mt-8 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold w-fit hover:bg-gray-100 transition-colors text-sm">
                  Get started
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Technology section follows naturally */}
    </section>
  );
}
