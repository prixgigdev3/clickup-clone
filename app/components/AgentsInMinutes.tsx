"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AgentsInMinutes() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".org-chart", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Org chart */}
          <div className="org-chart flex justify-center">
            <div className="relative">
              {/* Root node */}
              <div className="flex justify-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 border-2 border-white shadow-lg" />
              </div>
              {/* Vertical line */}
              <div className="absolute left-1/2 top-14 w-px h-8 bg-gray-300" />
              {/* Second level */}
              <div className="flex justify-center mb-8 pt-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-400 border-2 border-white shadow-lg" />
              </div>
              {/* Branch lines */}
              <div className="absolute left-1/2 top-[6.5rem] w-px h-8 bg-gray-300" />
              <div className="relative flex justify-center gap-24 pt-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] h-px bg-gray-300" />
                {/* Three branches */}
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 border-2 border-white shadow-lg mx-auto mb-2" />
                  <div className="bg-white rounded-lg border border-gray-200 px-3 py-1.5 text-sm">
                    <span className="text-blue-500 mr-1">◉</span> Copywriting
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-400 border-2 border-white shadow-lg mx-auto mb-2" />
                  <div className="bg-white rounded-lg border border-gray-200 px-3 py-1.5 text-sm">
                    <span className="text-yellow-500 mr-1">◉</span> Email Design
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-300 to-green-400 border-2 border-white shadow-lg mx-auto mb-2" />
                  <div className="bg-white rounded-lg border border-gray-200 px-3 py-1.5 text-sm">
                    <span className="text-red-500 mr-1">◉</span> Campaign lifecycle
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div>
            <p className="section-label mb-4">AGENTS IN MINUTES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              One prompt spins up an entire team
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Your goals, workflows, and frustrations - automatically delegated to a team of agents.
            </p>
            <button className="bg-gray-900 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Explore all agents
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
