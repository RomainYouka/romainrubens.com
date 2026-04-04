"use client";

import HeroLanding from "@/components/sections/hero-landing";
import PersonalIntro from "@/components/sections/personal-intro";
import IntratoneTeaser from "@/components/sections/intratone-teaser";
import HomeSlides from "@/components/sections/home-slides";
import { useSnapScroll } from "@/hooks/useSnapScroll";

export default function Home() {
  useSnapScroll();

  return (
    <main className="min-h-screen bg-[#F5F5F5] w-full">
      <div className="w-full">
        <HeroLanding />
      </div>

      <div className="w-full">
        <PersonalIntro />
      </div>
    </main>
  );
}