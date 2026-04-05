"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Counter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const targetCount = 10375505;
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

      gsap.from(".counter-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 50, duration: 0.8, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Contained card with dot pattern - matching ClickUp's style */}
        <div className="counter-card relative rounded-2xl overflow-hidden bg-gray-50 dot-pattern min-h-[350px] flex items-center justify-center">
          {/* Agent faces peeking from sides */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] h-[260px] hidden lg:block -translate-x-[15%]">
            <Image src="/images/agent-7-blonde.png" alt="" fill className="object-contain object-right" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[200px] h-[260px] hidden lg:block translate-x-[15%]">
            <Image src="/images/agent-1-beard-green.png" alt="" fill className="object-contain object-left" />
          </div>

          <div className="relative z-10 text-center py-16 px-4">
            <h2 className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-gray-900 mb-2 tabular-nums tracking-tight italic">
              {count.toLocaleString()}
            </h2>
            <p className="text-gray-500 text-base mb-8">Super Agents created on ClickUp</p>
            <button className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors">
              Try Super Agents
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
