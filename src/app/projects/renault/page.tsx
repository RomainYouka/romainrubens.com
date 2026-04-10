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
    <rect width="50" height="50" rx="25" fill="#1D1D1F"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M23.8891 31.5229L15 22.3042L17.2219 20L25 28.0665L32.7781 20L35 22.3042L26.1109 31.5229C25.8163 31.8284 25.4167 32 25 32C24.5833 32 24.1837 31.8284 23.8891 31.5229Z" fill="white"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2 0.916748V13.0833C2 13.5 2.5 13.75 2.8 13.5L11 7L2.8 0.5C2.5 0.25 2 0.5 2 0.916748Z" fill="#EFDF00"/>
  </svg>
);

export default function RenaultPage() {
  const router = useRouter();

  const scrollToContent = () => {
    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main style={{ fontFamily: "var(--font-body)", backgroundColor: "#1d1d1f", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#efdf00", minHeight: "100svh" }}
      >
        {/* Année top-right */}
        <span
          className="absolute top-6 right-6 md:top-8 md:right-10"
          style={{ fontSize: 14, fontWeight: 400, color: "#1d1d1f", letterSpacing: "0.05em" }}
        >
          2026
        </span>

        {/* Centre */}
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12 px-6 text-center">
          {/* Introducing */}
          <div className="flex items-center gap-3">
            <RenaultLogo className="w-6 h-6 md:w-7 md:h-7" />
            <span style={{ fontSize: "clamp(20px, 2.5vw, 40px)", fontWeight: 400, color: "#1d1d1f" }}>
              Introducing
            </span>
          </div>

          {/* Titre principal */}
          <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1">
            <span style={{ fontSize: "clamp(52px, 6.5vw, 100px)", fontWeight: 700, color: "#1d1d1f", lineHeight: 1 }}>
              Renault
            </span>
            <span style={{ fontSize: "clamp(32px, 4vw, 62px)", fontWeight: 500, color: "#1d1d1f", lineHeight: 1.1 }}>
              App Extension
            </span>
          </div>

          {/* Flèche */}
          <button onClick={scrollToContent} className="transition-transform hover:scale-110 active:scale-95 mt-4">
            <ArrowDown />
          </button>
        </div>
      </section>

      {/* ── CITATION / INTRODUCTION ── */}
      <section
        id="content"
        className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-32"
        style={{ backgroundColor: "#1d1d1f" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col gap-16 md:gap-24">
          <div className="flex flex-col gap-6">
            <h2 style={{ fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 600, color: "#ffffff", lineHeight: 1.15 }}>
              Measuring to better judge
            </h2>
            <p style={{ fontSize: "clamp(18px, 2vw, 32px)", fontWeight: 500, color: "#ffffff", lineHeight: 1.55 }}>
              "Digital measurement interfaces, scores, streaks, usage indicators, promise to help individuals manage their behavior. Yet these devices do not simply inform: they produce implicit norms and turn deviation into visible fault." <em>Cahier Ethno-Design, Strate × Renault</em>
            </p>
          </div>
          <p style={{ fontSize: "clamp(18px, 2vw, 36px)", fontWeight: 500, color: "#ffffff", lineHeight: 1.55 }}>
            "This project explores how the quantification of mobility transforms individual decisions into visible collective arbitrations." <em>Romain Rubens & Erwan Hodonou</em>
          </p>
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
      <section className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-32" style={{ backgroundColor: "#1d1d1f" }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-16">

          {/* Pill */}
          <div className="inline-flex items-center justify-center self-start px-6 py-3 rounded-full" style={{ backgroundColor: "#323232" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#f5f5f5", letterSpacing: "0.1em" }}>DESIGN QUESTION</span>
          </div>

          {/* Texte jaune */}
          <p style={{ fontSize: "clamp(20px, 2.5vw, 36px)", fontWeight: 500, color: "#efdf00", lineHeight: 1.5 }}>
            Digital measurement interfaces, scores, streaks, usage indicators, promise to help individuals manage their behavior more effectively. Yet these devices do not simply inform: they produce implicit norms, turn deviation into visible fault, and establish affective self-discipline. Measurement becomes an instrument of power when surveillance is internalized by individuals themselves.
          </p>

          {/* Grille de cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px mt-4" style={{ backgroundColor: "#1d1d1f" }}>

            {/* Carte 1 */}
            <div className="flex flex-col gap-6 p-8 md:p-10" style={{ backgroundColor: "#323232" }}>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 38px)", fontWeight: 510, color: "#ffffff", lineHeight: 1.2 }}>
                Measuring to judge?
              </h3>
              <p style={{ fontSize: 16, fontWeight: 400, color: "#ffffff", lineHeight: 1.6 }}>
                When performance becomes visible and comparable, quantification devices transform everyday experience into permanent moral judgment. It is no longer just a technical data point, it becomes a potential fault.
              </p>
              {/* Bar chart décoratif */}
              <div className="flex items-end gap-2 mt-4" style={{ height: 88 }}>
                <div style={{ width: 56, height: 41, backgroundColor: "#efdf00", borderRadius: 3 }} />
                <div style={{ width: 30, height: 61, backgroundColor: "#ffffff", borderRadius: 3 }} />
                <div style={{ width: 20, height: 83, backgroundColor: "#3579f6", borderRadius: 3 }} />
                <div style={{ width: 35, height: 31, backgroundColor: "#efdf00", borderRadius: 3 }} />
              </div>
            </div>

            {/* Carte 2 */}
            <div className="flex flex-col gap-6 p-8 md:p-10" style={{ backgroundColor: "#323232" }}>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 38px)", fontWeight: 510, color: "#ffffff", lineHeight: 1.2 }}>
                Household Quota
              </h3>
              <p style={{ fontSize: 16, fontWeight: 400, color: "#ffffff", lineHeight: 1.6 }}>
                An extension of the My Renault app that assigns a shared weekly kilometer quota to an entire household. Every trip made is deducted from the shared quota, making individual trade-offs visible.
              </p>
            </div>

            {/* Carte 3 — pleine largeur */}
            <div className="md:col-span-2 flex flex-col md:flex-row items-start gap-10 p-8 md:p-10" style={{ backgroundColor: "#323232" }}>
              <div className="flex flex-col gap-4 flex-1">
                <h3 style={{ fontSize: "clamp(22px, 2.5vw, 38px)", fontWeight: 510, color: "#ffffff", lineHeight: 1.2 }}>
                  The household as a unit
                </h3>
                <p style={{ fontSize: 16, fontWeight: 400, color: "#ffffff", lineHeight: 1.6 }}>
                  Mobility decisions are negotiated at the household level. Car sharing, trip trade-offs, distribution of mobility resources. The individual decision becomes a visible collective arbitration.
                </p>
              </div>
              {/* Cartes membres */}
              <div className="flex gap-2 flex-shrink-0">
                {[
                  { name: "Me", color: "#3579f6" },
                  { name: "Aurélie", color: "#474747" },
                  { name: "Max", color: "#474747" },
                  { name: "+ Add", color: "#474747" },
                ].map((m) => (
                  <div
                    key={m.name}
                    className="flex flex-col items-center justify-end gap-1 rounded-sm"
                    style={{ width: 64, height: 100, backgroundColor: m.color, paddingBottom: 6 }}
                  >
                    <span style={{ fontSize: 8, fontWeight: 400, color: "#ffffff" }}>{m.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte 4 */}
            <div className="flex flex-col gap-6 p-8 md:p-10" style={{ backgroundColor: "#323232" }}>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 38px)", fontWeight: 600, color: "#ffffff", lineHeight: 1.2 }}>
                Discipline through visibility
              </h3>
              <p style={{ fontSize: 16, fontWeight: 400, color: "#ffffff", lineHeight: 1.6 }}>
                Behavioral regulation works through visibility and the internalization of norms rather than direct constraint. By making trips comparable and shareable, the interface organizes horizontal surveillance among users.
              </p>
            </div>

            {/* Carte 5 */}
            <div className="relative flex flex-col gap-6 p-8 md:p-10 overflow-hidden" style={{ backgroundColor: "#323232" }}>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 38px)", fontWeight: 500, color: "#ffffff", lineHeight: 1.2 }}>
                Shame as an interface
              </h3>
              <p style={{ fontSize: 16, fontWeight: 400, color: "#ffffff", lineHeight: 1.6 }}>
                When the gap becomes visible, shame appears on its own. The interface does not forbid, it exposes. The driver is not accused, but positioned.
              </p>
              <div className="absolute bottom-0 right-0">
                <Image
                  src="/projects/renault/maed.png"
                  alt=""
                  width={110}
                  height={250}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Carte 6 — pleine largeur */}
            <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-10 p-8 md:p-10" style={{ backgroundColor: "#323232" }}>
              <div className="flex flex-col gap-4 flex-1">
                <h3 style={{ fontSize: "clamp(22px, 2.5vw, 38px)", fontWeight: 600, color: "#ffffff", lineHeight: 1.2 }}>
                  Workaround
                </h3>
                <p style={{ fontSize: 16, fontWeight: 400, color: "#ffffff", lineHeight: 1.6 }}>
                  While these interfaces promise to help users manage themselves better, users develop strategies to escape the judgment they produce.
                </p>
              </div>
              {/* Toggle désactivé */}
              <div className="flex-shrink-0 flex items-center gap-5 px-6 py-5 rounded-xl" style={{ backgroundColor: "#474747" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
                  Quota km<br />hebdomadaire désactivé
                </span>
                <div className="relative flex-shrink-0 rounded-full" style={{ width: 78, height: 48, backgroundColor: "#3579f6" }}>
                  <div className="absolute rounded-full" style={{ width: 42, height: 42, backgroundColor: "#ffffff", top: 3, left: 3 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGN SYSTEM PROPOSAL ── */}
      <section className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-32" style={{ backgroundColor: "#1d1d1f" }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-16">
          <div className="inline-flex items-center justify-center self-start px-6 py-3 rounded-full" style={{ backgroundColor: "#323232" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#f5f5f5", letterSpacing: "0.1em" }}>DESIGN SYSTEM PROPOSAL</span>
          </div>
          <p style={{ fontSize: "clamp(20px, 2.5vw, 36px)", fontWeight: 500, color: "#efdf00", lineHeight: 1.5 }}>
            The project designs an extension of My Renault imagining a shared weekly kilometer quota at the household level. Every trip made by a member is deducted from the shared quota, making individual trade-offs visible and turning each mobility decision into a collective act. If the quota is exceeded, the overage is recorded and visible to every household member. The artifact materializes the tension between individual mobility freedom and collective responsibility toward shared resources.
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
      <section className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-32" style={{ backgroundColor: "#1d1d1f" }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="inline-flex items-center justify-center self-start px-6 py-3 rounded-full" style={{ backgroundColor: "#323232" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#f5f5f5", letterSpacing: "0.1em" }}>CREDIT</span>
          </div>
          <p style={{ fontSize: "clamp(18px, 2vw, 36px)", fontWeight: 500, color: "#ffffff", lineHeight: 1.6 }}>
            A project made in collaboration with Erwan Hodonou, as part of the Critical Thinking and Prospective Design course led by Fanny Parise, anthropologist, co-director of the ManagIA research chair and lecturer in humanities and social sciences at Strate École de Design Lyon, in partnership with Renault.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full" style={{ backgroundColor: "#1d1d1f" }}>
        <div
          className="w-full px-6 md:px-12 py-16 md:py-24 flex flex-col items-center justify-center gap-10 text-center"
          style={{ backgroundColor: "#efdf00", borderRadius: "80px 80px 0 0" }}
        >
          {/* Sous-titre */}
          <div className="flex items-center gap-3 justify-center">
            <RenaultLogo className="w-6 h-6 md:w-7 md:h-7" />
            <span style={{ fontSize: "clamp(18px, 2vw, 40px)", fontWeight: 400, color: "#1d1d1f" }}>
              Continue exploring
            </span>
          </div>

          {/* Titre */}
          <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1">
            <span style={{ fontSize: "clamp(40px, 5vw, 80px)", fontWeight: 700, color: "#1d1d1f", lineHeight: 1 }}>
              Renault
            </span>
            <span style={{ fontSize: "clamp(24px, 3vw, 50px)", fontWeight: 500, color: "#1d1d1f", lineHeight: 1.15 }}>
              App Extension
            </span>
          </div>

          {/* Bouton Back to projects */}
          <button
            onClick={() => router.push("/projects")}
            className="flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-200 hover:opacity-85 active:scale-95"
            style={{ backgroundColor: "#1d1d1f" }}
          >
            <span style={{ fontSize: "clamp(14px, 1.2vw, 22px)", fontWeight: 500, color: "#efdf00" }}>
              Back to projects
            </span>
            <ArrowRight />
          </button>
        </div>
      </footer>
    </main>
  );
}
