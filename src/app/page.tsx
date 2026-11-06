"use client";

import HeroLanding from "@/components/sections/hero-landing";
import PersonalIntro from "@/components/sections/personal-intro";
import HomeScrollScene from "@/components/HomeScrollScene";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen w-full" style={{ backgroundColor: "var(--theme-bg)" }}>
      <HomeScrollScene introduction={<PersonalIntro />}><HeroLanding /></HomeScrollScene>
    </main>
  );
}
