"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const colors = {
  blue:[100,155,255], pink:[255,95,168], green:[80,226,170],
  orange:[255,166,92], mono:[220,225,235],
} as const;

/** One decorative canvas: no media downloads, touch handlers or React frame updates. */
export default function DiodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { accentColor } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d", { alpha:false });
    if (!canvas || !host || !ctx) return;
    const grid = document.createElement("canvas");
    const base = grid.getContext("2d", { alpha:false });
    if (!base) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const touch = matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)");
    const rgb = colors[accentColor];
    let width=0, height=0, frame=0, lastFrame=0, inView=true;
    let pointerX=0.5, pointerY=0.5, movingUntil=0;
    let x=0.5, y=0.5;
    const step=14;

    function draw(now:number) {
      if (!width || !height) return;
      ctx!.drawImage(grid,0,0);
      if (!reduced.matches) {
        const auto=touch.matches;
        const t=now/1000;
        const targetX=auto ? 0.5+Math.sin(t*0.27)*0.34 : pointerX;
        const targetY=auto ? 0.5+Math.sin(t*0.39+0.8)*0.29 : pointerY;
        x+=(targetX-x)*0.12;
        y+=(targetY-y)*0.12;
        const strength=auto ? 0.85 : Math.max(0,Math.min(1,(movingUntil-now)/900));
        const radius=Math.min(230,Math.max(140,width*0.21));
        const cx=x*width, cy=y*height;
        const glow=ctx!.createRadialGradient(cx,cy,0,cx,cy,radius);
        glow.addColorStop(0,`rgba(${rgb.join(",")},${0.13*strength})`);
        glow.addColorStop(1,`rgba(${rgb.join(",")},0)`);
        ctx!.fillStyle=glow;
        ctx!.fillRect(cx-radius,cy-radius,radius*2,radius*2);
        const left=Math.max(0,Math.floor((cx-radius)/step)*step);
        const top=Math.max(0,Math.floor((cy-radius)/step)*step);
        for(let py=top;py<Math.min(height,cy+radius);py+=step) {
          for(let px=left;px<Math.min(width,cx+radius);px+=step) {
            const d=Math.hypot(px-cx,py-cy)/radius;
            if(d>=1) continue;
            const light=(1-d)**2*strength;
            ctx!.fillStyle=`rgba(${rgb.join(",")},${light*0.9})`;
            ctx!.fillRect(px+2,py+3,2,6);
            ctx!.fillStyle=`rgba(210,232,255,${light*0.8})`;
            ctx!.fillRect(px+6,py+1,2,6);
            ctx!.fillStyle=`rgba(${rgb.join(",")},${light*0.65})`;
            ctx!.fillRect(px+10,py+5,2,6);
          }
        }
      }
    }

    function tick(now:number) {
      frame=0;
      if (!inView || document.hidden || reduced.matches) return;
      if(now-lastFrame>=1000/30) { draw(now); lastFrame=now; }
      if(touch.matches || now<movingUntil) frame=requestAnimationFrame(tick);
    }
    function start() {
      if(frame || !inView || document.hidden || reduced.matches) return;
      frame=requestAnimationFrame(tick);
    }
    function resize() {
      width=Math.round(host!.clientWidth); height=Math.round(host!.clientHeight);
      // CSS-pixel resolution is enough for the intentionally granular pattern.
      canvas!.width=grid.width=width; canvas!.height=grid.height=height;
      base!.fillStyle="#050507"; base!.fillRect(0,0,width,height);
      for(let py=0;py<height;py+=step) for(let px=0;px<width;px+=step) {
        base!.fillStyle="#17171d"; base!.fillRect(px+2,py+3,2,6);
        base!.fillStyle="#1b1d20"; base!.fillRect(px+6,py+1,2,6);
        base!.fillStyle="#12161b"; base!.fillRect(px+10,py+5,2,6);
      }
      draw(performance.now()); start();
    }
    function pointer(event:PointerEvent) {
      if(event.pointerType==="touch" || reduced.matches || touch.matches) return;
      const rect=host!.getBoundingClientRect();
      pointerX=(event.clientX-rect.left)/rect.width;
      pointerY=(event.clientY-rect.top)/rect.height;
      movingUntil=performance.now()+1800;
      start();
    }
    function sync() {
      cancelAnimationFrame(frame); frame=0;
      if(reduced.matches) draw(performance.now());
      else start();
    }
    const observer=new IntersectionObserver(([entry])=>{ inView=entry.isIntersecting; sync(); },{threshold:0});
    const sizeObserver=new ResizeObserver(resize);
    observer.observe(host); sizeObserver.observe(host);
    host.addEventListener("pointermove",pointer,{passive:true});
    document.addEventListener("visibilitychange",sync);
    reduced.addEventListener("change",sync); touch.addEventListener("change",sync);
    resize();
    return ()=>{
      cancelAnimationFrame(frame); observer.disconnect(); sizeObserver.disconnect();
      host.removeEventListener("pointermove",pointer);
      document.removeEventListener("visibilitychange",sync);
      reduced.removeEventListener("change",sync); touch.removeEventListener("change",sync);
    };
  },[accentColor]);

  return <canvas ref={canvasRef} aria-hidden="true" data-diode-background className="absolute inset-0 w-full h-full pointer-events-none" />;
}
