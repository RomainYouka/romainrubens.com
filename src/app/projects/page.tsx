"use client";

import { useState, useEffect, useRef } from "react";
import ProjectIOS26 from "@/components/sections/project-ios26";
import { ProjectWaveSwitch } from "@/components/sections/project-wave-switch";
import ProjectFramaspace from "@/components/sections/project-framaspace";
import ProjectBeforeAfter from "@/components/sections/project-before-after";
import { FramaspaceToolbarSection } from "@/components/sections/project-framaspace-toolbar";
import ProjectNameQuest from "@/components/sections/project-namequest";
import ProjectMacStudio from "@/components/sections/project-macstudio";
import ProjectCarousel from "@/components/sections/project-carousel";
import ProjectFlashConcept from "@/components/sections/project-flashconcept";
import ProjectVahanSoghomonian from "@/components/sections/project-vahan-soghomonian";
import Image from "next/image";
import { ChevronDown, ArrowUp } from "lucide-react";

const projectsTranslations = {
  FR: {
    heading: "Ce qui guide mon travail.",
    headingImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/ce-qui-guide-1762109969479.png",
    text: "Je ne crois pas aux solutions toutes faites. Je crois aux processus justes. Mon approche est une rencontre entre empathie, structure, et intuition. Concevoir, c'est écouter. Designer, c'est comprendre avant de décider.",
    nameQuestContext: "Le projet part d'un constat simple : le nom de famille n'est jamais neutre. Il révèle une histoire, une origine et un héritage. Il peut être source de fierté mais aussi de préjugés. Certaines personnes témoignent encore aujourd'hui de discriminations liées à leur nom, que ce soit dans les démarches administratives, dans le milieu scolaire ou dans les interactions du quotidien. Face à ces constats, l'objectif est d'imaginer un support pédagogique inclusif, capable de provoquer une conversation honnête, ludique et accessible autour de l'identité."
  },
  EN: {
    heading: "What guides my work.",
    headingImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/what-1762109824205.png",
    text: "I don't believe in ready-made solutions. I believe in the right process. My approach is a meeting point between empathy, structure, and intuition. To design is to listen. To be a designer is to understand before deciding.",
    nameQuestContext: "The project stems from a simple observation: a family name is never neutral. It reveals a history, an origin, and a heritage. It can be a source of pride but also of prejudice. Today, many people still experience discrimination linked to their name, whether in administrative procedures, school environments, or everyday interactions. Faced with these realities, the goal is to imagine an inclusive educational tool, capable of fostering an honest, playful, and accessible conversation around identity."
  },
  ՀԱՅ: {
    heading: "Ինչն է առաջնորդում իմ աշխատանքը։",
    headingImage: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/armenien-texte-titre-1762183912650.png",
    text: "Ես չեմ հավատում պատրաստի լուծումներին։ Ես հավատում եմ ճիշտ գործընթացին։ Իմ մոտեցումը համակցում է կարեկցանք, կառուցվածք և ինտուիցիա։ Դիզայնը լսելն է։ Դիզայներ լինելը՝ հասկանալը որոշելուց առաջ։",
    nameQuestContext: "Նախագիծը սկսվում է պարզ դիտարկումից՝ ազգանունը երբեք չեզոք չէ։ Այն բացահայտում է պատմություն, ծագումը և ժառանգությունը։ Այն կարող է լինել հպարտության աղբյուր, բայց նաև կանխակալության։ Այսօր շատ մարդիկ շարունակում են տառապել իրենց ազգանունի հետ կապված խտրականությամբ՝ լինի դա վարչական ընթացակարգեր, դպրոցական միջավայր կամ առօրյա փոխազդեցություն։ Այս իրականությունների դեմ, նպատակն է պատկերել ներառական կրթական գործիք, որը ունակ է խթանել անկեղծ, խաղային և մատչելի զրույց ինքնության շուրջ։"
  }
};

export default function ProjectsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">(() => {
    if (typeof window !== "undefined") {
      let saved = localStorage.getItem("preferredLanguage");
      if (saved && (saved === "FR" || saved === "EN" || saved === "ՀԱՅ")) {
        return saved as "FR" | "EN" | "ՀԱՅ";
      }
      localStorage.setItem("preferredLanguage", "FR");
    }
    return "FR";
  });
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const firstProjectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      setSelectedLanguage(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMenuStateChange = (event: CustomEvent<boolean>) => {
      setIsMenuOpen(event.detail);
    };

    window.addEventListener("menuStateChange", handleMenuStateChange as EventListener);
    return () => {
      window.removeEventListener("menuStateChange", handleMenuStateChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleLightboxStateChange = (event: CustomEvent<boolean>) => {
      setIsLightboxOpen(event.detail);
    };

    window.addEventListener("flashconceptLightboxStateChange", handleLightboxStateChange as EventListener);
    return () => {
      window.removeEventListener("flashconceptLightboxStateChange", handleLightboxStateChange as EventListener);
    };
  }, []);

  const currentTranslations = projectsTranslations[selectedLanguage];

  const scrollToFirstProject = () => {
    firstProjectRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <main
      className="min-h-screen bg-[#F5F5F7]"
      style={{
        fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
      }}>

      <section className="h-screen flex flex-col items-center justify-between px-6 pt-24 md:pt-32 pb-12 bg-[#F5F5F7] relative">
        <div className="flex-1 w-full max-w-[1200px] mx-auto flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            {currentTranslations.headingImage ?
            <div
              className="relative w-full max-w-[700px]">

                <Image
                src={currentTranslations.headingImage}
                alt={currentTranslations.heading}
                width={700}
                height={100}
                className="w-full"
                style={{ height: 'auto', width: 'auto' }}
                priority />

              </div> :

            <h1
              className="font-semibold text-[#515151] leading-tight max-w-[90vw] md:max-w-none"
              style={{
                fontSize: "clamp(32px, 7vw, 56px)",
                textWrap: "balance"
              }}>

                {currentTranslations.heading}
              </h1>
            }

            <div className="max-w-[900px] mt-2">
              <p
                className="text-[clamp(16px,3.5vw,24px)] font-normal text-[#515151] leading-[1.4] md:leading-[1.6] text-center px-4 md:px-8"
                style={{
                  textWrap: "balance"
                }}>

                {currentTranslations.text}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToFirstProject}
          className={`w-10 h-10 rounded-full bg-[#424245] flex items-center justify-center transition-all duration-300 hover:bg-[#515151] hover:scale-110 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"}`
          }
          style={{
            transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
            transitionDelay: "180ms"
          }}
          aria-label="Scroll to projects">

          <ChevronDown className="w-5 h-5 text-white" />
        </button>
      </section>

      <div id="ios26" ref={firstProjectRef}>
        <ProjectIOS26 language={selectedLanguage} />
      </div>

      <div id="waveswitch">
        <ProjectWaveSwitch language={selectedLanguage} />
      </div>

      <div id="framaspace">
        <ProjectFramaspace language={selectedLanguage} />
      </div>

      <div>
        <ProjectBeforeAfter />
      </div>

      <div id="framaspace-toolbar">
        <FramaspaceToolbarSection />
      </div>

      <div id="namequest">
        <ProjectNameQuest language={selectedLanguage} />
      </div>

      <div className="md:hidden bg-[#F5F5F7] px-5 py-12">
        <div className="max-w-[1200px] mx-auto">
          <div
            style={{
              fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              fontWeight: 400,
              color: "#1D1D1F",
              lineHeight: 1.6,
              letterSpacing: "-0.022em",
              textAlign: "left"
            }}
          >
            {currentTranslations.nameQuestContext}
          </div>
        </div>
      </div>

      <div>
        <ProjectCarousel />
      </div>

      <div id="flashconcept">
        <ProjectFlashConcept language={selectedLanguage} />
      </div>

      <div className="border-t border-[#D3D3D4]"></div>

      <div id="vahan-soghomonian">
        <ProjectVahanSoghomonian language={selectedLanguage} />
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-14 md:left-1/2 md:-translate-x-1/2 md:right-auto z-50 transition-all duration-300 hover:scale-110 md:hover:scale-110 ${
          showScrollTop && !isMenuOpen && !isLightboxOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)"
        }}
        aria-label="Scroll to top">
        <div className="md:hidden w-10 h-10 rounded-full bg-[#424245] flex items-center justify-center hover:bg-[#515151]">
          <ArrowUp className="w-5 h-5 text-white" />
        </div>
        <Image
          src={
            selectedLanguage === "FR" 
              ? "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image-1762252318736.png"
              : selectedLanguage === "ՀԱՅ"
              ? "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image-1762252280986.png"
              : "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image-1762250774932.png"
          }
          alt="Scroll to top"
          width={120}
          height={40}
          className={`hidden md:block w-auto cursor-pointer ${
            selectedLanguage === "FR" ? "h-[32px]" : "h-[40px]"
          }`}
        />
      </button>
    </main>);

}