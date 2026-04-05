"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const orgNodes = [
  { img: "/images/agent-10-grey-afro.png" },
  { img: "/images/agent-8-older.png" },
  { img: "/images/agent-5-curly-woman.png", label: "Copywriting", dot: "text-blue-500" },
  { img: "/images/agent-4-asian.png", label: "Email Design", dot: "text-yellow-500" },
  { img: "/images/agent-9-latino.png", label: "Campaign lifecycle", dot: "text-red-500" },
];

export default function AgentsInMinutes() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".org-chart", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        opacity: 0, scale: 0.9, duration: 0.8, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Org chart with real agent faces */}
          <div className="org-chart flex justify-center">
            <div className="relative">
              {/* Root node */}
              <div className="flex justify-center mb-8">
                <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden relative">
                  <Image src={orgNodes[0].img} alt="Agent" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute left-1/2 top-14 w-px h-8 bg-gray-300" />
              {/* Second level */}
              <div className="flex justify-center mb-8 pt-4">
                <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden relative">
                  <Image src={orgNodes[1].img} alt="Agent" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute left-1/2 top-[6.5rem] w-px h-8 bg-gray-300" />
              {/* Three branches */}
              <div className="relative flex justify-center gap-24 pt-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] h-px bg-gray-300" />
                {orgNodes.slice(2).map((node, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden relative mx-auto mb-2">
                      <Image src={node.img} alt="Agent" fill className="object-cover" />
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 px-3 py-1.5 text-sm">
                      <span className={`${node.dot} mr-1`}>◉</span> {node.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text content */}
          <div>
            <p className="section-label mb-4 font-mono">AGENTS IN MINUTES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              One prompt spins up an entire team
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Your goals, workflows, and frustrations - automatically delegated to a team of agents.
            </p>
            <button className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm">
              Explore all agents
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
