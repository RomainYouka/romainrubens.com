"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// An original, lightly dithered colour field. No image, WebGL or external script.
export function ContactField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, accentColor } = useTheme();
  useEffect(() => {
    const canvas = canvasRef.current, host = canvas?.parentElement, ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(hover: none), (pointer: coarse)");
    const monochrome = theme === "dark" ? "245,245,245" : "29,29,31";
    const colors = accentColor === "mono" ? [monochrome, monochrome, monochrome] : ["255,65,70", "65,235,105", "65,115,255"];
    let width = 0, height = 0, frame = 0, lastFrame = 0, inView = true, px = -1000, py = -1000;
    function draw(now: number) {
      if (!width || !height) return;
      ctx!.clearRect(0, 0, width, height);
      const cell = width < 768 ? 16 : 24, time = reduced.matches ? 0 : now / 1000;
      for (let y = 0; y < height; y += cell) for (let x = 0; x < width; x += cell) {
        const nx = x / width - .5, ny = y / height - .5;
        const seed = Math.sin(x * .127 + y * .311) * 43758.5453;
        const noise = seed - Math.floor(seed);
        const edge = Math.max(Math.abs(nx) * 1.55, Math.abs(ny) * 1.2);
        const wave = Math.sin(nx * 8 + ny * 5 + time * .16) * .095 + Math.sin(ny * 9 - time * .11) * .05;
        const quiet = Math.max(0, Math.min(1, (Math.hypot(nx, ny * .9) - .19) * 4));
        const pointer = reduced.matches ? 0 : Math.max(0, 1 - Math.hypot(x - px, y - py) / 160) * .12;
        const strength = Math.max(0, Math.min(1, (edge - .3 + wave + noise * .1 + pointer) * 2.8)) * quiet;
        if (strength < .04) continue;
        const alpha = Math.round(strength * 5) / 5 * (theme === "dark" ? .28 : .26);
        for (let stripe = 0; stripe < 3; stripe++) {
          ctx!.fillStyle = `rgba(${colors[stripe]},${alpha})`;
          const left = x + stripe * cell / 3, stripeWidth = cell / 3 - .7;
          if (noise > .66) {
            for (let dy = 1; dy < cell; dy += 4) for (let dx = .7; dx < stripeWidth; dx += 3) ctx!.fillRect(left + dx, y + dy, 1.1, 1.3);
          } else ctx!.fillRect(left, y, stripeWidth, cell);
        }
      }
    }
    function tick(now: number) {
      frame = 0;
      if (!inView || document.hidden || reduced.matches) return;
      if (now - lastFrame > 1000 / (mobile.matches ? 12 : 18)) { draw(now); lastFrame = now; }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame); frame = 0;
      draw(performance.now());
      if (inView && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    }
    function resize() { width = canvas!.width = Math.round(host!.clientWidth); height = canvas!.height = Math.round(host!.clientHeight); sync(); }
    function pointer(event: PointerEvent) { if (mobile.matches || reduced.matches) return; const r = host!.getBoundingClientRect(); px = event.clientX - r.left; py = event.clientY - r.top; }
    function leave() { px = py = -1000; }
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    const sizes = new ResizeObserver(resize);
    observer.observe(host); sizes.observe(host);
    host.addEventListener("pointermove", pointer, { passive: true }); host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync); reduced.addEventListener("change", sync);
    resize();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); sizes.disconnect(); host.removeEventListener("pointermove", pointer); host.removeEventListener("pointerleave", leave); document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync); };
  }, [theme, accentColor]);
  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />;
}
