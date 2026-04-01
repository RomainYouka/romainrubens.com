"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

// Image asset IDs from Figma export
const IMAGES = {
  iphone1: "/projects/googleonios/99ebb5a7e3ca3310f578e11355d6d0ac74d145fb.png",
  iphone2: "/projects/googleonios/77d58f8c4b47ff7a7972f17b6a0c48b3678fd883.png",
  googlePlayLogo: "/projects/googleonios/153f4691345afae3a40df88642b790f5958f1852.png",
  iphone3: "/projects/googleonios/12d108cede54b8a2fc6c471f08c5a8e615abf599.png",
  iphone4: "/projects/googleonios/facd0855071c1a89a2b57e6b2e78649c8cb4b66b.png",
  iphone5: "/projects/googleonios/007ca1184ca672ccb47b89e06d574009b38befad.png",
};

export default function GoogleOnIOSPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-[#007f55] overflow-hidden">
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          {/* Decorative shapes background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#FBBC04] rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#EB4335] rounded-full opacity-20"></div>
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[#34A853] rounded-full opacity-15"></div>
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#CFFFD9] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#007f55]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
              <p className="text-[#CFFFD9] font-medium text-sm sm:text-base">Introducing</p>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-8">
              <span>Google Play</span>
              <br className="hidden sm:block" />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-medium">on iOS</span>
            </h1>

            <p className="text-[#CFFFD9] text-sm sm:text-base lg:text-lg font-medium mb-8 sm:mb-12 opacity-90">
              A redesign exploring what Google Play could look like on Apple's ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="w-full bg-white py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#007f55] mb-6 sm:mb-8">
            Alternative distribution on iOS in the EU
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg text-[#676767] leading-relaxed">
              <span className="font-semibold text-[#007f55]">"To reflect the DMA's requirements,</span>
              <span> users in the EU can install apps from alternative app marketplaces and directly from an authorized developer's website. After agreeing to the Alternative Terms Addendum for Apps in the EU, </span>
              <span className="font-semibold text-[#007f55]">developers can access alternative app marketplace distribution in App Store Connect</span>
              <span>, as well as request access to APIs for Web Distribution and operating an alternative app marketplace."</span>
            </p>
            <p className="text-sm sm:text-base italic text-[#676767]">— Developer.apple.com</p>
          </div>

          <div className="mt-12 sm:mt-16 bg-[#f5f5f5] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#E5E5E5]">
            <p className="text-lg sm:text-xl lg:text-2xl text-[#676767] italic leading-relaxed">
              <span className="font-semibold text-[#007f55]">"This project explores what Google Play could look like</span>
              <span> if it were designed specifically </span>
              <span className="font-semibold text-[#007f55]">for iOS</span>
              <span> rather than simply adapted from Android."</span>
            </p>
            <p className="text-sm sm:text-base italic text-[#676767] mt-4">— Romain Rubens</p>
          </div>
        </div>
      </section>

      {/* System Design Section */}
      <section className="w-full bg-[#f5f5f5] py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-6 sm:mb-8">
            System Design Approach
          </h2>

          <p className="text-base sm:text-lg text-[#676767] leading-relaxed mb-8 sm:mb-12">
            Integrating Google Play into the iOS ecosystem is not a simple porting exercise. Apple's interfaces are defined by strict conventions: clear hierarchies, restrained visual language, and subtle micro-interactions that create a strong sense of coherence across the system. If an application deviates too far from these conventions, it immediately feels foreign within the platform.
          </p>

          <p className="text-base sm:text-lg text-[#676767] leading-relaxed">
            The project develops a design system imagining Google Play as a native iOS experience while preserving the identity of Google's ecosystem. Layout structures, spacing rules, components, and typography were redesigned to align with Apple interface standards. At the same time, elements of the Play Store identity were preserved and adapted to create a credible hybrid experience between two major product cultures.
          </p>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="w-full bg-white py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-12 sm:mb-16 text-center">
            Interface Exploration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { id: "iphone1", alt: "Google Play on iOS - Screens 1" },
              { id: "iphone2", alt: "Google Play on iOS - Screens 2" },
              { id: "iphone3", alt: "Google Play on iOS - Screens 3" },
              { id: "iphone4", alt: "Google Play on iOS - Screens 4" },
              { id: "iphone5", alt: "Google Play on iOS - Screens 5" },
              { id: "googlePlayLogo", alt: "Google Play Logo" },
            ].map((item) => (
              <div
                key={item.id}
                className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5E5E5] group hover:border-[#007f55] transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <Image
                  src={IMAGES[item.id as keyof typeof IMAGES]}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Rules Section */}
      <section className="w-full bg-white py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-12 sm:mb-16">
            Design Guidelines
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "iOS Elements",
                description: "Status bar and home indicator must be present and in the foreground in each screen. No elements should conflict with them.",
                icon: "📱"
              },
              {
                title: "Safe Zone",
                description: "The red zone corresponds to iPhone contours. It's forbidden to display any elements in this area, except status bar and home indicator.",
                icon: "🚫"
              },
              {
                title: "Typography",
                description: "San Francisco Pro typography system, following Apple's interface guidelines and hierarchy standards.",
                icon: "📝"
              },
              {
                title: "Color System",
                description: "Google Play colors adapted to iOS interface conventions. Maintains brand identity while respecting platform norms.",
                icon: "🎨"
              },
              {
                title: "Spacing",
                description: "Consistent spacing rules following iOS design standards: 8px, 16px, 24px, and 32px increments.",
                icon: "📐"
              },
              {
                title: "Interactions",
                description: "Subtle micro-interactions following iOS conventions: smooth transitions, natural motion, and haptic feedback.",
                icon: "✨"
              }
            ].map((rule, idx) => (
              <div
                key={idx}
                className="bg-[#f5f5f5] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#E5E5E5] hover:border-[#007f55] transition-colors"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{rule.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] mb-3 sm:mb-4">
                  {rule.title}
                </h3>
                <p className="text-sm sm:text-base text-[#676767] leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="w-full bg-white border-t border-[#E5E5E5] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-2">
              Google Play on iOS
            </h3>
            <p className="text-sm sm:text-base text-[#676767]">
              A design exploration by Romain Rubens
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#007f55] text-white hover:bg-[#006644] transition-colors font-medium text-sm sm:text-base w-fit"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to projects
          </Link>
        </div>
      </section>
    </main>
  );
}
