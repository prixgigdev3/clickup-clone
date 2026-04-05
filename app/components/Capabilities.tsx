"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const agents = [
  { name: "PM Agents", color: "bg-orange-100", iconColor: "bg-orange-500", image: "/images/agent-5-curly-woman.png" },
  { name: "Sales Agents", color: "bg-blue-100", iconColor: "bg-blue-500", image: "/images/agent-7-blonde.png" },
  { name: "Coding Agents", color: "bg-green-100", iconColor: "bg-green-500", image: "/images/agent-1-beard-green.png" },
  { name: "Designer Agents", color: "bg-purple-100", iconColor: "bg-purple-500", image: "/images/agent-3-black-woman.png" },
  { name: "Certified Agents", color: "", iconColor: "", image: "/images/agent-4-asian.png", isCustom: true },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollIdx = useRef(0);

  const scrollTo = useCallback((direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLDivElement>(".agent-card-item");
    if (!cards.length) return;

    if (direction === "next") {
      scrollIdx.current = Math.min(scrollIdx.current + 1, cards.length - 1);
    } else {
      scrollIdx.current = Math.max(scrollIdx.current - 1, 0);
    }

    const card = cards[scrollIdx.current];
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    // Scroll so the target card's left edge is at the track's left edge + some padding
    const offset = cardRect.left - trackRect.left + track.scrollLeft - 0;

    track.scrollTo({ left: offset, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agent-card-item", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        opacity: 0, y: 50, stagger: 0.12, duration: 0.7, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="border-t border-gray-200 pt-6 mb-12">
          <p className="section-label mb-8 font-mono">[CAPABILITIES]</p>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Agents for
              <br />
              everything
            </h2>
            <div className="max-w-md">
              <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                The world&apos;s only infinite <span className="text-gray-900 underline underline-offset-2 decoration-gray-300">agent catalog</span> where anyone can create and customize agents for any type of work imaginable.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => scrollTo("prev")}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollTo("next")}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel track — overflows viewport on both sides */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth px-6 lg:px-[calc((100vw-1280px)/2+2rem)] pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        <style>{`div[class*="overflow-x-auto"]::-webkit-scrollbar { display: none; }`}</style>
        {agents.map((agent, i) => {
          // Stagger card heights like the reference
          const heightClass = i % 2 === 0 ? "h-[420px]" : "h-[380px]";
          const topOffset = i % 2 === 0 ? "mt-0" : "mt-10";

          return (
            <div
              key={agent.name}
              className={`agent-card agent-card-item flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px] ${heightClass} ${topOffset} ${
                agent.isCustom ? "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" : agent.color
              } rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="flex items-center gap-2 relative z-10">
                {agent.iconColor && (
                  <div className={`w-7 h-7 ${agent.iconColor} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{agent.name[0]}</span>
                  </div>
                )}
                <span className={`font-bold text-sm ${agent.isCustom ? "text-white" : "text-gray-900"}`}>
                  {agent.name}
                </span>
              </div>

              {/* Agent photo */}
              <div className="absolute bottom-0 left-0 right-0 h-[78%]">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  className={`object-contain object-bottom ${agent.isCustom ? "opacity-80 brightness-[0.4]" : ""}`}
                />
              </div>

              {/* Plus / CTA button */}
              <div className="absolute bottom-4 right-4 z-10">
                {!agent.isCustom ? (
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2V12M2 7H12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                ) : (
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:bg-gray-100 transition-colors">
                    Get Certified Agent
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
