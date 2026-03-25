"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const personRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background "Super Agents" text fades and scales
      gsap.to(bgTextRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        opacity: 0,
        scale: 0.9,
        y: -100,
      });

      // Main text fades out on scroll
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "60% top",
          scrub: 1,
        },
        opacity: 0,
        y: -60,
      });

      // Person scales down and moves back
      gsap.to(personRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "80% top",
          scrub: 1,
        },
        scale: 0.7,
        y: -40,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[120vh] overflow-hidden bg-white">
      {/* Background large text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-start justify-center pt-[8vh] pointer-events-none select-none"
      >
        <h1 className="text-[14vw] font-black text-gray-100 leading-[0.9] text-center tracking-tight">
          Super
          <br />
          Ag<span className="relative">ents</span>
        </h1>
      </div>

      {/* Hero gradient background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Person with mask - centered */}
      <div ref={personRef} className="relative z-10 flex flex-col items-center pt-[12vh]">
        <div className="relative w-[320px] h-[420px] md:w-[380px] md:h-[500px]">
          {/* Person silhouette */}
          <div className="absolute inset-0 rounded-t-[200px] overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-orange-200 via-orange-400 to-orange-500" />
            {/* Face area */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[60%] h-[35%] rounded-full bg-gradient-to-b from-[#f5c5a3] to-[#e8a882]" />
            {/* Hair */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[55%] h-[25%] rounded-t-full bg-gradient-to-b from-[#c85a28] to-[#d4743c]" />
            {/* Mask */}
            <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[45%] h-[10%] rounded-[4px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white text-[8px] font-semibold tracking-wider">Super Agent</span>
            </div>
            {/* Turtleneck */}
            <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-b from-[#ff6b35] to-[#ff5722]" />
          </div>
          {/* TM mark */}
          <span className="absolute top-[30%] -right-8 text-gray-300 text-sm">TM</span>
        </div>

        {/* Main heading */}
        <div ref={textRef} className="text-center mt-4 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            A new era of humans,
            <br />
            with AI Super Agents<span className="text-gray-400 text-3xl align-super">™</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="bg-gray-900 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Try Super Agents
            </button>
            <button className="bg-white text-gray-900 px-8 py-3.5 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-colors">
              Watch Intro
            </button>
          </div>
          {/* Scroll indicator */}
          <div className="mt-8 flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="animate-bounce">
                <path d="M2 4L6 8L10 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
