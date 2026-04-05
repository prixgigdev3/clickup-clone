"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topPerformers = [
  { rank: 1, name: "Program Manager", score: 125, img: "/images/agent-5-curly-woman.png" },
  { rank: 2, name: "Data Analyst", score: 91, img: "/images/agent-10-grey-afro.png" },
  { rank: 3, name: "Content Creator", score: 90, img: "/images/agent-3-black-woman.png" },
  { rank: 4, name: "Marketing Strategist", score: 75, img: "/images/agent-4-asian.png" },
  { rank: 5, name: "Product Designer", score: 64, img: "/images/agent-2-redhead.png" },
  { rank: 6, name: "DevOps Engineer", score: 63, img: "/images/agent-1-beard-green.png" },
];

const integrationIcons = ["📊", "🔗", "💬", "📧", "🐙", "📁", "✨", "🔷", "📋"];

// Dot matrix data — 40 columns × 8 rows, value 0-1 for whether the dot is "active"
// Creates a wave pattern with a green line overlay
function generateDotMatrix() {
  const cols = 40;
  const rows = 8;
  // Generate a wave — use pre-rounded values to avoid SSR/client float mismatch
  const waveHeight = Array.from({ length: cols }, (_, i) => {
    const x = i / cols;
    return Math.round((Math.sin(x * Math.PI * 3.2 + 0.5) * 0.35 + 0.5 + Math.sin(x * Math.PI * 1.5) * 0.15) * 10000) / 10000;
  });
  // Dots below the wave line are active
  const dots: boolean[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: boolean[] = [];
    const threshold = (rows - 1 - r) / (rows - 1); // 0 at bottom, 1 at top
    for (let c = 0; c < cols; c++) {
      row.push(threshold < waveHeight[c]);
    }
    dots.push(row);
  }
  return { dots, waveHeight, cols, rows };
}

const dotMatrix = generateDotMatrix();

function AnimatedPercentile() {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 40,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => setValue(Math.round(obj.val)),
        });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <span ref={ref} className="text-7xl font-bold tabular-nums">
      {value}%
    </span>
  );
}

function DotMatrixChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!chartRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: chartRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => setVisible(true),
    });
    return () => trigger.kill();
  }, []);

  const { dots, waveHeight, cols, rows } = dotMatrix;

  // SVG line path for the green wave — round to 2 decimals to avoid hydration mismatch
  const linePoints = waveHeight.map((h, i) => {
    const x = Math.round((i / (cols - 1)) * 10000) / 100;
    const y = Math.round((1 - h) * 10000) / 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div ref={chartRef} className="relative">
      {/* Dot grid */}
      <div className="grid gap-y-1.5" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {dots.map((row, r) => (
          <div key={r} className="flex justify-between">
            {row.map((active, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  active
                    ? visible ? "bg-green-500/70 scale-100" : "bg-green-500/70 scale-0"
                    : "bg-gray-700/50"
                }`}
                style={{
                  transitionDelay: visible ? `${(c * 15 + r * 30)}ms` : "0ms",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Green line overlay */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <polyline
          points={linePoints}
          fill="none"
          stroke="rgba(34,197,94,0.8)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{
            strokeDasharray: visible ? "none" : "500",
            strokeDashoffset: visible ? "0" : "500",
          }}
        />
      </svg>
    </div>
  );
}

export default function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0d0d0d] text-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="border-t border-white/10 pt-6 mb-16">
          <p className="text-xs tracking-[0.2em] text-gray-500 mb-8 font-mono">[ TECHNOLOGY ]</p>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Proprietary Agentic
              <br />
              Technology
            </h2>
            <div className="max-w-md">
              <blockquote className="text-gray-400 text-lg italic mb-4">
                &quot;Our custom platform uses contextual engagement, orchestration, and fine-tuning to provide maximum human productivity.&quot;
              </blockquote>
              <p className="text-white font-semibold">— Zeb Evans, CEO</p>
            </div>
          </div>
        </div>

        {/* Agent Analytics — bordered card row */}
        <div className="tech-card rounded-2xl border border-white/5 overflow-hidden mb-6">
          <div className="grid lg:grid-cols-[300px_1fr_1fr]">
            <div className="p-8 flex flex-col justify-between border-r border-white/5">
              <div>
                <h3 className="text-2xl font-bold mb-3">Agent Analytics</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Measure productivity across teams, monitor trends, and spot your top performers.
                </p>
              </div>
              <button className="mt-6 bg-white text-gray-900 px-5 py-2.5 rounded-lg text-sm font-semibold w-fit hover:bg-gray-100 transition-colors">
                Get started
              </button>
            </div>
            <div className="p-8 border-r border-white/5">
              <p className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-6 font-mono">WORKSPACE AI PERCENTILE</p>
              <div className="flex items-end gap-3 mb-5">
                <AnimatedPercentile />
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-green-400 mb-2">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Bar segments — filled vs unfilled */}
              <div className="flex gap-[3px] mb-5">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-[14px] h-6 rounded-[2px] transition-all duration-300 ${
                      i < 10 ? "bg-white" : "bg-gray-700"
                    }`}
                    style={{ transitionDelay: `${i * 40}ms` }}
                  />
                ))}
              </div>
              <p className="text-green-400 text-sm font-mono uppercase tracking-wider font-bold">YOU CRUSHED IT!</p>
              <p className="text-gray-500 text-xs mt-1 font-mono uppercase tracking-wider">
                YOU AND YOUR AGENTS LEAD IN AI ADOPTION.
              </p>
            </div>
            <div className="p-8">
              <p className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-4 font-mono">TOP PERFORMERS</p>
              <div className="space-y-2.5">
                {topPerformers.map((p) => (
                  <div key={p.name} className="flex items-center justify-between group cursor-default hover:bg-white/[0.02] rounded-lg px-2 py-1.5 -mx-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-sm w-5 font-mono">{p.rank}.</span>
                      <div className="w-7 h-7 rounded-full overflow-hidden relative ring-2 ring-transparent group-hover:ring-green-500/30 transition-all">
                        <Image src={p.img} alt={p.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm font-medium">{p.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm font-mono tabular-nums">{p.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Awareness — bordered card row with dot matrix */}
        <div className="tech-card rounded-2xl border border-white/5 overflow-hidden mb-6">
          <div className="grid lg:grid-cols-[300px_1fr]">
            <div className="p-8 border-r border-white/5">
              <h3 className="text-2xl font-bold mb-3">Ambient Awareness</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Instantly respond to your questions - giving you accurate, context-aware answers.
              </p>
            </div>
            <div className="p-8">
              {/* Dot matrix chart with green line overlay */}
              <div className="h-28 mb-5">
                <DotMatrixChart />
              </div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-4xl font-bold font-mono tabular-nums">21.3K</span>
                  <span className="text-gray-500 text-xs ml-3 font-mono uppercase tracking-wider">QUESTIONS ANSWERED</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-gray-400 text-sm font-mono">22 AGENTS ONLINE</span>
                </div>
              </div>
              {/* Milestones */}
              <div className="border-t border-white/5 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-mono">Next milestone</span>
                  <span className="text-white font-mono tabular-nums font-medium">25,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-mono">Milestone complete</span>
                  <span className="text-gray-500 font-mono tabular-nums">20,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-mono">Milestone complete</span>
                  <span className="text-gray-500 font-mono tabular-nums">10,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Intelligence — bordered card */}
        <div className="tech-card rounded-2xl border border-white/5 overflow-hidden mb-6">
          <div className="grid lg:grid-cols-[300px_1fr]">
            <div className="p-8 border-r border-white/5">
              <h3 className="text-2xl font-bold mb-3">Live Intelligence</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Actively monitors all context to capture &amp; update knowledgebases for people, teams, projects, decisions, updates, and more.
              </p>
            </div>
            <div className="p-8 flex items-center justify-center overflow-hidden">
              {/* Animated radar/globe */}
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full radar-glow" />
                {/* Rotating rings */}
                <svg viewBox="0 0 260 260" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]">
                  <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(34,197,94,0.15)" strokeWidth="0.5" />
                  <circle cx="130" cy="130" r="90" fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="0.5" />
                  <circle cx="130" cy="130" r="60" fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="0.5" />
                  <ellipse cx="130" cy="130" rx="120" ry="40" fill="none" stroke="rgba(34,197,94,0.08)" strokeWidth="0.5" />
                  <ellipse cx="130" cy="130" rx="120" ry="80" fill="none" stroke="rgba(34,197,94,0.08)" strokeWidth="0.5" />
                  <ellipse cx="130" cy="130" rx="40" ry="120" fill="none" stroke="rgba(34,197,94,0.08)" strokeWidth="0.5" />
                  <line x1="130" y1="130" x2="130" y2="10" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
                </svg>
                {/* Counter-rotating inner ring */}
                <svg viewBox="0 0 260 260" className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite_reverse]">
                  <circle cx="130" cy="130" r="100" fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
                  <circle cx="200" cy="80" r="3" fill="rgba(34,197,94,0.4)" />
                  <circle cx="60" cy="160" r="2" fill="rgba(34,197,94,0.3)" />
                  <circle cx="180" cy="200" r="2.5" fill="rgba(34,197,94,0.35)" />
                </svg>
                {/* Floating labels */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-[10px] font-mono tracking-wider">LIVE INTELLIGENCE</span>
                </div>
                <div className="absolute bottom-14 right-8 text-gray-500 text-xs font-mono animate-[pulse_3s_ease-in-out_infinite]">Decision</div>
                <div className="absolute top-1/2 right-4 text-gray-600 text-xs font-mono animate-[pulse_4s_ease-in-out_infinite_0.5s]">Insight</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-green-500/10 rounded-t-full blur-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Knowledge — bordered card */}
        <div className="tech-card rounded-2xl border border-white/5 overflow-hidden mb-6">
          <div className="grid lg:grid-cols-[300px_1fr]">
            <div className="p-8 border-r border-white/5">
              <h3 className="text-2xl font-bold mb-3">Infinite Knowledge</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Proprietary real-time syncing engine with world-class retrieval from fine-tuned embeddings. Enterprise search from infinite connected knowledge.
              </p>
              <button className="bg-white text-gray-900 px-5 py-2.5 rounded-lg text-sm font-semibold w-fit hover:bg-gray-100 transition-colors">
                Get started
              </button>
            </div>
            <div className="grid grid-cols-3 gap-px bg-white/5">
              {/* Fig 1 - Connected apps */}
              <div className="bg-[#0d0d0d] p-6 text-center">
                <p className="text-xs text-gray-500 mb-4 font-mono">FIG 1</p>
                <div className="grid grid-cols-3 gap-2 justify-items-center mb-4">
                  {integrationIcons.map((icon, i) => (
                    <div key={i} className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-lg hover:bg-[#222] transition-colors cursor-default">
                      {icon}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400">Enterprise Connected Search from 50+ Apps</p>
              </div>
              {/* Fig 2 - Privacy */}
              <div className="bg-[#0d0d0d] p-6 text-center">
                <p className="text-xs text-gray-500 mb-4 font-mono">FIG 2</p>
                <div className="h-24 flex items-center justify-center mb-4">
                  <div className="font-mono text-xs text-gray-600 leading-relaxed">
                    <p>uajU0...</p>
                    <p>nx0Gr/10k.</p>
                    <p>=PQY0B1bf&gt;?</p>
                    <p>yp<span className="text-green-400 font-bold">PRIVATE</span>ja</p>
                    <p>4UUs4pFfcW0</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Permissions &amp; Privacy Preserved</p>
              </div>
              {/* Fig 3 - Syncing (animated) */}
              <div className="bg-[#0d0d0d] p-6 text-center">
                <p className="text-xs text-gray-500 mb-4 font-mono">FIG 3</p>
                <div className="h-24 flex items-center justify-center mb-4">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_8s_linear_infinite]">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="2" strokeDasharray="6 4" />
                    </svg>
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite_reverse]">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(34,197,94,0.15)" strokeWidth="1.5" strokeDasharray="3 6" />
                    </svg>
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                      <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="1" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold tabular-nums">2,744</span>
                      <span className="text-[8px] text-green-400 font-mono uppercase tracking-wider">EVENTS</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Real-time 2-way syncing engine</p>
              </div>
            </div>
          </div>
        </div>

        {/* BrainGPT features grid — bordered card with dividers */}
        <div className="tech-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="grid md:grid-cols-3 divide-x divide-y divide-white/5">
            {/* BrainGPT label cell — left-aligned */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">BrainGPT</h3>
              <p className="text-gray-400 text-sm">Proprietary models, architecture, and evals.</p>
            </div>
            {/* Remaining 5 cells — centered with icons */}
            {[
              { icon: "⚡", title: "Optimized Orchestration", desc: "Route to the best models from intent." },
              { icon: "🔄", title: "Self-Learning", desc: "Continuous learning and improvement." },
              { icon: "💭", title: "Human-level Memory", desc: "Short, Long-Term, & Episodic Memory." },
              { icon: "🔗", title: "Sub-Agent Architecture", desc: "Multi-agent collaboration and delegation." },
              { icon: "🔍", title: "Deep Research & Compression", desc: "Research optimally from compressed context." },
            ].map((item) => (
              <div key={item.title} className="p-8 text-center hover:bg-white/[0.02] transition-colors cursor-default group">
                <span className="text-2xl mb-3 block group-hover:scale-110 transition-transform">{item.icon}</span>
                <h4 className="font-bold mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
