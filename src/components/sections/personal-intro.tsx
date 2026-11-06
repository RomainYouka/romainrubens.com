"use client";

import { detectLanguage } from "@/lib/language";

import { useState, useEffect, useRef } from "react";
import { SplitAction } from "@/components/SplitAction";
import { useRouter } from "next/navigation";
import { usePageTransition } from "@/contexts/PageTransitionContext";

const translations = {
  FR: {
    title: "Designer UX/UI · Produits Numériques & Écosystèmes Connectés",
    textMain: "Designer UX/UI et étudiant en design d’interaction, je conçois des produits numériques et des écosystèmes connectés.",
    textGray1: " J’associe recherche utilisateur, esprit critique et pensée systémique pour comprendre les besoins et simplifier les systèmes complexes.",
    textMain2: " Des parcours aux design systems, je cherche à rendre les expériences utiles, accessibles et cohérentes.",
    textGray2: " En collaboration avec les développeurs, je veille à préserver le sens du design dans le produit final.",
    ctaProjects: "Je découvre",
    ctaSkills: "Mes compétences",
  },
  EN: {
    title: "UX/UI Designer · Digital Products & Connected Ecosystems",
    textMain: "I’m a UX/UI designer and interaction design student, creating digital products and connected ecosystems.",
    textGray1: " I combine user research, critical thinking, and systems thinking to understand people’s needs and simplify complex systems.",
    textMain2: " From user journeys to design systems, I aim to make experiences useful, accessible, and consistent.",
    textGray2: " Working alongside developers, I help preserve the intent of the design in the final product.",
    ctaProjects: "Discover",
    ctaSkills: "My skills",
  },
  ՀԱՅ: {
    title: "UX/UI դիզայներ · Թվային պրոդուկտներ և կապակցված էկոհամակարգեր",
    textMain: "Ես UX/UI դիզայներ և փոխազդեցության դիզայնի ուսանող եմ․ նախագծում եմ թվային պրոդուկտներ և կապակցված էկոհամակարգեր։",
    textGray1: " Օգտատերերի հետազոտությունը, քննադատական և համակարգային մտածողությունն ինձ օգնում են հասկանալ մարդկանց կարիքները և պարզեցնել բարդ համակարգերը։",
    textMain2: " Օգտատերերի ուղիներից մինչև դիզայն համակարգեր՝ ձգտում եմ ստեղծել օգտակար, հասանելի և համահունչ փորձառություններ։",
    textGray2: " Ծրագրավորողների հետ համագործակցելով՝ պահպանում եմ դիզայնի մտահղացումը վերջնական պրոդուկտում։",
    ctaProjects: "Բացահայտել",
    ctaSkills: "Իմ հմտությունները",
  },
};

export default function PersonalIntro({ id = "personal-intro" }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const { triggerTransition } = usePageTransition();
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("EN");
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const transitionDuration = prefersReducedMotion ? "1ms" : "200ms";

  useEffect(() => {
    let saved = detectLanguage() as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !translations[saved]) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      clearTimeout(timer);
      if (prefersReducedMotion) {
        setSelectedLanguage(event.detail);
      } else {
        setIsFading(true);
        timer = setTimeout(() => {
          setSelectedLanguage(event.detail);
          setIsFading(false);
        }, 200);
      }
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true); router.prefetch("/projects");
        void import("@/components/PageTransitionOverlay");
        observer.disconnect();
      }
    }, { threshold: .15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [router]);

  const content = translations[selectedLanguage];
  const titleLines = selectedLanguage==="FR"
    ? ["Designer UX/UI · Produits Numériques", "& Écosystèmes Connectés"]
    : selectedLanguage==="EN"
      ? ["UX/UI Designer · Digital Products", "& Connected Ecosystems"]
      : ["UX/UI դիզայներ · Թվային պրոդուկտներ", "և կապակցված էկոհամակարգեր"];

  return (
    <>
      {/* Main section */}
      <section
        ref={sectionRef}
        id={id}
        className="w-full min-h-[100dvh] flex items-center"
        data-section="personal-intro"
        style={{
          backgroundColor: "var(--theme-bg-alt)",
          paddingTop: "clamp(64px, 8vw, 100px)",
          paddingBottom: "clamp(64px, 8vw, 100px)",
        }}
      >
        <div className="w-full">
          <div
            className="container max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div
              style={{
                textAlign: "center",
                opacity: isFading ? 0 : 1,
                transition: `opacity ${transitionDuration} ease-in-out`,
              }}
            >
              {/* Title */}
              <h2
                className="personal-intro-title"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 4.6vw, 52px)",
                  fontWeight: 600,
                  color: "var(--theme-fg)",
                  lineHeight: 1.15,
                  letterSpacing: 0,
                  marginBottom: "clamp(24px, 3vw, 40px)",
                }}
              >
                <span className="intro-role">{titleLines[0]}</span>
                <span className="intro-specialty">{titleLines[1]}</span>
              </h2>

              {/* Text with colored sections */}
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px, 1.8vw, 18px)",
                  fontWeight: 500,
                  color: "var(--theme-fg)",
                  lineHeight: 1.6,
                  letterSpacing: "-0.018em",
                  marginBottom: "clamp(32px, 6vw, 64px)",
                  display: "inline-block",
                }}
              >
                <span style={{ color: "var(--theme-fg)" }}>{content.textMain}</span>
                <span style={{ color: "var(--theme-subtle)" }}>{content.textGray1}</span>
                <span style={{ color: "var(--theme-fg)" }}>{content.textMain2}</span>
                <span style={{ color: "var(--theme-subtle)" }}>{content.textGray2}</span>
              </div>

              {/* CTA Button - Wider and responsive */}
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                <SplitAction primary onClick={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  triggerTransition("/projects", "up", "projects-cta", { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                }}>{content.ctaProjects}</SplitAction>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .personal-intro-title { text-wrap: balance; }
        .personal-intro-title .intro-role,
        .personal-intro-title .intro-specialty { display:block; white-space:nowrap; }
        .personal-intro-title { font-size:clamp(14px, 4.2vw, 44px) !important; }
      `}</style>
    </>
  );
}
