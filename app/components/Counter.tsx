"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Counter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const targetCount = 10239794;
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetCount,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => setCount(Math.floor(obj.val)),
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formattedCount = count.toLocaleString();

  return (
    <section ref={sectionRef} className="bg-gray-50 py-24 lg:py-32 dot-pattern relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        {/* Decorative person silhouettes on sides */}
        <div className="absolute left-0 top-0 w-48 h-64 opacity-60 hidden lg:block">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-blue-100 to-transparent rounded-full blur-sm" />
        </div>
        <div className="absolute right-0 top-0 w-48 h-64 opacity-60 hidden lg:block">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-green-100 to-transparent rounded-full blur-sm" />
        </div>

        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-2 tabular-nums">
          {formattedCount}
        </h2>
        <p className="text-gray-500 text-lg mb-12">Super Agents created on ClickUp</p>

        {/* Create agent input */}
        <div className="max-w-lg mx-auto">
          <div className="gradient-border-input p-0.5 rounded-2xl">
            <div className="bg-white rounded-xl p-6">
              <textarea
                placeholder="Describe your agent and I'll build it"
                className="w-full resize-none border-none outline-none text-gray-500 text-sm h-16 placeholder:text-gray-400"
              />
              <div className="flex justify-start mt-2">
                <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                  Create agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
