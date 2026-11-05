"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ComponentPropsWithoutRef } from "react";

// Preserve native controls and caller refs; do not download/play decorative videos off screen.
export const DeferredVideo = forwardRef<HTMLVideoElement, ComponentPropsWithoutRef<"video">>(
  function DeferredVideo({ autoPlay, preload, src, ...props }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [nearby, setNearby] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useImperativeHandle(ref, () => videoRef.current!, []);

    useEffect(() => {
      const video = videoRef.current;
      if (!video || !autoPlay) return;
      const observer = new IntersectionObserver(([entry]) => {
        setNearby(entry.isIntersecting);
        if (entry.isIntersecting) setLoaded(true);
      }, { rootMargin: "200px" });
      observer.observe(video);
      return () => observer.disconnect();
    }, [autoPlay]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video || !autoPlay) return;
      const syncPlayback = () => {
        if (nearby && !document.hidden) void video.play().catch(() => {});
        else video.pause();
      };
      syncPlayback();
      document.addEventListener("visibilitychange", syncPlayback);
      return () => document.removeEventListener("visibilitychange", syncPlayback);
    }, [autoPlay, nearby, loaded]);

    return <video {...props} ref={videoRef} src={!autoPlay || loaded ? src : undefined}
      autoPlay={Boolean(autoPlay && nearby)} preload={preload === "none" ? "none" : "metadata"} />;
  }
);
