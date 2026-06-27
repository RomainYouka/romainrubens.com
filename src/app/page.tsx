"use client";

import HeroLanding from "@/components/sections/hero-landing";
import PersonalIntro from "@/components/sections/personal-intro";
import { useSnapScroll } from "@/hooks/useSnapScroll";

export default function Home() {
  useSnapScroll();

  return (
    <main id="main-content" className="min-h-screen w-full" style={{ backgroundColor: "var(--theme-bg-alt)" }}>
      <div className="w-full">
        <HeroLanding />
      </div>

      <div className="w-full">
        <PersonalIntro />
      </div>
    </main>
  );
}
