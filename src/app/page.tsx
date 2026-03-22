"use client";

import HeroLanding from "@/components/sections/hero-landing";
import PersonalIntro from "@/components/sections/personal-intro";
import IntratoneTeaser from "@/components/sections/intratone-teaser";
import HomeSlides from "@/components/sections/home-slides";

export default function Home() {
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