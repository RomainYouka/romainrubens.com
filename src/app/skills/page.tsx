"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Language = "FR" | "EN" | "ՀԱՅ";

interface Skill {
  name: string;
  rating: number; // 0-5
}

const translations = {
  FR: {
    title: "Compétences",
    subtitle: "Une vision transversale de mes savoir-faire en design, interaction et outils numériques.",
    designSkills: "Design & UX/UI",
    toolsSkills: "Outils numériques",
    skills: {
      // Design skills
      "UX Design": 4,
      "UI Design": 5,
      "Interaction Design": 4,
      "User Research": 3,
      "Systems thinking": 3,
      "User journeys": 4,
      "Wireframing": 4,
      "Prototyping": 4,
      "Design System": 4,
      "Visual Hierarchy": 4,
      "Usability Testing": 3,
      "Accessibility": 3,
      "Typography": 4,
      "Motion Design": 3,
      // Tools
      "Figma": 5,
      "Adobe Photoshop": 4,
      "Adobe After Effects": 3,
      "Sketch": 3,
      "InDesign": 3,
      "Adobe Illustrator": 4,
      "Framer": 4,
      "Replit": 4,
      "Web Development": 3,
      "HTML & CSS": 4,
      "JavaScript & React": 4,
      "Next.js": 4,
      "Notion": 5,
      "Tally": 3,
      "Google Tools": 4,
    }
  },
  EN: {
    title: "Skills",
    subtitle: "A cross-functional overview of my expertise in design, interaction, and digital tools.",
    designSkills: "Design & UX/UI",
    toolsSkills: "Digital tools",
    skills: {
      // Design skills
      "UX Design": 4,
      "UI Design": 5,
      "Interaction Design": 4,
      "User Research": 3,
      "Systems thinking": 3,
      "User journeys": 4,
      "Wireframing": 4,
      "Prototyping": 4,
      "Design System": 4,
      "Visual Hierarchy": 4,
      "Usability Testing": 3,
      "Accessibility": 3,
      "Typography": 4,
      "Motion Design": 3,
      // Tools
      "Figma": 5,
      "Adobe Photoshop": 4,
      "Adobe After Effects": 3,
      "Sketch": 3,
      "InDesign": 3,
      "Adobe Illustrator": 4,
      "Framer": 4,
      "Replit": 4,
      "Web Development": 3,
      "HTML & CSS": 4,
      "JavaScript & React": 4,
      "Next.js": 4,
      "Notion": 5,
      "Tally": 3,
      "Google Tools": 4,
    }
  },
  "ՀԱՅ": {
    title: "Հմտություններ",
    subtitle: "Մեր փորձի լայն տեսակետ դիզայնի, փոխազդեցության և թվային գործիքների մեջ:",
    designSkills: "Դիզայն & UX/UI",
    toolsSkills: "Թվային գործիքներ",
    skills: {
      // Design skills
      "UX Design": 4,
      "UI Design": 5,
      "Interaction Design": 4,
      "User Research": 3,
      "Systems thinking": 3,
      "User journeys": 4,
      "Wireframing": 4,
      "Prototyping": 4,
      "Design System": 4,
      "Visual Hierarchy": 4,
      "Usability Testing": 3,
      "Accessibility": 3,
      "Typography": 4,
      "Motion Design": 3,
      // Tools
      "Figma": 5,
      "Adobe Photoshop": 4,
      "Adobe After Effects": 3,
      "Sketch": 3,
      "InDesign": 3,
      "Adobe Illustrator": 4,
      "Framer": 4,
      "Replit": 4,
      "Web Development": 3,
      "HTML & CSS": 4,
      "JavaScript & React": 4,
      "Next.js": 4,
      "Notion": 5,
      "Tally": 3,
      "Google Tools": 4,
    }
  }
};

const designSkillsList = [
  "UX Design",
  "UI Design",
  "Interaction Design",
  "User Research",
  "Systems thinking",
  "User journeys",
  "Wireframing",
  "Prototyping",
  "Design System",
  "Visual Hierarchy",
  "Usability Testing",
  "Accessibility",
  "Typography",
  "Motion Design"
];

const toolSkillsList = [
  "Figma",
  "Adobe Photoshop",
  "Adobe After Effects",
  "Sketch",
  "InDesign",
  "Adobe Illustrator",
  "Framer",
  "Replit",
  "Web Development",
  "HTML & CSS",
  "JavaScript & React",
  "Next.js",
  "Notion",
  "Tally",
  "Google Tools"
];

const StarRating = ({ rating }: { rating: number }) => {
  const ratingMap: Record<number, string> = {
    0: "/skills/stars-0.png",
    1: "/skills/stars-1.png",
    2: "/skills/stars-2.png",
    3: "/skills/stars-3.png",
    4: "/skills/stars-4.png",
    5: "/skills/stars-5.png"
  };

  return (
    <div className="relative w-20 h-5">
      <Image
        src={ratingMap[rating]}
        alt={`${rating} out of 5 stars`}
        fill
        className="object-contain"
      />
    </div>
  );
};

export default function SkillsPage() {
  const [language, setLanguage] = useState<Language>("FR");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as Language;
    if (saved && ["FR", "EN", "ՀԱՅ"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setLanguage(event.detail);
    };
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  const t = translations[language] || translations.FR;

  return (
    <main className="min-h-screen bg-[#F5F5F5] w-full" style={{ fontFamily: "var(--font-body)" }}>
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] mb-4">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-[#666666] leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Design Skills Section */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] mb-8">
            {t.designSkills}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {designSkillsList.map((skillName) => (
              <div key={skillName} className="flex items-center justify-between p-4 rounded-lg bg-white border border-[#E5E5E5]">
                <span className="text-sm md:text-base font-medium text-[#1d1d1f]">
                  {skillName}
                </span>
                <StarRating rating={t.skills[skillName as keyof typeof t.skills] || 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Tools Skills Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] mb-8">
            {t.toolsSkills}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolSkillsList.map((skillName) => (
              <div key={skillName} className="flex items-center justify-between p-4 rounded-lg bg-white border border-[#E5E5E5]">
                <span className="text-sm md:text-base font-medium text-[#1d1d1f]">
                  {skillName}
                </span>
                <StarRating rating={t.skills[skillName as keyof typeof t.skills] || 0} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
