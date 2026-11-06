"use client";
import { useEffect, useRef } from "react";

// An original, lightly dithered colour field. No image, WebGL or external script.
export function ContactField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current, host = canvas?.parentElement, ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)");
    const colors = ["255,65,70", "65,235,105", "65,115,255"];
    let width = 0, height = 0, frame = 0, lastFrame = 0, inView = true, px = -1000, py = -1000;
    let lastX=-1000, lastY=-1000, lastDraw=0, columns=0, glow=new Float32Array(0);
    function draw(now: number) {
      if (!width || !height) return;
      ctx!.clearRect(0, 0, width, height);
      const cell = width < 768 ? 16 : 24, time = reduced.matches ? 0 : now / 1000;
      const automatic=mobile.matches || px<0;
      const cx=automatic ? width*(.5+.34*Math.sin(time*.66)) : px;
      const cy=automatic ? height*(.5+.29*Math.sin(time*.84+.8)) : py;
      const sx=lastX<0 ? cx : lastX, sy=lastY<0 ? cy : lastY;
      const vx=cx-sx, vy=cy-sy, length=vx*vx+vy*vy;
      const active=!reduced.matches && cx>=0 && cy>=0;
      const decay=Math.exp(-Math.min(200,now-lastDraw)/700);
      lastDraw=now;
      for (let y = 0; y < height; y += cell) for (let x = 0; x < width; x += cell) {
        const nx = x / width - .5, ny = y / height - .5;
        const seed = Math.sin(x * .127 + y * .311) * 43758.5453;
        const noise = seed - Math.floor(seed);
        const edge = Math.max(Math.abs(nx) * 1.55, Math.abs(ny) * 1.2);
        const wave = Math.sin(nx * 8 + ny * 5 + time * .42) * .16 + Math.sin(ny * 9 - time * .34) * .09;
        const distance = Math.min(1, Math.hypot(nx, ny * .9) / .6);
        const quiet = .55 + .45 * distance ** 1.3;
        const along=length ? Math.max(0,Math.min(1,((x-sx)*vx+(y-sy)*vy)/length)) : 1;
        const d2=((x-sx-vx*along)**2+(y-sy-vy*along)**2)/(180*180);
        const index=Math.floor(y/cell)*columns+Math.floor(x/cell);
        glow[index]=Math.max(glow[index]*decay,active ? Math.exp(-d2*3.5)*(.6+.4*along) : 0);
        const strength = (.75 + .25 * Math.max(0, Math.min(1, (edge - .3 + wave + noise * .1) * 2.8))) * quiet;
        const alpha = Math.min(.42,strength*.38+glow[index]*.52);
        for (let stripe = 0; stripe < 3; stripe++) {
          ctx!.fillStyle = `rgba(${colors[stripe]},${alpha})`;
          const left = x + stripe * cell / 3, stripeWidth = cell / 3 - .7;
          if (noise > .66) {
            for (let dy = 1; dy < cell; dy += 4) for (let dx = .7; dx < stripeWidth; dx += 3) ctx!.fillRect(left + dx, y + dy, 1.1, 1.3);
          } else ctx!.fillRect(left, y, stripeWidth, cell);
        }
      }
      lastX=cx; lastY=cy;
    }
    function tick(now: number) {
      frame = 0;
      if (!inView || document.hidden || reduced.matches) return;
      if (now - lastFrame > 1000 / (mobile.matches ? 18 : 24)) { draw(now); lastFrame = now; }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame); frame = 0;
      draw(performance.now());
      if (inView && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    }
    function resize() { width = canvas!.width = Math.round(host!.clientWidth); height = canvas!.height = Math.round(host!.clientHeight); const cell=width<768 ? 16 : 24; columns=Math.ceil(width/cell); glow=new Float32Array(columns*Math.ceil(height/cell)); sync(); }
    function pointer(event: PointerEvent) { if (mobile.matches || reduced.matches) return; const r = host!.getBoundingClientRect(); px = event.clientX - r.left; py = event.clientY - r.top; }
    function leave() { px = py = -1000; }
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    const sizes = new ResizeObserver(resize);
    observer.observe(host); sizes.observe(host);
    host.addEventListener("pointermove", pointer, { passive: true }); host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync); reduced.addEventListener("change", sync);
    resize();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); sizes.disconnect(); host.removeEventListener("pointermove", pointer); host.removeEventListener("pointerleave", leave); document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />;
}
