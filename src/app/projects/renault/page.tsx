"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const RenaultLogo = ({ className, color = "#1D1D1F" }: { className?: string; color?: string }) => (
  <svg className={className} width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.2188 20.9227L28.1014 20.8892L18.1742 18.0331L19.2411 28.3856L19.2542 28.5104L19.1287 28.5183L13.1652 28.8564L13.043 28.8631L13.0382 28.7415L12.6448 18.3319L2.51813 22.7026L2.4005 22.753L2.358 22.6324L0.327259 16.9109L0.288391 16.7994L0.399469 16.7584L10.7034 13.0013L3.64886 4.63147L3.57223 4.54016L3.66378 4.46259L8.31906 0.532572L8.41591 0.450344L8.4926 0.552784L15.0505 9.35369L20.6917 0.32545L20.7609 0.214566L20.8652 0.293072L25.6881 3.91776L25.7823 3.98852L25.7135 4.0833L19.7036 12.3819L29.7147 14.8682L29.8331 14.8979L28.2188 20.9227Z" fill={color} stroke={color} strokeWidth="0.239669"/>
  </svg>
);

const ArrowDown = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="50" rx="25" fill="rgba(255,255,255,0.15)"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M23.8891 31.5229L15 22.3042L17.2219 20L25 28.0665L32.7781 20L35 22.3042L26.1109 31.5229C25.8163 31.8284 25.4167 32 25 32C24.5833 32 24.1837 31.8284 23.8891 31.5229Z" fill="white"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2 0.916748V13.0833C2 13.5 2.5 13.75 2.8 13.5L11 7L2.8 0.5C2.5 0.25 2 0.5 2 0.916748Z" fill="#EFDF00"/>
  </svg>
);

/* Pattern décoratif — logo Renault répété en grille */
const RenaultPattern = ({ color = "white", opacity = 0.07 }: { color?: string; opacity?: number }) => {
  const logoPath = "M28.2188 20.9227L28.1014 20.8892L18.1742 18.0331L19.2411 28.3856L19.2542 28.5104L19.1287 28.5183L13.1652 28.8564L13.043 28.8631L13.0382 28.7415L12.6448 18.3319L2.51813 22.7026L2.4005 22.753L2.358 22.6324L0.327259 16.9109L0.288391 16.7994L0.399469 16.7584L10.7034 13.0013L3.64886 4.63147L3.57223 4.54016L3.66378 4.46259L8.31906 0.532572L8.41591 0.450344L8.4926 0.552784L15.0505 9.35369L20.6917 0.32545L20.7609 0.214566L20.8652 0.293072L25.6881 3.91776L25.7823 3.98852L25.7135 4.0833L19.7036 12.3819L29.7147 14.8682L29.8331 14.8979L28.2188 20.9227Z";
  const cols = 6;
  const rows = 8;
  const spacingX = 90;
  const spacingY = 90;
  const scale = 2.4;
  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <g
            key={`${row}-${col}`}
            transform={`translate(${col * spacingX - 10}, ${row * spacingY - 10}) scale(${scale})`}
          >
            <path d={logoPath} fill={color} />
          </g>
        ))
      )}
    </svg>
  );
};

export default function RenaultPage() {
  const router = useRouter();

  const scrollToContent = () => {
    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main id="main-content" style={{ fontFamily: "var(--font-body)", backgroundColor: "#1d1d1f", overflowX: "hidden" }}>

      {/* ── HERO ── Dark avec pattern Renault */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#1d1d1f", minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
      >
        {/* Pattern logos Renault en fond */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <RenaultPattern />
        </div>

        {/* Année top-right */}
        <span
          style={{ position: "absolute", top: 32, right: 40, fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", zIndex: 1 }}
        >
          2026
        </span>

        {/* Contenu centré — titre uniquement */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", padding: "0 24px" }}>
          {/* Logo + label */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <RenaultLogo color="#efdf00" />
            <span style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              App Extension
            </span>
          </div>

          {/* Titre principal */}
          <span style={{ fontSize: "clamp(52px, 7vw, 110px)", fontWeight: 700, color: "#ffffff", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            Renault
          </span>
          <span style={{ fontSize: "clamp(18px, 2.2vw, 34px)", fontWeight: 400, color: "rgba(255,255,255,0.45)", lineHeight: 1.2 }}>
            App Extension
          </span>
        </div>

        {/* Flèche — centrée horizontalement, ancrée en bas */}
        <button
          onClick={scrollToContent}
          style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 1, cursor: "pointer", background: "none", border: "none", padding: 0 }}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <ArrowDown />
        </button>
      </section>

      {/* ── INTRODUCTION TEXTE ── */}
      <section
        id="content"
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#1d1d1f" }}
      >
        <div className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">

            {/* Colonne gauche + pattern droit */}
            <div className="relative flex flex-col gap-20 md:gap-32">

              {/* Quote 1 — gauche */}
              <div className="flex flex-col gap-6 max-w-2xl">
                <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 600, color: "#ffffff", lineHeight: 1.15 }}>
                  <span style={{ color: "#efdf00" }}>Measuring to </span>
                  better judge
                </h2>
                <p style={{ fontSize: "clamp(16px, 1.5vw, 22px)", fontWeight: 400, color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>
                  &ldquo;Digital measurement interfaces, scores, streaks, usage indicators, promise to{" "}
                  <span style={{ color: "#efdf00" }}>help individuals manage their behavior</span>
                  . Yet these devices do not simply inform: they produce implicit norms and{" "}
                  <span style={{ color: "#efdf00" }}>turn deviation into visible fault</span>
                  .&rdquo;
                  <br />
                  <em style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9em" }}>Cahier Ethno-Design, Strate × Renault</em>
                </p>
              </div>

              {/* Quote 2 — droite */}
              <div className="flex flex-col gap-4 max-w-2xl self-end text-right">
                <p style={{ fontSize: "clamp(16px, 1.5vw, 22px)", fontWeight: 400, color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>
                  &ldquo;This project explores how the quantification of mobility transforms individual{" "}
                  <span style={{ color: "#3579f6" }}>decisions into visible collective arbitrations</span>
                  .&rdquo;
                </p>
                <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>
                  Romain Rubens & Erwan Hodonou
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pattern décoratif losanges — coin droit */}
        <div className="absolute top-0 right-0 w-72 h-full overflow-hidden opacity-10 pointer-events-none" aria-hidden="true">
          <svg width="300" height="100%" viewBox="0 0 300 700" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            {[0, 1, 2, 3, 4, 5, 6].map((row) =>
              [0, 1].map((col) => (
                <g key={`d-${row}-${col}`} transform={`translate(${col * 120 + 30}, ${row * 110 - 20})`}>
                  <path d="M50 5L95 50L50 95L5 50Z" stroke="white" strokeWidth="1.5" fill="none" />
                </g>
              ))
            )}
          </svg>
        </div>
      </section>

      {/* ── MOCKUP SYSTÈME ACTIVÉ ── */}
      <section className="w-full" style={{ backgroundColor: "#ffffff" }}>
        <div className="w-full flex items-center justify-center py-16 md:py-24 px-4">
          <Image
            src="/projects/renault/mockup-on.png"
            alt="Renault App Extension — système activé"
            width={1762}
            height={1212}
            className="w-full max-w-7xl object-contain"
            priority
          />
        </div>
      </section>

      {/* ── DESIGN QUESTION ── */}
      <section className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-36" style={{ backgroundColor: "#1d1d1f" }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-14 md:gap-20">

          {/* Pill */}
          <div className="inline-flex items-center justify-center self-center px-6 py-2.5 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em" }}>DESIGN QUESTION</span>
          </div>

          {/* Paragraphe design question — texte mixte */}
          <p className="text-center" style={{ fontSize: "clamp(18px, 2vw, 28px)", fontWeight: 400, lineHeight: 1.65 }}>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>Digital measurement interfaces, scores, streaks, usage indicators, </span>
            <span style={{ color: "#efdf00" }}>promise to help individuals manage their behavior more effectively</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>. Yet these devices do not simply inform: they produce implicit norms, </span>
            <span style={{ color: "#3579f6" }}>turn deviation into visible fault, and establish affective self-discipline</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>. Measurement becomes an instrument of power when surveillance is internalized by individuals themselves.</span>
          </p>

          {/* Grille de cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {/* Carte 1 — Measuring to judge */}
            <div className="flex flex-col gap-5 p-7 md:p-9 rounded-2xl" style={{ backgroundColor: "#2a2a2a" }}>
              {/* Icône mesure */}
              <div className="flex items-start gap-3 mb-1">
                <div className="flex-shrink-0 flex flex-col gap-1" style={{ width: 24 }}>
                  <div style={{ height: 8, backgroundColor: "#efdf00", borderRadius: 2 }} />
                  <div style={{ height: 24, backgroundColor: "#efdf00", borderRadius: 2, width: 4, marginLeft: 10 }} />
                  <div style={{ height: 8, backgroundColor: "#efdf00", borderRadius: 2 }} />
                </div>
              </div>
              <h3 style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 600, lineHeight: 1.2 }}>
                <span style={{ color: "#ffffff" }}>Measuring to </span>
                <span style={{ color: "#efdf00" }}>judge</span>
                <span style={{ color: "#ffffff" }}>?</span>
              </h3>
              <p style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                When performance becomes visible and comparable, quantification devices transform everyday experience into permanent moral judgment. It is no longer just a technical data point, it becomes a potential fault.
              </p>
            </div>

            {/* Carte 2 — Household Quota */}
            <div className="flex flex-col gap-5 p-7 md:p-9 rounded-2xl" style={{ backgroundColor: "#2a2a2a" }}>
              <h3 style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 600, lineHeight: 1.2 }}>
                <span style={{ color: "#ffffff" }}>Household </span>
                <span style={{ color: "#efdf00" }}>Quota</span>
              </h3>
              <p style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                An extension of the My Renault app that assigns a shared weekly kilometer quota to an entire household. Every trip made is deducted from the shared quota, making individual trade-offs visible.
              </p>
            </div>

            {/* Carte 3 — The household as a unit (pleine largeur) */}
            <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-8 p-7 md:p-9 rounded-2xl" style={{ backgroundColor: "#2a2a2a" }}>
              {/* Voitures + avatars */}
              <div className="flex items-end gap-2 flex-shrink-0">
                <div className="flex gap-1.5">
                  {[
                    { bg: "#3579f6", label: "Moi" },
                    { bg: "#474747", label: "Aurélie" },
                    { bg: "#474747", label: "Max" },
                    { bg: "#474747", label: "+ Add" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="flex flex-col items-center justify-end gap-1 rounded-lg overflow-hidden"
                      style={{ width: 56, height: 80, backgroundColor: m.bg, paddingBottom: 6 }}
                    >
                      <span style={{ fontSize: 8, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <h3 style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 600, lineHeight: 1.2 }}>
                  <span style={{ color: "#ffffff" }}>The household as a </span>
                  <span style={{ color: "#3579f6" }}>unit</span>
                </h3>
                <p style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                  Mobility decisions are negotiated at the household level. Car sharing, trip trade-offs, distribution of mobility resources. The individual decision becomes a visible collective arbitration.
                </p>
              </div>
            </div>

            {/* Carte 4 — Discipline through visibility */}
            <div className="flex flex-col gap-5 p-7 md:p-9 rounded-2xl" style={{ backgroundColor: "#2a2a2a" }}>
              <h3 style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 600, lineHeight: 1.2 }}>
                <span style={{ color: "#efdf00" }}>Discipline </span>
                <span style={{ color: "#ffffff" }}>through visibility</span>
              </h3>
              <p style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                Behavioral regulation works through visibility and the internalization of norms rather than direct constraint. By making trips comparable and shareable, the interface organizes horizontal surveillance among users.
              </p>
            </div>

            {/* Carte 5 — Shame as an interface */}
            <div className="relative flex flex-col gap-5 p-7 md:p-9 rounded-2xl overflow-hidden" style={{ backgroundColor: "#2a2a2a" }}>
              <h3 style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 600, lineHeight: 1.2 }}>
                <span style={{ color: "#3579f6" }}>Shame </span>
                <span style={{ color: "#ffffff" }}>as an interface</span>
              </h3>
              <p style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                When the gap becomes visible, shame appears on its own. The interface does not forbid, it exposes. The driver is not accused, but positioned.
              </p>
              {/* Image téléphone bottom-right */}
              <div className="absolute bottom-0 right-4">
                <Image
                  src="/projects/renault/maed.png"
                  alt=""
                  width={90}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Carte 6 — Workaround (pleine largeur) */}
            <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-8 p-7 md:p-9 rounded-2xl" style={{ backgroundColor: "#2a2a2a" }}>
              {/* Toggle désactivé */}
              <div className="flex-shrink-0 flex items-center gap-5 px-6 py-5 rounded-xl" style={{ backgroundColor: "#1d1d1f" }}>
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#efdf00" }}>Quota km</span>
                  <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>hebdomadaire désactivé</span>
                </div>
                {/* Toggle OFF — cercle à droite */}
                <div className="relative flex-shrink-0 rounded-full" style={{ width: 54, height: 32, backgroundColor: "#3579f6" }}>
                  <div className="absolute rounded-full" style={{ width: 26, height: 26, backgroundColor: "#ffffff", top: 3, right: 3 }} />
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <h3 style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 600, color: "#ffffff", lineHeight: 1.2 }}>
                  Workaround
                </h3>
                <p style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                  While these interfaces promise to help users manage themselves better, users develop strategies to escape the judgment they produce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGN SYSTEM PROPOSAL ── */}
      <section className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-36" style={{ backgroundColor: "#1d1d1f" }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-14 md:gap-20">
          <div className="inline-flex items-center justify-center self-center px-6 py-2.5 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em" }}>DESIGN SYSTEM PROPOSAL</span>
          </div>
          <p className="text-center" style={{ fontSize: "clamp(18px, 2vw, 28px)", fontWeight: 400, lineHeight: 1.65 }}>
            <span style={{ color: "#efdf00" }}>The project designs an extension of My Renault imagining a shared weekly kilometer quota at the household level.</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}> Every trip made by a member is deducted from the shared quota, making individual trade-offs visible and turning each mobility decision into a collective act. If the quota is exceeded, </span>
            <span style={{ color: "#efdf00" }}>the overage is recorded and visible to every household member.</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}> The artifact materializes the tension between individual mobility freedom and collective responsibility toward shared resources.</span>
          </p>
        </div>
      </section>

      {/* ── MOCKUP SYSTÈME DÉSACTIVÉ ── */}
      <section className="w-full" style={{ backgroundColor: "#ffffff" }}>
        <div className="w-full flex items-center justify-center py-16 md:py-24 px-4">
          <Image
            src="/projects/renault/mockup-off.png"
            alt="Renault App Extension — système désactivé"
            width={1462}
            height={1212}
            className="w-full max-w-6xl object-contain"
          />
        </div>
      </section>

      {/* ── CREDIT ── */}
      <section className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-36" style={{ backgroundColor: "#1d1d1f" }}>
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-10 text-center">
          <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em" }}>CREDIT</span>
          </div>
          <p style={{ fontSize: "clamp(16px, 1.6vw, 24px)", fontWeight: 400, color: "rgba(255,255,255,0.75)", lineHeight: 1.75 }}>
            A project made in collaboration with{" "}
            <span style={{ color: "#3579f6" }}>Erwan Hodonou</span>
            , as part of the Critical Thinking and Prospective Design course led by{" "}
            <span style={{ color: "#3579f6" }}>Fanny Parise</span>
            , anthropologist, co-director of the ManagIA research chair and lecturer in humanities and social sciences at Strate École de Design Lyon, in partnership with{" "}
            <span style={{ color: "#efdf00" }}>Renault</span>
            .
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full" style={{ backgroundColor: "#1d1d1f" }}>
        <div
          className="relative w-full px-6 md:px-12 py-20 md:py-28 flex flex-col items-center justify-center gap-10 text-center overflow-hidden"
          style={{ backgroundColor: "#efdf00", borderRadius: "80px 80px 0 0" }}
        >
          {/* Pattern losanges en fond */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none" aria-hidden="true">
            <RenaultPattern color="#1d1d1f" opacity={0.08} />
          </div>

          <div className="relative flex flex-col items-center gap-6" style={{ zIndex: 1 }}>
            {/* Logo + label */}
            <div className="flex items-center gap-3">
              <RenaultLogo className="w-6 h-6 md:w-7 md:h-7" color="#1d1d1f" />
              <span style={{ fontSize: "clamp(14px, 1.2vw, 18px)", fontWeight: 400, color: "rgba(29,29,31,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                App Extension
              </span>
            </div>

            {/* Titre */}
            <span style={{ fontSize: "clamp(44px, 6vw, 90px)", fontWeight: 700, color: "#1d1d1f", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
              Renault
            </span>

            {/* Bouton Back to projects */}
            <button
              onClick={() => router.push("/projects")}
              className="flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-200 hover:opacity-85 active:scale-95 mt-2"
              style={{ backgroundColor: "#1d1d1f" }}
            >
              <span style={{ fontSize: "clamp(14px, 1.2vw, 18px)", fontWeight: 500, color: "#efdf00" }}>
                Back to projects
              </span>
              <ArrowRight />
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
