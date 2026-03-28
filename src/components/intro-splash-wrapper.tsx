"use client";

import dynamic from "next/dynamic";

const IntroSplash = dynamic(() => import("@/components/intro-splash"), {
  ssr: false,
  loading: () => null,
});

export default function IntroSplashWrapper() {
  return <IntroSplash />;
}
