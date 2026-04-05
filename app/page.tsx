"use client";

import SmoothScroll from "./components/SmoothScroll";
import HeroHumanLevel from "./components/HeroHumanLevel";
import Capabilities from "./components/Capabilities";
import BuildAgent from "./components/BuildAgent";
import AgentsInMinutes from "./components/AgentsInMinutes";
import HumanSkills from "./components/HumanSkills";
import Counter from "./components/Counter";
import SuperhumanTransition from "./components/SuperhumanTransition";
import Technology from "./components/Technology";
import Security from "./components/Security";
import Billing from "./components/Billing";
import FinalCTA from "./components/FinalCTA";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <HeroHumanLevel />
        <Capabilities />
        <BuildAgent />
        <AgentsInMinutes />
        <HumanSkills />
        <Counter />
        <SuperhumanTransition />
        <Technology />
        <Security />
        <Billing />
        <FinalCTA />
      </main>
    </SmoothScroll>
  );
}
