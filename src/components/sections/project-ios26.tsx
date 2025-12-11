"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { Play, Pause, SkipForward, X, ChevronDown } from "lucide-react";

const translations = {
  EN: {
    year: "Designed in 2025",
    title: "iOS 26 Update Vision",
    description: "iOS 26 Update is a fictional interface built into the iOS 26 update, designed to turn waiting time into a quiet and introspective moment. It appears only during the update process.\nThe experience is optional: users can choose to try it or skip straight to the classic update screen, discovering a small and unexpected space each time the system updates.\n\nWith Apple Intelligence, users can generate a personal message by answering a short custom questionnaire. The text is unique and editable, and they can also read again the message they wrote during the previous update.\n\nAt the same time, the interface shows the update progress at the bottom of the screen. It stays simple, battery friendly and unobtrusive, giving a human touch to a moment that is usually seen as forced or purely functional.",
    pdfTitle: "Download user flow",
    pdfMessage: "Would you like to download the user flow to view it larger?",
    pdfCancel: "Cancel",
    pdfDownload: "Download"
  },
  FR: {
    year: "Conception en 2025",
    title: "iOS 26 Vision de la MàJ",
    description: "iOS 26 Update est une interface fictive intégrée à la mise à jour iOS 26, conçue pour transformer l'attente en un moment introspectif et poétique, accessible uniquement lors des mises à jour. L'expérience est facultative : l'utilisateur peut choisir d'y participer ou de passer directement à l'écran classique, découvrant ainsi un espace inattendu à chaque mise à jour.\n\nGrâce à Apple Intelligence, l'utilisateur peut générer un texte en répondant à un questionnaire personnalisé. Le texte généré est unique et modifiable. L'utilisateur peut aussi relire son message laissé durant la précédente mise à jour. En parallèle, l'interface affiche la progression de la mise à jour en bas, sobre et optimisée pour la batterie, humanisant un instant souvent perçu comme contraint.",
    pdfTitle: "Télécharger le chemin d'utilisateur",
    pdfMessage: "Voulez-vous télécharger le flux utilisateur pour le consulter en plus grand ?",
    pdfCancel: "Annuler",
    pdfDownload: "Télécharger"
  },
  ՀԱՅ: {
    year: "Նախագծված 2025-ին",
    title: "iOS 26 Թարմացման Տեսլական",
    description: "iOS 26 Update-ը պատկերային միջերես է, որը ներառված է iOS 26-ի թարմացման մեջ և ստեղծված է սպասման պահը վերածելու ներհայեցողական ու պոետիկ փորձառության։ Այն հասանելի է միայն թարմացման ընթացքում։ Փորձառությունը պարտադիր չէ․ օգտատերը կարող է ընտրել մասնակցել դրան կամ անմիջապես անցնել դասական էկրանին՝ յուրաքանչյուր թարմացման հետ բացահայտելով անսպասելի մի տարածք։\n\nApple Intelligence-ի շնորհիվ օգտատերը կարող է ստեղծել տեքստ՝ պատասխանելով իրեն հատուկ կազմված հարցաշարին։ Ստացված տեքստը եզակի է և փոփոխելի։ Օգտատերը կարող է նաև կրկին կարդալ այն հաղորդագրությունը, որը թողել էր նախորդ թարմացման ժամանակ։ Միևնույն ընթացքում միջերեսի ներքևում ցուցադրվում է թարմացման ընթացքը՝ պարզ, էներգախնայող և զուսպ ձևով, ինչը մարդկայնացնում է մի պահ, որը սովորաբար ընկալվում է որպես պարտադրող կամ սահմանափակող։",
    pdfTitle: "Ներբեռնել օգտատիրոջ հոսքը",
    pdfMessage: "Ցանկանու՞մ եք ներբեռնել օգտատիրոջ հոսքը այն ավելի մեծ տեսնելու համար:",
    pdfCancel: "Չեղարկել",
    pdfDownload: "Ներբեռնել"
  }
};

const accordionSectionsFR = [
  {
    id: "contexte",
    title: "Contexte général",
    content: "L'attente d'une mise à jour iOS représente un moment suspendu dans l'expérience utilisateur : un temps imposé, silencieux, durant lequel l'usager se retrouve immobilisé, dans un entre-deux fonctionnel avant de pouvoir reprendre son activité. Ce moment, souvent perçu comme vide ou contraignant, ouvre pourtant un espace singulier dans l'usage quotidien du téléphone."
  },
  {
    id: "frustrations",
    title: "Frustrations identifiées",
    content: "Les utilisateurs expriment une forme de frustration liée à la perte de contrôle, à l'inutilité ressentie de ce temps d'attente et au caractère soudain de l'interruption de leurs actions en cours. L'attente de la barre de progression devient un moment subi, sans autre fonction que la patience.",
    hasImage: true
  },
  {
    id: "lieux",
    title: "Lieux concernés",
    content: "Les mises à jour peuvent survenir au domicile, au bureau ou dans les transports. Dans tous les cas, elles interviennent dans un contexte où l'utilisateur est engagé dans une action, parfois urgente, et où la mise à jour vient rompre la continuité du geste."
  },
  {
    id: "approche",
    title: "Approche interactionnelle possible",
    content: "Ce moment suspendu peut devenir un espace d'introspection, un temps d'expression personnelle, un interstice où l'utilisateur laisse une trace à son futur soi. En investissant cette temporalité imposée, l'expérience propose un rapport différent à l'attente, moins subi et plus porteur de sens."
  },
  {
    id: "pourquoi",
    title: "Pourquoi ai-je choisi ce concept ?",
    content: "Parce que la mise à jour est un rituel technique incontournable, répétitif et universel. L'idée est de transformer un geste banal en un moment narratif, intime et subtilement émotionnel. Là où l'on attend habituellement sans engagement, l'expérience propose une micro-parenthèse personnelle."
  },
  {
    id: "points-forts",
    title: "Points forts du concept",
    content: "Interface minimale, discrète, alignée avec les codes d'iOS.\nExpérience entièrement facultative.\nIntégration naturelle dans le processus de mise à jour.\nContinuité entre deux versions via le message sauvegardé.\nUtilisation d'Apple Intelligence pour générer un texte unique et personnel."
  },
  {
    id: "besoins",
    title: "En quoi répond-il aux besoins identifiés ?",
    content: "L'expérience rend utile un moment qui ne l'était pas, redonne du sens à une pause forcée, crée une continuité émotionnelle d'une mise à jour à l'autre, respecte le silence et la temporalité de ce rituel technique et propose un espace d'expression intime sans effort supplémentaire pour l'utilisateur."
  },
  {
    id: "insights",
    title: "Insights du questionnaire",
    content: "Les réponses au questionnaire montrent que l'attente est souvent perçue comme un temps vide, peu engageant ou inutile.\nUne majorité d'utilisateurs exprime l'envie de pouvoir faire quelque chose durant ce moment.\nCertains ressentent une frustration liée au caractère imposé de l'interruption.\nL'idée de laisser un message personnel, intime ou introspectif durant la mise à jour génère un intérêt important."
  },
  {
    id: "problematique",
    title: "Problématique de l'attente iOS",
    content: "L'attente de la mise à jour iOS est un moment perçu comme inutile, un temps contraint qui bloque l'usage du téléphone. Un mockup a été réalisé avec les réponses du questionnaire pour matérialiser cette frustration et l'opportunité d'un moment d'expression personnelle."
  },
  {
    id: "outcome",
    title: "Outcome",
    content: "Le concept propose une expérience introspective, personnelle et facultative au cœur d'un rituel technique imposé. Le message généré peut être retrouvé lors de la prochaine mise à jour, créant une continuité émotionnelle discrète dans l'écosystème iOS. La progression du système reste visible, apportant une humanisation subtile de l'attente."
  },
  {
    id: "appris",
    title: "Ce que j'ai appris",
    content: "Explorer la temporalité comme matière d'interaction.\nTravailler sur les micro-rituels du quotidien.\nIntégrer Apple Intelligence dans une logique introspective.\nConcevoir un parcours complexe multi-chemins.\nArticuler silence, mémoire, attente et interaction."
  }
];

const accordionSectionsEN = accordionSectionsFR.map(section => ({
  ...section,
  title: section.id === "contexte" ? "General Context" : section.id === "frustrations" ? "Identified Frustrations" : section.id === "lieux" ? "Concerned Locations" : section.id === "approche" ? "Possible Interactional Approach" : section.id === "pourquoi" ? "Why did I choose this concept?" : section.id === "points-forts" ? "Concept Strengths" : section.id === "besoins" ? "How does it meet identified needs?" : section.id === "insights" ? "Questionnaire Insights" : section.id === "problematique" ? "iOS Waiting Problem" : section.id === "outcome" ? "Outcome" : "What I Learned"
}));

const accordionSectionsHY = [
  {
    id: "contexte",
    title: "Ընդհանուր համատեքստ",
    content: "iOS թարմացման սպասումը ներկայացնում է օգտատիրոջ փորձառության մեջ կասեցված պահ՝ պարտադիր, լուռ ժամանակ, որի ընթացքում օգտատերը գտնվում է անշարժ վիճակում, ֆունկցիոնալ միջջանկ վիճակում, իր գործունեությունը վերսկսելուց առաջ։ Այս պահը, որը հաճախ ընկալվում է դատարկ կամ սահմանափակ, բացակայում է հեռախոսի ամենօրյա օգտագործման մեջ յուրահատուկ տարածք։"
  },
  {
    id: "frustrations",
    title: "Հայտնաբերված հիասթափություններ",
    content: "Օգտատերերը արտահայտում են հիասթափություն, որը կապված է վերահսկողության կորստի, այս սպասման ժամանակի ընկալվածի անօգտակարության և իրենց ընթացիկ գործողությունների ընդհատման հանկարծի բնույթի հետ։ Առաջընթացի սանդղակի համար սպասումը դառնում է ենթարկվածի պահ, առանց հետ կամ համբերության միայն հետ.",
    hasImage: true
  },
  {
    id: "lieux",
    title: "Վերաբերվող վայրեր",
    content: "Թարմացումները կարող են տեղի ունենալ տանը, գրասենյակում կամ տրանսպորտում։ Բոլոր դեպքերում նրանք ներգործում են համատեքստում, որտեղ օգտատերը ընդգրկված է գործողության մեջ, երբեմն հրատապ, և որտեղ թարմացումը խախտում է շարժման շարունակականությունը։"
  },
  {
    id: "approche",
    title: "Հնարավոր ինտերակցիոնային մոտեցում",
    content: "Այս կասեցված պահը կարող է դառնալ ներհայեցողության տարածք, անձնական արտահայտման ժամանակ, միջանկ տարածք, որտեղ օգտատերը թողնում է հետք իր ապագա ինքն ինձ համար։ Ներդրումային այս պարտադիր ժամանակիկությունը, փորձառությունը առաջարկում է սպասման հանդեպ այլ հարաբերություն, ավելի քիչ ենթակա և ավելի իմաստալից։"
  },
  {
    id: "pourquoi",
    title: "Ինչու ընտրեցի այս հայեցակարգը:",
    content: "Որովհետև թարմացումը անխուսափելի, կրկնվող և համընդհանուր տեխնիկական ծեսեր։ Գաղափարն է մի բանիմ շարժումը փոխակերպել պատմական, հետաքրքիր և նուրբ ինտենսիվ պահի։ Որտեղ սովորաբար մեկը սպասում է առանց նպատակի, փորձառությունը առաջարկում է անձնական միկրո-փակցի միջանկ।"
  },
  {
    id: "points-forts",
    title: "Հայեցակարգի ուժեղ կողմերը",
    content: "Նվազագույն, մեջտեղ ինտերֆեյս, iOS կոդերի հետ հավասար։\nՀամբերում ամբողջական փորձառություն։\nՖունկցիոնալ ինտեգրում թարմացման գործընթացում։\nԲախում երկու տարբերակների միջև տնօրեն հաղորդագրության միջոցով։\nApple Intelligence-ի օգտագործումը եզակի և անձնական տեքստ ստեղծելու համար։"
  },
  {
    id: "besoins",
    title: "Ինչպե՞ս է այն հանդիսանում հայտնաբերված անհրաժեշտությունների:",
    content: "Փորձառությունը բերում է օգտակար այն պահը, որ այն չէր, վերադարձնում մակածածի իմաստ, ստեղծում ինտենսիվ շարունակականություն մի թարմացումից մյուսը, հարգում ծուղ և այս տեխնիկական ծեսերի ժամանակիկությունը, և առաջարկ տրում հետաքրքիր արտահայտման տարածք կամ լրացուցիչ ջանքերի առանց որ օգտատերի համար։"
  },
  {
    id: "insights",
    title: "Հարցաշարի հայացք",
    content: "Հարցաշարի պատասխանները ցույց են տալիս, որ սպասումը հաճախ դատվում է դատարկ, անհետաքրքիր կամ անօգտակար ժամանակ։\nԱրդարացման մեծամասնությունը ցանկանում եք կարողանալ ինչ-որ բան անել այս պահի ընթացքում։\nԱյդ նմանատիպ են ուսանում հիասյունք կապված հարմարման իրականի բնույթի հետ։\nԱյդ ձևում թողնել անձնական, հետաքրքիր կամ ներհայեցողական հաղորդագրություն թարմացման ընթացքում ստեղծել մեծ հետաքրքրություն։"
  },
  {
    id: "problematique",
    title: "iOS սպասման հարցադրում",
    content: "iOS թարմացման համար սպասումը համարվում է անօգտակար ժամանակ, սահմանափակ ժամանակ, որը կասեցնում է հեռախոսի օգտագործումը։ Մոդել ստեղծվել է հարցաշարի պատասխաններից այս հիասթափությունն ինքնաբացահայտել և անձնական արտահայտման պահի հավանականությունը։"
  },
  {
    id: "outcome",
    title: "Ծրագիր",
    content: "Հայեցակարգը առաջարկ է տրում ներհայեցողական, անձնական, և մեջտեղ փորձառություն պարտադիր տեխնիկական ծեսերի սրտում։ Ստեղծված հաղորդագրությունը կարող է հայտնաբերվել հաջորդ թարմացման ընթացքում, ստեղծել մեջտեղ ինտենսիվ շարունակականություն iOS էկոսիստեմում։ Համակարգի առաջընթացը մնում է տեսանելի, բերել նուրբ մարդկայնացման սպասման համար։"
  },
  {
    id: "appris",
    title: "Ինչ ես սովորել",
    content: "Հետազոտել ժամանակիկությունը որպես ինտերակցիոնային նյութ։\nԱրդյուծել տանը միկրո-ծեսերից։\nApple Intelligence-ի ընդգրկում ներհայեցողական տրամաբանության մեջ։\nՀատկացնել բարդ ամբիկ մի շատ-ճանապարհ ճանապարհորդություն։\nՀամակցել լուռ, հետ, սպասում, և ինտերակցիա։"
  }
];


interface ProjectIOS26Props {
  language?: "EN" | "FR" | "ՀԱՅ";
}

export default function ProjectIOS26({ language = "EN" }: ProjectIOS26Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPNGZoom, setShowPNGZoom] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const content = translations[language];
  const accordionSections = useMemo(() => 
    language === "FR" ? accordionSectionsFR : language === "EN" ? accordionSectionsEN : accordionSectionsHY,
    [language]
  );

  const toggleSection = useCallback((id: string) => {
    setOpenSections(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  }, []);

  useEffect(() => {
    if (showPNGZoom) {
      window.dispatchEvent(new CustomEvent("pdfLightboxStateChange", { detail: { isOpen: true } }));
      document.body.style.overflow = 'hidden';
    } else {
      window.dispatchEvent(new CustomEvent("pdfLightboxStateChange", { detail: { isOpen: false } }));
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPNGZoom]);

  useEffect(() => {
    const videoElement = videoRef.current;
    const sectionElement = sectionRef.current;

    if (!videoElement || !sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            videoElement.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    observer.observe(sectionElement);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElement.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    if (isPlaying) {
      videoElement.pause();
      setIsPlaying(false);
    } else {
      videoElement.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const skipForward = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
  };

  return (
    <section
      id="ios26"
      ref={sectionRef}
      className="bg-black !w-full !h-full"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        scrollMarginTop: "80px"
      }}>

      <div className="container max-w-[1200px] mx-auto px-5 md:px-10" style={{
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)"
      }}>
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-16 mb-12 md:mb-0">
          <div
            className="w-full md:w-auto md:flex-shrink-0 mx-auto md:mx-0"
            style={{
              maxWidth: "min(85vw, 400px)"
            }}>

            <div
              style={{
                width: "100%",
                borderRadius: "clamp(18px, 2.5vw, 32px)",
                overflow: "hidden",
                backgroundColor: "#000"
              }}>

              <video
                ref={videoRef}
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/RUBENS-Romain-iOS26-Update-Vision-1762103405784.mp4"
                loop
                muted
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block"
                }}
                aria-label="iOS 26 Update Vision interface demonstration" />

            </div>

            <div className="flex items-center justify-center gap-3" style={{ marginTop: "5px", position: "relative", zIndex: 10 }}>
              <button
                onClick={togglePlayPause}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)"
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Play"}
              </button>
              
              <button
                onClick={skipForward}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)"
                }}
                aria-label="Skip forward 5 seconds"
              >
                <SkipForward className="w-4 h-4" />
                +5s
              </button>
            </div>
          </div>

          <div className="flex-1" style={{ textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 600,
                color: "#86868b",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "clamp(8px, 1vw, 12px)"
              }}>

              {content.year}
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(20px, 2.5vw, 32px)"
              }}>

              {content.title}
            </h2>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#f5f5f7",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                marginBottom: "clamp(20px, 2.5vw, 32px)",
                whiteSpace: "pre-line"
              }}>

              {content.description}
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="mt-12 md:mt-16 space-y-4" style={{ transitionDuration: "300ms" }}>
          {accordionSections.map((section) => {
            const isOpen = openSections.includes(section.id);
            return (
              <div 
                key={section.id}
                className="border border-[#333] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 hover:bg-[#1a1a1a]"
                  style={{
                    backgroundColor: isOpen ? "#1a1a1a" : "transparent"
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(18px, 2vw, 22px)",
                      fontWeight: 600,
                      color: "#ffffff",
                      letterSpacing: "-0.01em",
                      textAlign: "left"
                    }}
                  >
                    {section.title}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#86868b] transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                
                <div
                  className="overflow-hidden transition-all"
                  style={{
                    transitionDuration: "300ms",
                    transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                    maxHeight: isOpen ? "2000px" : "0",
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="px-5 py-6">
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(14px, 1.4vw, 16px)",
                        fontWeight: 400,
                        color: "#a1a1a6",
                        lineHeight: 1.6,
                        letterSpacing: "-0.01em",
                        whiteSpace: "pre-line",
                        marginBottom: section.id === "insights" && isOpen ? "1.5rem" : "0"
                      }}
                    >
                      {section.content}
                    </p>
                    {section.id === "insights" && isOpen && (
                      <div 
                        onClick={() => setShowPNGZoom(true)}
                        className="mt-6 rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
                      >
                        <Image 
                          src="/iOS_26_frustrations.png" 
                          alt="Questionnaire Insights"
                          width={1200}
                          height={700}
                          style={{ width: "100%", height: "auto" }}
                          loading="lazy"
                          quality={85}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* User Journey Image */}
        <div className="flex justify-center mt-12 md:mt-16" style={{
          paddingBottom: "clamp(48px, 6vw, 80px)"
        }}>
          <div
            onClick={() => {
              const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
              if (isMobile) {
                const link = document.createElement("a");
                link.href = "/RUBENS_Romain_iOS26_Update_Vision_User_flow.pdf";
                link.download = "RUBENS_Romain_iOS26_Update_Vision_User_flow.pdf";
                link.click();
              } else {
                setShowPDFModal(true);
              }
            }}
            className="w-full max-w-5xl rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-200 hover:scale-[1.01] bg-white"
            style={{
              maxHeight: "400px",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <Image 
              src="/iOS_26_Chemin_Utilisateur.jpg" 
              alt="iOS 26 User Journey"
              width={1600}
              height={900}
              style={{ width: "100%", height: "auto" }}
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>
        </div>
      </div>


      {/* PNG Fullscreen Modal */}
      {showPNGZoom && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center overflow-auto"
          onClick={() => setShowPNGZoom(false)}
        >
          <div 
            className="relative w-full flex items-center justify-center px-2 md:px-4 py-4"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Image 
              src="/iOS_26_frustrations.png" 
              alt="Frustrations Survey - Full Screen"
              width={1200}
              height={700}
              style={{ maxWidth: "95%", maxHeight: "90vh", width: "auto", height: "auto" }}
              priority
              quality={95}
              sizes="(max-width: 768px) 100vw, 95vw"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPNGZoom(false);
              }}
              className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F7] text-[#1d1d1f] transition-all duration-100 ease-out hover:scale-[1.05] active:scale-[0.95] z-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* PDF Download Modal */}
      {showPDFModal && (
        <div
          className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowPDFModal(false)}
        >
          <div 
            className="relative bg-white rounded-2xl p-8 md:p-10 max-w-md w-full shadow-2xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(18px, 2.5vw, 22px)",
                fontWeight: 600,
                color: "#1d1d1f",
                marginBottom: "12px"
              }}
            >
              {content.pdfTitle}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                fontWeight: 400,
                color: "#86868b",
                lineHeight: 1.6,
                marginBottom: "24px"
              }}
            >
              {content.pdfMessage}
            </p>

            <div className="flex flex-col md:flex-row gap-3 md:gap-3">
              <button
                onClick={() => setShowPDFModal(false)}
                className="flex-1 px-4 py-3 rounded-lg text-center font-medium text-[#1d1d1f] border border-[#d3d3d4] transition-all duration-200 hover:bg-[#f5f5f7]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px"
                }}
              >
                {content.pdfCancel}
              </button>
              
              <a
                href="/RUBENS_Romain_iOS26_Update_Vision_User_flow.pdf"
                download="RUBENS_Romain_iOS26_Update_Vision_User_flow.pdf"
                onClick={() => setShowPDFModal(false)}
                className="flex-1 px-4 py-3 rounded-lg text-center font-medium text-white bg-[#424245] transition-all duration-200 hover:bg-[#515151]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px"
                }}
              >
                {content.pdfDownload}
              </a>
            </div>
          </div>
        </div>
      )}

    </section>);

}
