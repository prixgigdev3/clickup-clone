"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BuildAgent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".build-banner", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 40, duration: 0.8, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="build-banner relative rounded-2xl overflow-hidden min-h-[280px] flex items-center">
          {/* Gradient background */}
          <Image
            src="/images/gradient-bg.webp"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          {/* Grain */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
          }} />

          <div className="relative z-10 flex items-center justify-between w-full p-10 lg:p-16">
            {/* Text content */}
            <div className="max-w-md">
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                Build the exact
                <br />
                agent you need
              </h3>
              <p className="text-white/80 text-base mb-6">
                Describe the job, and build the perfect agent. No technical skills required.
              </p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors">
                Build my agent
              </button>
            </div>

            {/* Agent face with code/matrix overlay */}
            <div className="hidden lg:block relative w-[280px] h-[220px]">
              <Image
                src="/images/agent-6-bob-woman.png"
                alt="Agent"
                fill
                className="object-contain object-right opacity-90"
              />
              {/* Matrix/code dots overlay on agent */}
              <div className="absolute inset-0 dot-pattern opacity-40 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
