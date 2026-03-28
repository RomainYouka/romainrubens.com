"use client";

import { GooglePlayScroll } from "@/components/projects/google-play-scroll";

export default function GooglePlayiOSPage() {
  const sections = [
    { id: "section-1", image: "/projects/googleplayios/1_1774690432681.png", isCarousel: false },
    { id: "section-2", image: "/projects/googleplayios/2_1774690432681.png", isCarousel: false },
    { id: "section-3", image: "/projects/googleplayios/3_1774690432681.png", isCarousel: true },
    { id: "section-4", image: "/projects/googleplayios/4_1774690432681.png", isCarousel: false },
    { id: "section-5", image: "/projects/googleplayios/5_1774690432681.png", isCarousel: false },
    { id: "section-6", image: "/projects/googleplayios/6_1774690432681.png", isCarousel: false },
    { id: "section-7", image: "/projects/googleplayios/7_1774690432681.png", isCarousel: false },
    { id: "section-8", image: "/projects/googleplayios/8_1774690432681.png", isCarousel: true },
    { id: "section-9", image: "/projects/googleplayios/9_1774690432681.png", isCarousel: false },
    { id: "section-10", image: "/projects/googleplayios/10_1774690432681.png", isCarousel: false },
    { id: "section-11", image: "/projects/googleplayios/11_1774690432681.png", isCarousel: false },
  ];

  return (
    <main className="w-full h-screen bg-white overflow-hidden">
      <GooglePlayScroll sections={sections} />
    </main>
  );
}
