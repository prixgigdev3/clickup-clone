"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ctaAgents = [
  { src: "/images/agent-1-beard-green.png", alt: "Agent 1", size: "w-[100px] h-[160px] md:w-[130px] md:h-[200px]" },
  { src: "/images/agent-7-blonde.png", alt: "Agent 2", size: "w-[110px] h-[180px] md:w-[140px] md:h-[220px]" },
  { src: "/images/agent-2-redhead.png", alt: "Agent 3", size: "w-[130px] h-[210px] md:w-[170px] md:h-[270px]" },
  { src: "/images/agent-3-black-woman.png", alt: "Agent 4", size: "w-[110px] h-[180px] md:w-[140px] md:h-[220px]" },
  { src: "/images/agent-5-curly-woman.png", alt: "Agent 5", size: "w-[100px] h-[160px] md:w-[130px] md:h-[200px]" },
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-text", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        opacity: 0, scale: 0.9, y: 40, duration: 0.8, ease: "power2.out",
      });
      gsap.from(".cta-agent", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        opacity: 0, y: 60, stagger: 0.08, duration: 0.8, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-[2rem] overflow-hidden relative min-h-[550px] flex flex-col items-center justify-between pt-16 pb-0">
          {/* Gradient background image */}
          <Image src="/images/gradient-bg.webp" alt="" fill className="object-cover" aria-hidden="true" />
          {/* Grain overlay */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
          }} />

          {/* Heading */}
          <h2 className="cta-text text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white text-center leading-[1.05] tracking-tight relative z-10">
            Try Super
            <br />
            Agents today
          </h2>

          {/* Multiple agents in a row - like the ClickUp group shot */}
          <div className="relative z-10 flex items-end justify-center mt-4 -mb-1">
            {ctaAgents.map((agent, i) => (
              <div key={i} className={`cta-agent ${agent.size} relative -mx-2 md:-mx-3`}>
                <Image
                  src={agent.src}
                  alt={agent.alt}
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            ))}
          </div>

          {/* CTA button overlaid */}
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20">
            <button className="bg-white text-gray-900 px-8 py-3.5 rounded-xl font-semibold shadow-xl hover:bg-gray-100 transition-colors text-sm">
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* Footer icon */}
      <div className="max-w-7xl mx-auto mt-16 pb-8 text-center">
        <div className="w-8 h-8 mx-auto opacity-30">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 3L3 8V21H9V14H15V21H21V8L12 3Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}
