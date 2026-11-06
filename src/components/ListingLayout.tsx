import type { Language } from "@/lib/language";

// Shared geometry keeps Projects and Articles aligned at every breakpoint.
export const listingPageClassName = "w-full min-h-screen flex justify-center py-5 md:mt-[20px] pb-32 md:pb-12";
export const listingContainerClassName = "flex w-full max-w-[1234px] h-auto px-4 md:px-8 lg:px-12 xl:px-4 mt-16 md:mt-[40px] relative flex-col items-center gap-12 md:gap-[100px]";
export const listingSectionClassName = "flex flex-col items-center gap-6 md:gap-[50px] relative w-full";
export const listingGridClassName = "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[50px] w-full";

const bannerText = {
  projects: {
    FR: ["Une sélection de projets conçus à partir d'usages réels, de contraintes concrètes et de contextes précis.", "Une sélection de projets conçus à partir d'usages réels,\nde contraintes concrètes et de contextes précis."],
    EN: ["A selection of projects shaped by real-world uses, concrete constraints, and specific contexts.", "A selection of projects shaped by real-world uses,\nconcrete constraints, and specific contexts."],
    ՀԱՅ: ["Իրական օգտագործումների վրա հիմնված նախագծերի ընտրանի։", "Իրական օգտագործումների վրա հիմնված\nնախագծերի ընտրանի։"],
  },
  articles: {
    FR: ["Mes réflexions de designer sur les interfaces, les usages et les écosystèmes connectés.", "Mes réflexions de designer sur les interfaces,\nles usages et les écosystèmes connectés."],
    EN: ["My perspective as a designer on interfaces, everyday uses, and connected ecosystems.", "My perspective as a designer on interfaces,\neveryday uses, and connected ecosystems."],
    ՀԱՅ: ["Իմ՝ որպես դիզայների մտորումները ինտերֆեյսների և կապակցված էկոհամակարգերի մասին։", "Իմ՝ որպես դիզայների մտորումները ինտերֆեյսների\nև կապակցված էկոհամակարգերի մասին։"],
  },
};

export function ListingBanner({ kind, language }: { kind: keyof typeof bannerText; language: Language }) {
  const [desktop, compact] = bannerText[kind][language];
  return <div data-listing-banner className="w-full h-[45px] md:h-[50px] lg:h-[46px] rounded-[12px] flex items-center justify-center shrink-0" style={{ backgroundColor:"#314dcb" }}>
    <p className="text-center px-3 lg:px-6 whitespace-pre-line lg:whitespace-nowrap text-[9px] md:text-[11px] lg:text-base leading-snug" style={{ fontFamily:"var(--font-body)", fontWeight:600, letterSpacing:0, color:"#ffffff" }}>
      <span className="hidden lg:inline">{desktop}</span>
      <span className="lg:hidden">{compact}</span>
    </p>
  </div>;
}
