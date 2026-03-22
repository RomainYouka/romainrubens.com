"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, Play, Pause, SkipForward, X, ZoomIn } from "lucide-react";
import Image from "next/image";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    projectTitle: "iOS 26 Vision de la MàJ",
    role: "2025",
    tagline: "Transformer l'attente en un moment introspectif et poétique.",
    scroll: "Découvrir le projet",
    backButton: "Retour aux projets",
    descriptionTitle: "À propos du projet",
    description: "iOS 26 Update est une interface fictive intégrée à la mise à jour iOS 26, conçue pour transformer l'attente en un moment introspectif et poétique, accessible uniquement lors des mises à jour. L'expérience est facultative : l'utilisateur peut choisir d'y participer ou de passer directement à l'écran classique, découvrant ainsi un espace inattendu à chaque mise à jour.\n\nGrâce à Apple Intelligence, l'utilisateur peut générer un texte en répondant à un questionnaire personnalisé. Le texte généré est unique et modifiable. L'utilisateur peut aussi relire son message laissé durant la précédente mise à jour. En parallèle, l'interface affiche la progression de la mise à jour en bas, sobre et optimisée pour la batterie, humanisant un instant souvent perçu comme contraint.",
    zoomHint: "Survolez pour zoomer",
    clickHint: "Cliquez pour zoomer",
    pdfTitle: "Meilleure qualité (PDF)",
    pdfMessage: "Voulez-vous télécharger le chemin utilisateur pour le consulter en meilleure qualité ?",
    pdfCancel: "Annuler",
    pdfDownload: "Télécharger"
  },
  EN: {
    projectTitle: "iOS 26 Update Vision",
    role: "2025",
    tagline: "Turn waiting time into a quiet and introspective moment.",
    scroll: "Discover the project",
    backButton: "Back to projects",
    descriptionTitle: "About the project",
    description: "iOS 26 Update is a fictional interface built into the iOS 26 update, designed to turn waiting time into a quiet and introspective moment. It appears only during the update process.\nThe experience is optional: users can choose to try it or skip straight to the classic update screen, discovering a small and unexpected space each time the system updates.\n\nWith Apple Intelligence, users can generate a personal message by answering a short custom questionnaire. The text is unique and editable, and they can also read again the message they wrote during the previous update.\n\nAt the same time, the interface shows the update progress at the bottom of the screen. It stays simple, battery friendly and unobtrusive, giving a human touch to a moment that is usually seen as forced or purely functional.",
    zoomHint: "Hover to zoom",
    clickHint: "Click to zoom",
    pdfTitle: "Best quality (PDF)",
    pdfMessage: "Would you like to download the user flow to view it in high quality?",
    pdfCancel: "Cancel",
    pdfDownload: "Download"
  },
  "ՀԱՅ": {
    projectTitle: "iOS 26 Թարմացման Տեսլական",
    role: "2025",
    tagline: "Սպասման ժամանակը վերածել լուռ և ներհայեցողական պահի:",
    scroll: "Բացահայտեք նախագիծը",
    backButton: "Վերադառնալ նախագծերին",
    descriptionTitle: "Նախագծի մասին",
    description: "iOS 26 Update-ը պատկերային միջերես է, որը ներառված է iOS 26-ի թարմացման մեջ և ստեղծված է սպասման պահը վերածելու ներհայեցողական ու պոետիկ փորձառության։ Այն հասանելի է միայն թարմացման ընթացքում։ Փորձառությունը պարտադիր չէ․ օգտատերը կարող է ընտրել մասնակցել դրան կամ անմիջապես անցնել դասական էկրանին՝ յուրաքանչյուր թարմացման հետ բացահայտելով անսպասելի մի տարածք։\n\nApple Intelligence-ի շնորհիվ օգտատերը կարող է ստեղծել տեքստ՝ պատասխանելով իրեն հատուկ կազմված հարցաշարին։ Ստացված տեքստը եզակի է և փոփոխելի։ Օգտատերը կարող է նաև կրկին կարդալ այն հաղորդագրությունը, որը թողել էր նախորդ թարմացման ժամանակ։ Միևնույն ընթացքում միջերեսի ներքևում ցուցադրվում է թարմացման ընթացքը՝ պարզ, էներգախնայող և զուսպ ձևով, ինչը մարդկայնացնում է մի պահ, որը սովորաբար ընկալվում է որպես պարտադրող կամ սահմանափակող։",
    zoomHint: "Անցեք մկնիկը՝ խոշորացնելու համար",
    clickHint: "Սեղմեք խոշորացնելու համար",
    pdfTitle: "Բարձր որակ (PDF)",
    pdfMessage: "Ցանկանու՞մ եք ներբեռնել օգտատիրոջ հոսքը այն ավելի լավ որակով տեսնելու համար:",
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

const accordionSectionsEN = [
  {
    id: "contexte",
    title: "General Context",
    content: "Waiting for an iOS update represents a suspended moment in the user experience: an imposed, silent time during which the user finds themselves immobilized, in a functional between-state before they can resume their activity. This moment, often perceived as empty or constraining, nevertheless opens a singular space in the daily use of the phone."
  },
  {
    id: "frustrations",
    title: "Identified Frustrations",
    content: "Users express a form of frustration related to loss of control, the perceived uselessness of this waiting time, and the sudden nature of the interruption to their ongoing actions. Waiting for the progress bar becomes an endured moment, with no function other than patience.",
    hasImage: true
  },
  {
    id: "lieux",
    title: "Concerned Locations",
    content: "Updates can occur at home, at work, or in transit. In all cases, they intervene in a context where the user is engaged in an action, sometimes urgent, and where the update disrupts the continuity of their gesture."
  },
  {
    id: "approche",
    title: "Possible Interactional Approach",
    content: "This suspended moment can become a space for introspection, a time for personal expression, an interstice where the user leaves a trace for their future self. By investing this imposed temporality, the experience offers a different relationship to waiting, less endured and more meaningful."
  },
  {
    id: "pourquoi",
    title: "Why did I choose this concept?",
    content: "Because the update is an inescapable technical ritual, repetitive and universal. The idea is to transform a mundane gesture into a narrative, intimate, and subtly emotional moment. Where one usually waits without engagement, the experience proposes a personal micro-pause."
  },
  {
    id: "points-forts",
    title: "Concept Strengths",
    content: "Minimal, discreet interface, aligned with iOS codes.\nEntirely optional experience.\nNatural integration into the update process.\nContinuity between two versions via the saved message.\nUse of Apple Intelligence to generate unique and personal text."
  },
  {
    id: "besoins",
    title: "How does it meet identified needs?",
    content: "The experience makes useful a moment that wasn't, restores meaning to a forced pause, creates emotional continuity from one update to the next, respects the silence and temporality of this technical ritual, and offers a space for intimate expression without additional effort for the user."
  },
  {
    id: "insights",
    title: "Questionnaire Insights",
    content: "Responses to the questionnaire show that waiting is often perceived as empty, unengaging, or useless time.\nA majority of users express the desire to be able to do something during this moment.\nSome feel frustration related to the imposed nature of the interruption.\nThe idea of leaving a personal, intimate, or introspective message during the update generates significant interest."
  },
  {
    id: "problematique",
    title: "iOS Waiting Problem",
    content: "Waiting for an iOS update is a moment perceived as useless, constrained time that blocks the use of the phone. A mockup was created with questionnaire responses to materialize this frustration and the opportunity for a moment of personal expression."
  },
  {
    id: "outcome",
    title: "Outcome",
    content: "The concept proposes an introspective, personal, and optional experience at the heart of an imposed technical ritual. The generated message can be found during the next update, creating discreet emotional continuity in the iOS ecosystem. System progress remains visible, bringing subtle humanization to the wait."
  },
  {
    id: "appris",
    title: "What I Learned",
    content: "Exploring temporality as a matter of interaction.\nWorking on micro-rituals of daily life.\nIntegrating Apple Intelligence into introspective logic.\nDesigning a complex multi-path journey.\nArticulating silence, memory, waiting, and interaction."
  }
];

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

const MagnifierImage = ({ src, alt, hint, clickHint }: { src: string; alt: string; hint: string; clickHint: string }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const magnifierHeight = 250;
  const magnifierWidth = 400;
  const zoomLevel = 4;

  return (
    <div className="relative w-full max-w-5xl mx-auto mb-12 group cursor-none">
      <div className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-700 ${!isLoaded ? 'bg-[#1d1d1f]/20 animate-pulse' : ''}`}>
        <img
          src={src}
          className={`w-full h-auto display-block transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          onClick={() => {
            setShowMagnifier(!showMagnifier);
          }}
        />
        
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{hint}</span>
          <span className="md:hidden">{clickHint}</span>
        </div>
      </div>

      <div
        style={{
          display: showMagnifier ? "block" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: "1",
          border: "2px solid rgba(255,255,255,0.5)",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          borderRadius: "inherit",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          zIndex: 50,
        }}
      />
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function IOS26Page() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("FR");
  const [isExiting, setIsExiting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPNGZoom, setShowPNGZoom] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language;
    if (savedLanguage && ["FR", "EN", "ՀԱՅ"].includes(savedLanguage)) setLanguage(savedLanguage);
    const handleLanguageChange = (event: CustomEvent<Language>) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener);
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

  const t = translations[language] || translations["FR"];
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

  const handleBack = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(10);
    setIsExiting(true);
    setTimeout(() => { setShowOverlay(true); setTimeout(() => router.push("/projects"), 300); }, 150);
  };

  const handleScroll = () => {
    const nextSection = document.getElementById('project-content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    <div className="w-full min-h-screen" style={{ backgroundColor: "#000000" }}>
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div key="content" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <AnimatePresence>
              {showOverlay && <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} style={{ backgroundColor: "#EBEFF0" }} />}
            </AnimatePresence>

            <motion.div
              className="w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={fadeInUp} className="absolute top-24 left-6 md:top-32 md:left-8 z-[100]">
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 hover:bg-[#333333] active:scale-[0.95] transition-all duration-300 hover:-translate-x-1 group shadow-lg"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" className="transition-colors duration-300 group-hover:stroke-white">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
              </motion.div>

              <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <motion.div 
                  animate={{
                    background: [
                      "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
                      "linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)",
                      "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
                    ],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0"
                />
                
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center h-full pt-20">
                  <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <motion.div variants={fadeInUp} className="mb-6">
                      <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/60 text-sm font-medium tracking-wider uppercase">
                        {t.role}
                      </span>
                    </motion.div>
                    
                    <motion.h1 
                      variants={fadeInUp}
                      style={{ 
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(40px, 7vw, 88px)",
                        fontWeight: 600,
                        color: "white",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.15,
                        maxWidth: "900px"
                      }}
                    >
                      {t.projectTitle}
                    </motion.h1>
                    
                    <motion.p 
                      variants={fadeInUp}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(18px, 2.5vw, 28px)",
                        fontWeight: 300,
                        color: "rgba(255, 255, 255, 0.8)",
                        marginTop: "24px",
                        letterSpacing: "-0.01em",
                        maxWidth: "700px"
                      }}
                    >
                      {t.tagline}
                    </motion.p>
                  </div>
                </div>

                <motion.button
                  variants={fadeInUp}
                  onClick={handleScroll}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 z-20"
                  style={{
                    background: "none",
                    border: "none",
                    padding: "16px",
                  }}
                  aria-label="Scroll down to continue"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.7)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase"
                    }}
                  >
                    {t.scroll}
                  </span>
                  <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "rgba(255, 255, 255, 0.7)" }} />
                </motion.button>
              </section>

              <section id="project-content" className="min-h-screen py-24 px-6 md:px-12 bg-white flex flex-col items-center">
                <div className="max-w-4xl mx-auto text-center mb-16">
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <span className="inline-block px-4 py-2 bg-[#1d1d1f]/10 rounded-full text-[#1d1d1f] text-sm font-semibold tracking-wider uppercase mb-6">
                      {t.descriptionTitle}
                    </span>
                    <p style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(18px, 2vw, 24px)",
                      fontWeight: 400,
                      color: "#424245",
                      lineHeight: 1.7,
                      whiteSpace: "pre-line"
                    }}>
                      {t.description}
                    </p>
                  </motion.div>
                </div>

                <motion.div 
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="w-full max-w-md mx-auto mb-16 relative"
                >
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden"
                    }}>
                    <video
                      ref={videoRef}
                      src="/projects/ios26/iNotifications-Stack-v2.mp4"
                      loop
                      muted
                      playsInline
                      autoPlay
                      preload="auto"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      style={{
                        width: "100.5%",
                        height: "auto",
                        display: "block",
                        transform: "scale(1.01)",
                        objectFit: "cover"
                      }}
                      aria-label="iOS 26 Update Vision interface demonstration" />
                  </div>

                  <div className="flex items-center justify-center gap-3" style={{ marginTop: "12px", position: "relative", zIndex: 10 }}>
                    <button
                      onClick={togglePlayPause}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1d1d1f] text-white font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] hover:bg-[#333333]"
                      style={{
                        fontFamily: "var(--font-body)"
                      }}
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span className="hidden md:inline">{isPlaying ? "Pause" : "Play"}</span>
                    </button>
                    
                    <button
                      onClick={skipForward}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1d1d1f] text-white font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] hover:bg-[#333333]"
                      style={{
                        fontFamily: "var(--font-body)"
                      }}
                      aria-label="Skip forward 5 seconds"
                    >
                      <SkipForward className="w-4 h-4" />
                      <span className="hidden md:inline">+5s</span>
                    </button>
                  </div>
                </motion.div>

                <div className="w-full max-w-4xl mx-auto space-y-4 mb-16">
                  {accordionSections.map((section) => {
                    const isOpen = openSections.includes(section.id);
                    return (
                      <motion.div 
                        key={section.id}
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="border border-[#d1d1d6] rounded-lg overflow-hidden bg-white"
                      >
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 hover:bg-[#f5f5f7]"
                          style={{
                            backgroundColor: isOpen ? "#f5f5f7" : "transparent"
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "clamp(16px, 1.8vw, 20px)",
                              fontWeight: 600,
                              color: "#1d1d1f",
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
                          <div className="px-5 py-6 border-t border-[#d1d1d6]">
                            <p
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "clamp(14px, 1.4vw, 16px)",
                                fontWeight: 400,
                                color: "#424245",
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
                                  src="/projects/ios26/iOS_26_frustrations.png" 
                                  alt="Questionnaire Insights"
                                  width={1200}
                                  height={700}
                                  style={{ width: "100%", height: "auto" }}
                                  loading="eager"
                                  priority
                                  quality={90}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div 
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="w-full mb-16"
                >
                  <div className="relative w-full max-w-5xl mx-auto">
                    <MagnifierImage 
                      src="/projects/ios26/iOS_26_Chemin_Utilisateur.jpg" 
                      alt="iOS 26 User Journey" 
                      hint={t.zoomHint} 
                      clickHint={t.clickHint} 
                    />
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-8 mb-10 w-full flex flex-wrap justify-start md:justify-center items-center gap-4 px-6"
                >
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center gap-3 w-12 h-12 md:w-auto md:px-8 md:py-4 rounded-full bg-[#1d1d1f] text-white font-medium transition-all duration-300 hover:bg-[#333333] active:scale-[0.95] shadow-xl group"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform duration-300">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span className="hidden md:inline">{t.backButton}</span>
                  </button>

                  <a 
                    href="/projects/ios26/RUBENS_Romain_iOS26_Update_Vision_User_flow.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-12 h-12 md:w-auto md:px-8 md:py-4 rounded-full bg-white border-2 border-[#1d1d1f] text-[#1d1d1f] font-medium transition-all duration-300 hover:bg-[#1d1d1f] hover:text-white active:scale-[0.95] shadow-xl group"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform duration-300">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    <span className="hidden md:inline">{t.pdfTitle}</span>
                  </a>
                </motion.div>
              </section>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              src="/projects/ios26/iOS_26_frustrations.png" 
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
    </div>
  );
}
