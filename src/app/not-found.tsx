"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Compass } from "lucide-react";

const translations = {
  FR: {
    eyebrow: "Erreur 404",
    title: "Le chemin sort de l'interface.",
    subtext: "Cette page existe peut-être dans une autre version du site, mais ce lien ne répond plus.",
    button: "Retour à l'accueil",
    status: "Signal perdu",
    route: "Route introuvable",
  },
  EN: {
    eyebrow: "Error 404",
    title: "The path left the interface.",
    subtext: "This page may exist in another version of the site, but this link no longer responds.",
    button: "Back home",
    status: "Signal lost",
    route: "Route not found",
  },
  ՀԱՅ: {
    eyebrow: "Սխալ 404",
    title: "Այս ուղին դուրս է եկել ինտերֆեյսից։",
    subtext: "Էջը հնարավոր է կա կայքի մեկ այլ տարբերակում, բայց այս հղումն այլևս չի պատասխանում։",
    button: "Վերադառնալ տուն",
    status: "Կապը կորել է",
    route: "Ուղին չի գտնվել",
  },
};

export default function NotFound() {
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (saved && translations[saved]) {
      setSelectedLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<"FR" | "EN" | "ՀԱՅ">;
      setSelectedLanguage(customEvent.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange);
    return () => window.removeEventListener("languageChange", handleLanguageChange);
  }, []);

  const t = translations[selectedLanguage];

  return (
    <main className="not-found-shell relative min-h-[100svh] overflow-hidden bg-[#1D1D1F] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="not-found-grid absolute inset-0" />
        <div className="not-found-scan absolute left-0 top-0 h-px w-full" />
        <div className="absolute inset-x-6 top-24 h-px bg-white/10 md:inset-x-10" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col justify-center px-6 py-28 md:px-10">
        <Link
          href="/"
          aria-label={t.button}
          className="not-found-home group mb-14 inline-flex w-fit items-center gap-2 rounded-full border border-white/14 bg-white text-[#1D1D1F] px-4 py-2 text-sm font-semibold no-underline transition duration-200 hover:scale-[1.02] hover:bg-[#f5f5f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
          <span>{t.button}</span>
        </Link>

        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] md:items-end">
          <div className="max-w-[760px]">
            <p className="mb-5 text-sm font-semibold uppercase text-white/62">
              {t.eyebrow}
            </p>
            <h1
              className="text-[clamp(42px,8vw,96px)] font-semibold leading-[0.95] text-white"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0px" }}
            >
              {t.title}
            </h1>
            <p className="mt-7 max-w-[640px] text-base leading-7 text-white/72 md:text-lg md:leading-8">
              {t.subtext}
            </p>
          </div>

          <div className="not-found-panel relative aspect-square min-h-[280px] overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
            <div className="absolute inset-6 rounded-full border border-white/10" aria-hidden="true" />
            <div className="absolute inset-16 rounded-full border border-dashed border-white/12" aria-hidden="true" />
            <div className="not-found-orbit absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/16" aria-hidden="true">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1px] bg-[var(--theme-accent)] shadow-[0_0_22px_var(--theme-accent)]" />
            </div>

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase text-white/54">
                <span>{t.route}</span>
                <Compass className="h-4 w-4 text-white/62" aria-hidden="true" />
              </div>

              <div className="text-center">
                <div className="not-found-code text-[clamp(74px,13vw,154px)] font-semibold leading-none text-white" aria-hidden="true">
                  404
                </div>
                <svg className="mx-auto mt-5 h-14 w-14" viewBox="0 0 78 75" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M21.2637 4.08739L37.8817 26.3888L38.0898 26.3454L52.3654 3.49677L64.4675 12.5899L49.1889 33.6824L49.3474 33.824L74.6759 40.115L70.7839 54.6401L45.7033 47.424L45.4704 47.5599L48.1731 73.7679L33.2104 74.6175L32.2146 48.2718L32.0561 48.1302L6.39732 59.2027L1.30436 44.8482L27.3245 35.3599L27.3989 35.0824L9.58414 13.9477L21.2637 4.08739Z" fill="var(--theme-accent)" />
                </svg>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-sm font-medium text-white/72">
                <span className="h-2 w-2 rotate-45 rounded-[1px] bg-[var(--theme-accent)]" aria-hidden="true" />
                {t.status}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .not-found-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.28) 68%, transparent);
        }

        .not-found-scan {
          background: linear-gradient(90deg, transparent, var(--theme-accent), transparent);
          animation: scan-y 5.8s cubic-bezier(0.45, 0, 0.2, 1) infinite;
          opacity: 0.72;
        }

        .not-found-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(120deg, rgba(255,255,255,0.16), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,0.06), transparent 70%);
          opacity: 0.72;
        }

        .not-found-orbit {
          animation: orbit 12s linear infinite;
        }

        .not-found-code {
          text-shadow: 0 0 34px rgba(255,255,255,0.12);
        }

        @keyframes scan-y {
          0% { transform: translateY(14vh); opacity: 0; }
          12% { opacity: 0.78; }
          56% { opacity: 0.78; }
          100% { transform: translateY(86vh); opacity: 0; }
        }

        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .not-found-scan,
          .not-found-orbit {
            animation: none;
          }
        }

        html[data-contrast="high"] .not-found-shell,
        html[data-contrast="high"] .not-found-shell * {
          color: #ffffff !important;
        }

        html[data-contrast="high"] .not-found-home,
        html[data-contrast="high"] .not-found-home * {
          background: #ffffff !important;
          border-color: #ffffff !important;
          color: #000000 !important;
        }
      `}</style>
    </main>
  );
}
