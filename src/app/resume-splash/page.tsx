"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResumeSplashPage() {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("forceIntroSplash", "true");
    sessionStorage.removeItem("introSeen");
    router.push("/");
  }, [router]);

  return null;
}
