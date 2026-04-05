"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Security() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".security-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
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
        <div className="border-t border-white/10 pt-6 mb-16 security-content">
          <p className="text-xs tracking-[0.2em] text-gray-500 mb-8">[ SECURITY ]</p>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Agentic User Security
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Completely proprietary AI user data model compatible with all enterprise security systems, and familiar to all humans.
            </p>
          </div>
        </div>

        {/* Permissions card */}
        <div className="security-content bg-[#1a1a1a] rounded-2xl p-8 mb-8 border border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">Implicit &amp; Explicit Access, with Custom Permissions</h3>
              <p className="text-gray-400 max-w-xl">
                Built on the same battle-tested user data model your team already uses - Super Agents can inherit implicit access, have explicit permissions, and be given access manually.
              </p>
            </div>
            <button className="bg-white text-gray-900 px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap hover:bg-gray-100 transition-colors">
              Learn more
            </button>
          </div>

          {/* Person with connection lines */}
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center gap-8 md:gap-12 lg:gap-16 flex-wrap justify-center">
              <div className="space-y-12 text-right">
                {["INTEGRATIONS", "SHARING", "PERMISSIONS"].map((label) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-500 tracking-wider">{label}</span>
                    <div className="w-20 lg:w-32 h-px bg-gradient-to-r from-transparent to-gray-600" />
                  </div>
                ))}
              </div>

              {/* Center person - half human / half code split effect */}
              <div className="w-[200px] h-[300px] relative group">
                {/* Left half - human */}
                <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0 50% 0 0)" }}>
                  <Image
                    src="/images/agent-6-bob-woman.png"
                    alt="Agent"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
                {/* Right half - code/matrix overlay */}
                <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0 0 0 50%)" }}>
                  <Image
                    src="/images/agent-6-bob-woman.png"
                    alt="Agent"
                    fill
                    className="object-contain object-bottom opacity-40"
                  />
                  {/* Matrix code overlay */}
                  <div className="absolute inset-0 dot-pattern opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-purple-900/30" />
                </div>
                {/* Center divider line with sparkles */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-purple-400/60 to-transparent" />
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-300 animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
                <div className="absolute top-[75%] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400 animate-[pulse_2s_ease-in-out_infinite_1s]" />
              </div>

              <div className="space-y-12">
                {["SUPER KNOWLEDGE", "CAPABILITIES", "ENGAGEMENT FUNCTIONALITY"].map((label) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-20 lg:w-32 h-px bg-gradient-to-l from-transparent to-gray-600" />
                    <span className="text-xs font-mono text-gray-500 tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Three cards — bordered card with dividers like reference */}
        <div className="security-content rounded-2xl border border-white/10 overflow-hidden grid md:grid-cols-3 divide-x divide-white/10 mb-8">
          <div className="p-8">
            <h3 className="text-xl font-bold mb-3">Audit everything</h3>
            <p className="text-gray-400 text-sm">Extraordinary alignment with humans with advanced execution.</p>
            <div className="mt-6 space-y-3">
              {[
                { icon: "✅", title: "Create task", time: "8:10:18 PM", list: "Sprint Planning" },
                { icon: "⚠️", title: "Comment on task", time: "8:09:05 PM", list: "Project In Progress" },
                { icon: "✅", title: "Assign task to teammate", time: "8:07:52 PM", list: "Team Updates" },
                { icon: "⚠️", title: "Changed status on task", time: "8:06:41 PM", list: "Bug Fixes" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.time} • in ≡ {item.list}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-3 text-center">Zero data retention.<br />Zero training.</h3>
            <p className="text-gray-400 text-sm text-center mb-6">More secure than using OpenAI, Gemini directly.</p>
            {/* Shield icon */}
            <div className="w-32 h-32 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-[40px] rounded-t-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M12 18L20 24L28 18" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M15 22L20 18L25 22" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-bold mb-3">Reflection</h3>
            <p className="text-gray-400 text-sm mb-6">Advanced execution loops that ensure Agents constantly reflect on work they&apos;re doing.</p>
            {/* Animated cycle diagram */}
            <div className="flex justify-center">
              <div className="relative w-36 h-36">
                {/* Outer rotating ring with arrows */}
                <svg viewBox="0 0 120 120" className="w-full h-full animate-[spin_12s_linear_infinite]">
                  <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  {/* Arrow heads at cardinal points */}
                  <path d="M58 15 L60 10 L62 15" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M105 58 L110 60 L105 62" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M62 105 L60 110 L58 105" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M15 62 L10 60 L15 58" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  {/* Dots on ring */}
                  <circle cx="60" cy="15" r="2" fill="rgba(255,255,255,0.3)" />
                  <circle cx="105" cy="60" r="2" fill="rgba(255,255,255,0.3)" />
                  <circle cx="60" cy="105" r="2" fill="rgba(255,255,255,0.3)" />
                  <circle cx="15" cy="60" r="2" fill="rgba(255,255,255,0.3)" />
                </svg>
                {/* Inner dashed ring - counter-rotates */}
                <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite_reverse]">
                  <circle cx="60" cy="60" r="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="3 5" />
                </svg>
                {/* Static labels */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/70 tracking-wider">EXECUTE</div>
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-[9px] font-mono text-white/70 tracking-wider">REFLECT</div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/70 tracking-wider">THINK</div>
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 text-[9px] font-mono text-white/70 tracking-wider">PLAN</div>
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
