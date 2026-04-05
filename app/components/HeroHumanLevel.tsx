"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroHumanLevel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const humanLevelRef = useRef<HTMLDivElement>(null);
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const rightSidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinReparent: false,
          scrub: 1,
          pinSpacing: true,
        },
      });

      // Phase 1 (0 → 0.3): Hero text + bg fades out
      tl.to(bgTextRef.current, { opacity: 0, scale: 0.92, duration: 0.3 }, 0);
      tl.to(heroTextRef.current, { opacity: 0, y: -60, duration: 0.2 }, 0.05);

      // Person scales up during transition — modest scale since base is already large
      tl.to(personRef.current, { scale: 1.15, y: -20, duration: 0.35 }, 0.15);

      // Phase 2 (0.4 → 0.7): HumanLevel sidebars slide in
      tl.to(humanLevelRef.current, { opacity: 1, duration: 0.25 }, 0.4);
      tl.fromTo(leftSidebarRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.25 },
        0.4
      );
      tl.fromTo(rightSidebarRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.25 },
        0.43
      );

      // Phase 3 (0.7 → 1.0): Hold
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-white">

      {/* BG "Super Agents" text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <h1 className="text-[17vw] font-extrabold text-[#e8e8e8]/60 leading-[0.82] text-center tracking-[-0.03em]">
          Super
          <br />
          Agents
        </h1>
      </div>

      {/* Warm radial glow behind person — matches ClickUp's pinkish-orange aura */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,160,120,0.18) 0%, rgba(255,130,100,0.08) 30%, rgba(255,100,80,0.03) 55%, transparent 75%)",
          }}
        />
      </div>

      {/* ======= PERSON - large and centered like ClickUp ======= */}
      <div
        ref={personRef}
        className="absolute left-1/2 z-20"
        style={{
          top: "-2%",
          transform: "translateX(-50%)",
          width: "min(1100px, 85vw)",
          height: "100vh",
          transformOrigin: "center 25%",
        }}
      >
        <Image
          src="/images/agent-hero-fullbody.png"
          alt="Super Agent"
          fill
          className="object-contain object-top"
          priority
        />
        {/* Bottom dissolve — aggressive multi-stop gradient, extra wide to cover at 1.3x scale */}
        <div
          className="absolute bottom-0 left-[-80%] right-[-80%] h-[70%] pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,0.98) 45%, rgba(255,255,255,0.9) 55%, rgba(255,255,255,0.7) 65%, rgba(255,255,255,0.3) 80%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      {/* Hero heading + buttons */}
      <div
        ref={heroTextRef}
        className="absolute left-0 right-0 text-center z-30 px-4"
        style={{ bottom: "10vh" }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-gray-900 leading-[1.15] tracking-tight">
          A new era of humans,
          <br />
          with AI Super Agents<span className="text-gray-400 text-xl align-super">&#8482;</span>
        </h2>
        <div className="flex items-center justify-center gap-4 mt-7">
          <button className="bg-gray-900 text-white px-7 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm">
            Try Super Agents
          </button>
          <button className="bg-white text-gray-900 px-7 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-colors text-sm">
            Watch Intro
          </button>
        </div>
        <div className="mt-5 flex justify-center">
          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="animate-bounce">
              <path d="M2 4L6 8L10 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ======= HUMAN LEVEL LAYER ======= */}
      <div
        ref={humanLevelRef}
        className="absolute inset-0 z-10 opacity-0"
      >
        <div className="h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-start pt-[8vh]">
          <div className="grid lg:grid-cols-[1fr_500px_1fr] gap-6 w-full items-start">
            {/* Left sidebar */}
            <div ref={leftSidebarRef} className="space-y-5 pt-[2vh]">
              <p className="text-xs tracking-[0.25em] uppercase text-purple-600 font-mono">
                THE WORLD&apos;S ONLY HUMAN-LEVEL AI AGENTS
              </p>
              <h2 className="text-3xl md:text-[2.5rem] font-bold text-gray-900 leading-[1.15] tracking-tight">
                They&apos;re just like humans
              </h2>
              <p className="text-gray-500 text-[15px] max-w-sm leading-relaxed">
                Maximize human productivity with agentic teammates - @mention, assign tasks, &amp; message directly. Choose when, how, and what they work on - always improving with infinite knowledge &amp; memory.
              </p>
              <div className="border-t border-gray-200 pt-5">
                <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-3 font-mono">HUMAN POWERS</p>
                <div className="space-y-2.5">
                  {["Assign", "Message", "Mention", "500+ Human Skills"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-gray-700">
                      <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4 1.5V6.5M1.5 4H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span className="font-semibold text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center spacer */}
            <div className="hidden lg:block" />

            {/* Right sidebar */}
            <div ref={rightSidebarRef} className="space-y-5 pt-[6vh]">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-purple-600 mb-3 font-mono">SUPERPOWERS</p>
                <div className="bg-gray-50 rounded-xl p-4 mb-3">
                  <p className="text-sm leading-relaxed">
                    <span className="font-bold">24/7.</span> Your AI agents work around the clock, never taking breaks. Always available to handle tasks and requests.
                  </p>
                </div>
                <div className="space-y-2">
                  {["Ambient", "Automated", "Self-learning"].map((item) => (
                    <div key={item} className="flex items-center justify-end gap-2 text-gray-600">
                      <span className="font-medium text-sm">{item}</span>
                      <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4 1.5V6.5M1.5 4H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-purple-600 mb-3 font-mono">SUPERINTELLIGENCE</p>
                <div className="space-y-2">
                  {["Infinite Memory", "Infinite Knowledge"].map((item) => (
                    <div key={item} className="flex items-center justify-end gap-2 text-gray-600">
                      <span className="font-medium text-sm">{item}</span>
                      <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4 1.5V6.5M1.5 4H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
