"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const IntroSplash = dynamic(() => import("@/components/intro-splash"), {
  ssr: false,
  loading: () => null,
});

const LogoLoadingAnimation = dynamic(() => import("@/components/logo-loading-animation"), {
  ssr: false,
  loading: () => null,
});

export default function IntroSplashWrapper() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const introSeen = sessionStorage.getItem("introSeen");
    const comingFromResume = sessionStorage.getItem("comingFromResume");
    
    if (introSeen !== "true" && comingFromResume !== "true") {
      setShowAnimation(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {showAnimation && <LogoLoadingAnimation onAnimationComplete={handleAnimationComplete} />}
      <IntroSplash />
    </>
  );
}
