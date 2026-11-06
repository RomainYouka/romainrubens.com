"use client";

import { useEffect, useRef } from "react";
import s from "./spiral-transition.module.css";

/** A short RGB matrix sweep, seamlessly returning to the home pixel scene. */
export function PixelReturnTransition({ leaving }: { leaving: boolean }) {
  const canvas=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const element=canvas.current,ctx=element?.getContext("2d",{alpha:false});
    if(!element || !ctx) return;
    let width=0,height=0,frame=0,last=0;
    const start=performance.now();
    const resize=()=>{width=element.width=innerWidth;height=element.height=innerHeight;};
    const draw=(now:number)=>{
      if(now-last>=1000/30 && !document.hidden) {
        last=now;
        const t=(now-start)/1000,front=Math.min(1.5,t*1.35);
        ctx.fillStyle="#050507";ctx.fillRect(0,0,width,height);
        for(let y=0;y<height;y+=12) for(let x=0;x<width;x+=10) {
          const distance=x/width+y/height*.3-front;
          const light=.045+.85*Math.exp(-distance*distance/ .025);
          ctx.fillStyle=`rgba(255,65,70,${light})`;ctx.fillRect(x,y+2,2,8);
          ctx.fillStyle=`rgba(65,255,105,${light})`;ctx.fillRect(x+3,y+2,2,8);
          ctx.fillStyle=`rgba(65,115,255,${light})`;ctx.fillRect(x+6,y+2,2,8);
        }
      }
      frame=requestAnimationFrame(draw);
    };
    resize();frame=requestAnimationFrame(draw);window.addEventListener("resize",resize,{passive:true});
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("resize",resize);};
  },[]);
  return <div data-page-transition="pixels" aria-hidden="true" className={`${s.pixelReturn} ${leaving?s.pixelOut:""}`}><canvas ref={canvas}/></div>;
}
