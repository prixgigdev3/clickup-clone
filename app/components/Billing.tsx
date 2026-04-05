"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Billing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slides up
      gsap.from(".billing-heading", {
        scrollTrigger: {
          trigger: ".billing-heading",
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power2.out",
      });

      // Card slides in from right
      gsap.from(".billing-card", {
        scrollTrigger: {
          trigger: ".billing-card",
          start: "top 80%",
        },
        opacity: 0,
        x: 80,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {/* Gradient transition from dark to light - using gradient image */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/gradient-bg.webp"
          alt=""
          fill
          className="object-cover rotate-180"
          aria-hidden="true"
        />
        {/* Top fade from dark */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0d0d0d] to-transparent z-10" />
        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="billing-heading">
              <p className="section-label mb-4 font-mono">SUPER FAIR BILLING POLICY</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
                When we optimize,
                <br />
                you save $
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                When our teams save on AI costs, we pass them onto you. When sudden increases in AI costs occur as a result of new models or other changes, we subsidize the cost so you don&apos;t see any sudden increases on credit usage.
              </p>
            </div>

            {/* Credit card */}
            <div className="billing-card flex justify-center">
              <div className="bg-gray-50 rounded-3xl p-10 max-w-md w-full">
                <div className="credit-card p-8 aspect-[3.5/2.5] flex flex-col justify-between relative z-10 shadow-2xl">
                  <div className="flex items-center gap-2 relative z-10">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">S</span>
                    </div>
                    <span className="text-white text-sm font-semibold">Super Agent</span>
                  </div>
                  <div className="text-center relative z-10">
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] mb-3">PRICE PER CREDIT</p>
                    <p className="text-5xl md:text-6xl font-bold text-white/70 font-mono tracking-tight">$0.001</p>
                  </div>
                  <div className="relative z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
