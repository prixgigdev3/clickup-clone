"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HumanLevel() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".human-level-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 0,
        y: 60,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="human-level-content grid lg:grid-cols-[1fr_380px_1fr] gap-8 items-start">
          {/* Left column */}
          <div className="space-y-8">
            <p className="section-label">THE WORLD&apos;S ONLY HUMAN-LEVEL AI AGENTS</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              They&apos;re just like humans
            </h2>
            <p className="text-gray-500 text-lg max-w-md">
              Maximize human productivity with agentic teammates - @mention, assign tasks, &amp; message directly. Choose when, how, and what they work on - always improving with infinite knowledge &amp; memory.
            </p>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">HUMAN POWERS</p>
              <div className="space-y-3">
                {["Assign", "Message", "Mention", "500+ Human Skills"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 2V8M2 5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Person */}
          <div className="relative hidden lg:flex justify-center">
            <div className="w-[300px] h-[500px] relative">
              <div className="absolute inset-0 rounded-t-[150px] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-orange-200 via-orange-400 to-orange-500" />
                <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[60%] h-[30%] rounded-full bg-gradient-to-b from-[#f5c5a3] to-[#e8a882]" />
                <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[55%] h-[22%] rounded-t-full bg-gradient-to-b from-[#c85a28] to-[#d4743c]" />
                <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[48%] h-[9%] rounded-[4px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-[7px] font-semibold tracking-wider">Super Agent</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-b from-[#ff6b35] to-[#ff5722]" />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-purple-600 mb-4">SUPERPOWERS</p>
              <div className="bg-gray-50 rounded-xl p-5 mb-3">
                <p className="text-sm">
                  <span className="font-bold">24/7.</span> Your AI agents work around the clock, never taking breaks. Always available to handle tasks and requests.
                </p>
              </div>
              <div className="space-y-2">
                {["Ambient", "Automated", "Self-learning"].map((item) => (
                  <div key={item} className="flex items-center justify-end gap-2 text-gray-600">
                    <span className="font-medium">{item}</span>
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
              <p className="text-xs tracking-[0.2em] uppercase text-purple-600 mb-4">SUPERINTELLIGENCE</p>
              <div className="space-y-2">
                {["Infinite Memory", "Infinite Knowledge"].map((item) => (
                  <div key={item} className="flex items-center justify-end gap-2 text-gray-600">
                    <span className="font-medium">{item}</span>
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
    </section>
  );
}
