"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/** One decorative canvas: no media downloads, touch handlers or React frame updates. */
export default function DiodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { accentColor, theme, isHighContrast } = useTheme();

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
    const accent=getComputedStyle(host).getPropertyValue("--theme-accent").trim();
    const hex=/^#[0-9a-f]{6}$/i.test(accent) ? accent.slice(1) : "314DCB";
    const rgb=[0,2,4].map(offset=>parseInt(hex.slice(offset,offset+2),16));
    let width=0, height=0, frame=0, lastFrame=0, inView=true;
    let pointerX=0.5, pointerY=0.5, movingUntil=0;
    let x=0.5, y=0.5;
    // A regular RGB-stripe matrix: three equal, rectangular subpixels per pixel.
    const stepX=10, stepY=12;

    function draw(now:number) {
      if (!width || !height) return;
      ctx!.drawImage(grid,0,0);
      if (!reduced.matches) {
        const auto=touch.matches;
        const t=now/1000;
        const targetX=auto ? 0.5+Math.sin(t*0.27)*0.34 : pointerX;
        const targetY=auto ? 0.5+Math.sin(t*0.39+0.8)*0.29 : pointerY;
        // Desktop follows the actual pointer, without a trailing interpolation.
        x=auto ? x+(targetX-x)*0.12 : targetX;
        y=auto ? y+(targetY-y)*0.12 : targetY;
        const strength=auto ? 0.85 : Math.max(0,Math.min(1,(movingUntil-now)/900));
        const radius=Math.min(230,Math.max(140,width*0.21));
        const cx=x*width, cy=y*height;
        const glow=ctx!.createRadialGradient(cx,cy,0,cx,cy,radius);
        glow.addColorStop(0,`rgba(${rgb.join(",")},${0.13*strength})`);
        glow.addColorStop(1,`rgba(${rgb.join(",")},0)`);
        ctx!.fillStyle=glow;
        ctx!.fillRect(cx-radius,cy-radius,radius*2,radius*2);
        const left=Math.max(0,Math.floor((cx-radius)/stepX)*stepX);
        const top=Math.max(0,Math.floor((cy-radius)/stepY)*stepY);
        for(let py=top;py<Math.min(height,cy+radius);py+=stepY) {
          for(let px=left;px<Math.min(width,cx+radius);px+=stepX) {
            const d=Math.hypot(px-cx,py-cy)/radius;
            if(d>=1) continue;
            const light=(1-d)**2*strength;
            ctx!.fillStyle=`rgba(${rgb.join(",")},${light*0.9})`;
            ctx!.fillRect(px,py+2,2,8);
            ctx!.fillStyle=`rgba(${rgb.join(",")},${light*0.8})`;
            ctx!.fillRect(px+3,py+2,2,8);
            ctx!.fillStyle=`rgba(${rgb.join(",")},${light*0.65})`;
            ctx!.fillRect(px+6,py+2,2,8);
          }
        }
      }
    }

    function tick(now:number) {
      frame=0;
      if (!inView || document.hidden || reduced.matches) return;
      if(!touch.matches || now-lastFrame>=1000/30) { draw(now); lastFrame=now; }
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
      for(let py=0;py<height;py+=stepY) for(let px=0;px<width;px+=stepX) {
        base!.fillStyle="#170b0d"; base!.fillRect(px,py+2,2,8);
        base!.fillStyle="#0b170e"; base!.fillRect(px+3,py+2,2,8);
        base!.fillStyle="#0d101c"; base!.fillRect(px+6,py+2,2,8);
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
  },[accentColor,theme,isHighContrast]);

  return <canvas ref={canvasRef} aria-hidden="true" data-diode-background className="absolute inset-0 w-full h-full pointer-events-none" />;
}
