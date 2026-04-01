"use client";

import { useRouter } from "next/navigation";

const BASE = "/projects/googleonios";

function Section({ children, dark = false, noPad = false }: { children: React.ReactNode; dark?: boolean; noPad?: boolean }) {
  return (
    <div className={`w-full ${dark ? "bg-[#1D1D1F]" : "bg-[#F5F5F5]"} ${noPad ? "" : "px-4 md:px-8 lg:px-16 xl:px-[calc((100%-1257px)/2)]"}`}>
      {children}
    </div>
  );
}

function ImageCard({ src, alt, rounded = true }: { src: string; alt: string; rounded?: boolean }) {
  return (
    <div className={`w-full overflow-hidden ${rounded ? "rounded-[14px] border border-[#E5E5E5] bg-white" : ""}`}>
      <img src={src} alt={alt} className="w-full h-auto block" draggable={false} />
    </div>
  );
}

function Grid2({ left, right }: { left: string; right: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5 w-full">
      <ImageCard src={left} alt="section" />
      <ImageCard src={right} alt="section" />
    </div>
  );
}

export default function GoogleOnIOSPage() {
  const router = useRouter();

  return (
    <main className="w-full h-screen overflow-y-auto overflow-x-hidden bg-[#F5F5F5]" style={{ scrollBehavior: "smooth" }}>

      {/* ── HERO: full bleed ── */}
      <div className="w-full overflow-hidden">
        <img src={`${BASE}/s01_hero.png`} alt="Google Play on iOS hero" className="w-full h-auto block" draggable={false} />
      </div>

      {/* ── DMA CONTEXT ── */}
      <Section>
        <div className="py-16 md:py-24 max-w-[1257px] mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] mb-8 leading-snug">
            Alternative distribution on iOS in the EU
          </h2>
          <blockquote className="text-sm md:text-base text-[#424245] leading-relaxed mb-12 max-w-3xl">
            &ldquo;To reflect the DMA&apos;s requirements, users in the EU can install apps from alternative app marketplaces and directly from an authorized developer&apos;s website. After agreeing to the Alternative Terms Addendum for Apps in the EU, developers can access alternative app marketplace distribution in App Store Connect, as well as request access to APIs for Web Distribution and operating an alternative app marketplace.&rdquo;
            <span className="block mt-3 text-[#86868b] text-xs">— Developer.apple.com</span>
          </blockquote>
          <blockquote className="text-sm md:text-base italic text-[#1d1d1f] leading-relaxed max-w-2xl">
            &ldquo;This project explores what Google Play could look like if it were designed specifically for iOS rather than simply adapted from Android.&rdquo;
            <span className="block mt-3 text-[#86868b] text-xs not-italic">— Romain Rubens</span>
          </blockquote>
        </div>
      </Section>

      {/* ── GOOGLE PLAY VISUAL ── */}
      <Section>
        <div className="pb-8 max-w-[1257px] mx-auto">
          <div className="flex justify-end">
            <div className="w-full max-w-[780px] overflow-hidden rounded-[40px]">
              <img src={`${BASE}/s03_gplay_visual.png`} alt="Google Play visual" className="w-full h-auto block" draggable={false} />
            </div>
          </div>
        </div>
      </Section>

      {/* ── CHALLENGE INTRO TEXT ── */}
      <Section>
        <div className="py-12 max-w-[1257px] mx-auto">
          <div className="mb-6 flex justify-center">
            <img src={`${BASE}/s03b_subtitle.png`} alt="subtitle" className="h-auto" style={{ height: "55px" }} draggable={false} />
          </div>
          <p className="text-sm md:text-[15px] text-[#1d1d1f] leading-relaxed max-w-[976px] mx-auto">
            Integrating Google Play into the iOS ecosystem is not a simple porting exercise. Apple&apos;s interfaces are defined by strict conventions: clear hierarchies, restrained visual language, and subtle micro-interactions that create a strong sense of coherence across the system. If an application deviates too far from these conventions, it immediately feels foreign within the platform.
          </p>
        </div>
      </Section>

      {/* ── RULES CARDS – GRID 1 ── */}
      <Section>
        <div className="pb-6 max-w-[1257px] mx-auto space-y-3 md:space-y-5">
          <ImageCard src={`${BASE}/s05_regles_1.png`} alt="Rules 1" />
          <Grid2 left={`${BASE}/s05_regles_2.png`} right={`${BASE}/s05_regles_3.png`} />
          <ImageCard src={`${BASE}/s05_regles_4.png`} alt="Rules 4" />
          <Grid2 left={`${BASE}/s05_regles_5.png`} right={`${BASE}/s05_regles_6.png`} />
        </div>
      </Section>

      {/* ── DESIGN SYSTEM INTRO ── */}
      <Section>
        <div className="py-12 max-w-[1257px] mx-auto">
          <div className="mb-6 flex justify-center">
            <img src={`${BASE}/s06b_subtitle.png`} alt="subtitle" className="h-auto" style={{ height: "55px" }} draggable={false} />
          </div>
          <p className="text-sm md:text-[15px] text-[#1d1d1f] leading-relaxed max-w-[976px] mx-auto">
            The project develops a design system imagining Google Play as a native iOS experience while preserving the identity of Google&apos;s ecosystem. Layout structures, spacing rules, components, and typography were redesigned to align with Apple interface standards. At the same time, elements of the Play Store identity were preserved and adapted to create a credible hybrid experience between two major product cultures.
          </p>
        </div>
      </Section>

      {/* ── GEOMETRIC GOOGLE SECTION – full bleed ── */}
      <div className="w-full overflow-hidden">
        <img src={`${BASE}/s02_geometric.png`} alt="Google geometric shapes" className="w-full h-auto block" draggable={false} />
      </div>

      {/* ── APP STORE COMPARISON CARDS ── */}
      <Section>
        <div className="py-6 max-w-[1257px] mx-auto space-y-3 md:space-y-5">
          <ImageCard src={`${BASE}/s04_regles_a.png`} alt="App Store comparison" />
          <Grid2 left={`${BASE}/s04_regles_b.png`} right={`${BASE}/s04_regles_c.png`} />
          <ImageCard src={`${BASE}/s04_regles_d.png`} alt="Challenge card" />
        </div>
      </Section>

      {/* ── FRAME 14165 ── */}
      <Section>
        <div className="pb-6 max-w-[1257px] mx-auto">
          <ImageCard src={`${BASE}/s06_frame14165.png`} alt="Section content" />
        </div>
      </Section>

      {/* ── LARGE MIDDLE SECTION (app screens / status bars) ── */}
      <Section>
        <div className="pb-6 max-w-[1257px] mx-auto space-y-3 md:space-y-5">
          <ImageCard src={`${BASE}/s07b_statusbar_a.png`} alt="App screens" />
          <ImageCard src={`${BASE}/s07c_frame14169.png`} alt="App screens detail" />
        </div>
      </Section>

      {/* ── DARK DESIGN SYSTEM SECTION ── */}
      <Section dark>
        <div className="py-8 max-w-[1257px] mx-auto space-y-3 md:space-y-5">
          {/* Typography guide */}
          <div className="w-full overflow-hidden rounded-[14px] border border-[#333] bg-[#1D1D1F]">
            <img src={`${BASE}/s08_typography.png`} alt="Typography guide" className="w-full h-auto block" draggable={false} />
          </div>

          {/* Status bars – 2-col grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="overflow-hidden rounded-[14px] border border-[#333] bg-[#1D1D1F]">
              <img src={`${BASE}/s09_statusbar_1.png`} alt="Status bar" className="w-full h-auto block" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[14px] border border-[#333] bg-[#1D1D1F]">
              <img src={`${BASE}/s09_statusbar_5.png`} alt="Status bar" className="w-full h-auto block" draggable={false} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="overflow-hidden rounded-[14px] border border-[#333] bg-[#1D1D1F]">
              <img src={`${BASE}/s09_statusbar_2.png`} alt="Status bar" className="w-full h-auto block" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[14px] border border-[#333] bg-[#1D1D1F]">
              <img src={`${BASE}/s09_statusbar_6.png`} alt="Status bar" className="w-full h-auto block" draggable={false} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="overflow-hidden rounded-[14px] border border-[#333] bg-[#1D1D1F]">
              <img src={`${BASE}/s09_statusbar_3.png`} alt="Status bar" className="w-full h-auto block" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[14px] border border-[#333] bg-[#1D1D1F]">
              <img src={`${BASE}/s09_statusbar_7.png`} alt="Status bar" className="w-full h-auto block" draggable={false} />
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-[14px] border border-[#333] bg-[#1D1D1F]">
            <img src={`${BASE}/s09_statusbar_4.png`} alt="Status bar" className="w-full h-auto block" draggable={false} />
          </div>
        </div>
      </Section>

      {/* ── PHONE MOCKUPS ── */}
      <Section>
        <div className="py-8 max-w-[1257px] mx-auto">
          {/* Title bar */}
          <div className="mb-6 overflow-hidden rounded-[14px]">
            <img src={`${BASE}/s10b_title.png`} alt="Phone mockups section title" className="w-full h-auto block" draggable={false} />
          </div>

          {/* Mockup grid - 2 columns */}
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="overflow-hidden rounded-[20px] bg-[#F5F5F5]">
              <img src={`${BASE}/mock_mkn.png`} alt="Google Play mockup" className="w-full h-auto block" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[20px] bg-[#F5F5F5]">
              <img src={`${BASE}/mock_2.png`} alt="Google Play mockup" className="w-full h-auto block" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[20px] bg-[#F5F5F5]">
              <img src={`${BASE}/mock_1.png`} alt="Google Play mockup" className="w-full h-auto block" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[20px] bg-[#F5F5F5]">
              <img src={`${BASE}/mock_6.png`} alt="Google Play mockup" className="w-full h-auto block" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[20px] bg-[#F5F5F5]">
              <img src={`${BASE}/mock_4.png`} alt="Google Play mockup" className="w-full h-auto block" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[20px] bg-[#F5F5F5]">
              <img src={`${BASE}/mock_5.png`} alt="Google Play mockup" className="w-full h-auto block" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[20px] bg-[#F5F5F5]">
              <img src={`${BASE}/mock_3.png`} alt="Google Play mockup" className="w-full h-auto block" draggable={false} />
            </div>
            <div className="overflow-hidden rounded-[20px] bg-[#F5F5F5]">
              <img src={`${BASE}/mock_7.png`} alt="Google Play mockup" className="w-full h-auto block" draggable={false} />
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <Section>
        <div className="py-16 md:py-24 max-w-[1257px] mx-auto text-center border-t border-[#E5E5E5]">
          <p className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] mb-2">
            Google Play
            <span className="font-normal"> on iOS</span>
          </p>
          <p className="text-sm text-[#86868b] mb-10">Continue exploring</p>
          <button
            onClick={() => router.push("/projects")}
            className="inline-flex items-center gap-2 text-sm text-[#1d1d1f] hover:text-[#0043A6] transition-colors"
          >
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" className="rotate-180">
              <path d="M0.5 1L8.5 7L0.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to projects
          </button>
        </div>
      </Section>

    </main>
  );
}
