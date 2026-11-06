"use client";

import { useEffect, useRef } from "react";

/** One decorative canvas: no media downloads, touch handlers or React frame updates. */
export default function DiodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    let width=0, height=0, frame=0, lastFrame=0, inView=true;
    let pointerX=0.5, pointerY=0.5, movingUntil=0, lastPointer=-1000, previousDraw=0;
    let x=0.5, y=0.5;
    let columns=0, energy=new Float32Array(0);
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
        // The head follows exactly; only illuminated cells retain a fading trail.
        x=auto ? x+(targetX-x)*0.12 : targetX;
        y=auto ? y+(targetY-y)*0.12 : targetY;
        const strength=auto ? 0.85 : now-lastPointer<100 ? 1 : 0;
        const radius=Math.min(230,Math.max(140,width*0.21));
        const cx=x*width, cy=y*height;
        const decay=Math.exp(-Math.min(100,now-previousDraw)/480);
        previousDraw=now;
        for(let i=0;i<energy.length;i++) energy[i]*=decay;
        const left=Math.max(0,Math.floor((cx-radius)/stepX)*stepX);
        const top=Math.max(0,Math.floor((cy-radius)/stepY)*stepY);
        for(let py=top;py<Math.min(height,cy+radius);py+=stepY) {
          for(let px=left;px<Math.min(width,cx+radius);px+=stepX) {
            const d=Math.hypot(px-cx,py-cy)/radius;
            if(d>=1) continue;
            const light=(1-d)**2*strength;
            const index=Math.floor(py/stepY)*columns+Math.floor(px/stepX);
            energy[index]=Math.max(energy[index],light);
          }
        }
        for(let row=0;row<Math.ceil(height/stepY);row++) {
          for(let column=0;column<columns;column++) {
            const light=energy[row*columns+column];
            if(light<.012) continue;
            const px=column*stepX, py=row*stepY;
            ctx!.fillStyle=`rgba(255,65,70,${light*0.9})`;
            ctx!.fillRect(px,py+2,2,8);
            ctx!.fillStyle=`rgba(65,255,105,${light*0.9})`;
            ctx!.fillRect(px+3,py+2,2,8);
            ctx!.fillStyle=`rgba(65,115,255,${light*0.9})`;
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
      const cover=Number(getComputedStyle(host!).getPropertyValue("--home-cover")) || 1;
      width=Math.round(host!.clientWidth*cover); height=Math.round(host!.clientHeight*cover);
      columns=Math.ceil(width/stepX);
      energy=new Float32Array(columns*Math.ceil(height/stepY));
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
      lastPointer=performance.now();
      movingUntil=lastPointer+2300;
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
    window.addEventListener("home-screen-resize",resize);
    document.addEventListener("visibilitychange",sync);
    reduced.addEventListener("change",sync); touch.addEventListener("change",sync);
    resize();
    return ()=>{
      cancelAnimationFrame(frame); observer.disconnect(); sizeObserver.disconnect();
      host.removeEventListener("pointermove",pointer);
      window.removeEventListener("home-screen-resize",resize);
      document.removeEventListener("visibilitychange",sync);
      reduced.removeEventListener("change",sync); touch.removeEventListener("change",sync);
    };
  },[]);

  return <canvas ref={canvasRef} aria-hidden="true" data-diode-background className="absolute inset-0 w-full h-full pointer-events-none" />;
}
