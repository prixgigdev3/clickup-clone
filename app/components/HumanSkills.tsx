"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const emailLines = [
  { text: "Hey, Michael!", bold: true },
  { text: "" },
  { text: "Thanks for providing your feedback earlier today!" },
  { text: "" },
  { text: "I scheduled a follow-up meeting for tomorrow at 3pm." },
  { text: "" },
  { text: "Engineering has taken a look, and it appears the issue is related to updating the custom field. We'll look more into it." },
];

function TypingEmail() {
  const [lines, setLines] = useState<{ text: string; bold?: boolean }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startTyping = useCallback(() => {
    setLines([]);
    setCurrentLine(0);
    setCurrentChar(0);
    setIsTyping(true);
  }, []);

  // Start typing when scrolled into view
  useEffect(() => {
    if (!containerRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 75%",
      onEnter: () => { if (!isTyping) startTyping(); },
      once: true,
    });
    return () => trigger.kill();
  }, [isTyping, startTyping]);

  // Typing effect
  useEffect(() => {
    if (!isTyping) return;
    if (currentLine >= emailLines.length) {
      setIsTyping(false);
      return;
    }

    const line = emailLines[currentLine];
    if (line.text === "") {
      // Empty line - add immediately and move to next
      const timer = setTimeout(() => {
        setLines(prev => [...prev, { text: "" }]);
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 100);
      return () => clearTimeout(timer);
    }

    if (currentChar >= line.text.length) {
      // Line complete, move to next
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(timer);
    }

    // Type next character
    const speed = 15 + Math.random() * 25; // Variable typing speed
    const timer = setTimeout(() => {
      setLines(prev => {
        const updated = [...prev];
        const lineIdx = prev.length - 1;
        if (lineIdx >= 0 && currentChar > 0) {
          updated[lineIdx] = { ...line, text: line.text.slice(0, currentChar + 1) };
        } else {
          updated.push({ ...line, text: line.text.slice(0, 1) });
        }
        return updated;
      });
      setCurrentChar(prev => prev + 1);
    }, speed);
    return () => clearTimeout(timer);
  }, [isTyping, currentLine, currentChar]);

  return (
    <div ref={containerRef} className="space-y-1.5 text-gray-700 text-sm pr-28 min-h-[120px]">
      {lines.map((line, i) => (
        <p key={i} className={line.bold ? "font-bold" : ""}>
          {line.text || "\u00A0"}
          {i === lines.length - 1 && isTyping && (
            <span className="inline-block w-0.5 h-4 bg-gray-900 ml-0.5 animate-pulse align-text-bottom" />
          )}
        </p>
      ))}
      {lines.length === 0 && (
        <span className="inline-block w-0.5 h-4 bg-gray-900 animate-pulse" />
      )}
    </div>
  );
}

const skills = [
  { icon: "▷", name: "Send Email", description: "Super Agents manage, draft, and send clear, accurate emails based on context in ClickUp.", active: true },
  { icon: "💬", name: "Direct Message", description: "", active: false },
  { icon: "✓", name: "Assign a task", description: "", active: false },
  { icon: "📅", name: "Schedule events", description: "", active: false },
  { icon: "@", name: "Mentions", description: "", active: false },
];

export default function HumanSkills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-left", {
        scrollTrigger: { trigger: ".skills-left", start: "top 80%" },
        opacity: 0, x: -40, duration: 0.8, ease: "power2.out",
      });
      gsap.from(".skills-right", {
        scrollTrigger: { trigger: ".skills-right", start: "top 80%" },
        opacity: 0, x: 40, duration: 0.8, ease: "power2.out", delay: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="border-t border-gray-200 pt-6 mb-16">
          <p className="section-label mb-8 font-mono">[HUMAN SKILLS]</p>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Do more than
              <br />
              humanly possible
            </h2>
            <div className="max-w-md">
              <blockquote className="text-gray-500 text-lg italic mb-4 leading-relaxed">
                &quot;The holy grail of what enterprises are chasing - this is a game changer for work productivity.&quot;
              </blockquote>
              <p className="text-gray-900 font-semibold">— Jay Hack, CEO of Codegen</p>
            </div>
          </div>
        </div>

        {/* Skills showcase */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Skills list */}
          <div className="skills-left bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              The only agents that work like humans – with infinite skills
            </h3>
            <div className="mt-8 space-y-1">
              {skills.map((skill) => (
                <div key={skill.name} className={`rounded-xl p-4 transition-colors ${skill.active ? "bg-white shadow-sm" : "hover:bg-white/50"}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{skill.icon}</span>
                    <span className={`font-semibold ${skill.active ? "text-gray-900" : "text-gray-400"}`}>{skill.name}</span>
                  </div>
                  {skill.active && skill.description && (
                    <p className="text-gray-500 text-sm mt-2 ml-9">{skill.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Demo card with DIFFERENT agent */}
          <div className="skills-right space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image src="/images/agent-10-grey-afro.png" alt="Executive Assistant" fill className="object-cover" />
                </div>
                <span className="font-bold text-gray-900">Executive Assistant Agent</span>
              </div>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400" />Reviewing meeting notes</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400" />Meeting scheduled</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400" />Drafting email</li>
              </ul>
            </div>

            {/* Email preview card with agent photo */}
            <div className="bg-purple-50 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-500 text-lg font-bold">M</span>
                <span className="font-bold text-gray-900">RE: ClickUp feedback session</span>
              </div>
              <p className="text-gray-500 text-sm mb-3">To: Michael Van Doorn</p>
              <TypingEmail />

              {/* Agent 3 (black woman) on right side */}
              <div className="absolute -right-4 -bottom-4 w-[140px] h-[200px] hidden md:block">
                <Image src="/images/agent-3-black-woman.png" alt="Agent" fill className="object-contain object-bottom" />
              </div>

              <div className="absolute bottom-4 left-6 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg max-w-[220px]">
                <span className="text-green-400 mr-1">✓</span>
                I&apos;ll write an email to our vendor to ensure we&apos;re on track.
              </div>
            </div>
          </div>
        </div>

        {/* Collaborate & Managed */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-gray-50 rounded-2xl p-8 mb-6 relative overflow-hidden min-h-[180px]">
              <div className="flex items-start gap-4">
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-gray-900 mb-1">Overview</h4>
                  <p className="text-gray-400 text-sm">Central hub guiding new team members through resources to ensure smooth onboarding...</p>
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p>📧 Letter from the CEO</p>
                    <p>💬 Company Story</p>
                  </div>
                </div>
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">Wellness Agent</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Collaborate alongside humans</h3>
            <p className="text-gray-500 mt-2">Just like a highly skilled teammate</p>
          </div>

          <div className="text-center">
            <div className="bg-gray-50 rounded-2xl p-8 mb-6">
              <p className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-4 font-mono">ORG CHART</p>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image src="/images/agent-8-older.png" alt="Manager" fill className="object-cover" />
                </div>
                <p className="text-sm font-medium mb-4 mt-1">Head of Marketing</p>
                <div className="w-px h-6 bg-gray-300" />
                <div className="flex gap-6 mt-2">
                  {[
                    { name: "Designer Agent", img: "/images/agent-5-curly-woman.png" },
                    { name: "Brand Agent", img: "/images/agent-6-bob-woman.png" },
                    { name: "Executive Assistant", img: "/images/agent-9-latino.png" },
                  ].map((a) => (
                    <div key={a.name} className="text-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative mx-auto mb-1">
                        <Image src={a.img} alt={a.name} fill className="object-cover" />
                      </div>
                      <p className="text-xs text-gray-600">{a.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Managed by humans</h3>
            <p className="text-gray-500 mt-2">Agents have managers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
