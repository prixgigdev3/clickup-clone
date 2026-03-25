"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const agents = [
  { name: "PM Agents", color: "bg-orange-50", iconBg: "bg-orange-500", textColor: "text-gray-900" },
  { name: "Sales Agents", color: "bg-blue-50", iconBg: "bg-blue-500", textColor: "text-gray-900" },
  { name: "Coding Agents", color: "bg-green-50", iconBg: "bg-green-500", textColor: "text-gray-900" },
  { name: "Designer Agents", color: "bg-purple-50", iconBg: "bg-purple-500", textColor: "text-gray-900" },
  { name: "Custom Agent", color: "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500", iconBg: "", textColor: "text-white" },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agent-card-item", {
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
    <section ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="border-t border-gray-200 pt-6 mb-12">
          <p className="section-label mb-8">[CAPABILITIES]</p>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Agents for
              <br />
              everything
            </h2>
            <div className="max-w-md">
              <p className="text-gray-500 text-lg mb-6">
                The world&apos;s only infinite agent catalog where anyone can create and customize agents for any type of work imaginable.
              </p>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Agent cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {agents.map((agent, i) => (
            <div
              key={agent.name}
              className={`agent-card agent-card-item ${agent.color} rounded-2xl p-5 aspect-[3/4] flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="flex items-center gap-2">
                {agent.iconBg && (
                  <div className={`w-7 h-7 ${agent.iconBg} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">
                      {agent.name[0]}
                    </span>
                  </div>
                )}
                <span className={`font-bold text-sm ${agent.textColor}`}>{agent.name}</span>
              </div>

              {/* Placeholder person */}
              <div className="flex-1 flex items-end justify-center mt-4">
                <div className="w-[80%] h-[70%] rounded-t-[100px] bg-gradient-to-b from-gray-200/50 to-gray-300/50 relative overflow-hidden">
                  <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[50%] h-[8%] rounded bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" />
                </div>
              </div>

              {/* Plus button */}
              <div className="absolute bottom-4 right-4">
                {i < 4 ? (
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2V12M2 7H12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                ) : (
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium">
                    Create custom agent
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
