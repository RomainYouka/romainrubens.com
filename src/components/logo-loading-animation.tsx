"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface LogoLoadingAnimationProps {
  onAnimationComplete: () => void;
}

export default function LogoLoadingAnimation({ onAnimationComplete }: LogoLoadingAnimationProps) {
  const [logoData, setLogoData] = useState<any>(null);

  useEffect(() => {
    fetch("/animations/logo-intro.json")
      .then(res => res.json())
      .then(data => setLogoData(data))
      .catch(() => {
        setTimeout(onAnimationComplete, 2000);
      });
  }, [onAnimationComplete]);

  const handleAnimationComplete = () => {
    setTimeout(onAnimationComplete, 500);
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-white"
      style={{ animation: "fadeOut 0.5s ease-out forwards" }}
    >
      <style>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; pointer-events: none; }
        }
      `}</style>
      
      {logoData && (
        <div className="w-64 h-64">
          <Lottie
            animationData={logoData}
            loop={false}
            onComplete={handleAnimationComplete}
          />
        </div>
      )}
    </div>
  );
}
