"use client";

import { useEffect, useRef } from "react";

/** Keep the first frame visible; animate only while the hero can be seen. */
export function ProjectHeroVideo({ className, poster, src }: { className: string; poster: string; src: string }) {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const player = video.current;
    if (!player || !host.current) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false, cancelled = false;
    const sync = () => {
      if (visible && !document.hidden && !motion.matches && !connection?.saveData) {
        void player.play().then(() => { if (cancelled) player.pause(); }).catch(() => { /* The poster is a complete fallback. */ });
      } else player.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(host.current);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { cancelled = true; observer.disconnect(); motion.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); player.pause(); };
  }, []);
  return <div ref={host} className={className} aria-hidden="true">
    <img src={poster} width={1280} height={853} alt="" fetchPriority="high" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <video ref={video} poster={poster} muted playsInline loop preload="none" disablePictureInPicture style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}><source src={src} type="video/webm" /></video>
  </div>;
}
