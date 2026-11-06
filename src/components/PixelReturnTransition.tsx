"use client";
import { useEffect,useRef } from "react";
import s from "./pixel-return.module.css";

/** The RGB field unfurls from the actual logo position, not the screen centre. */
export function PixelReturnTransition({leaving,origin}:{leaving:boolean;origin:{x:number;y:number}}) {
  const canvas=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const node=canvas.current,ctx=node?.getContext("2d");
    if(!node || !ctx)return;
    let frame=0,last=0,width=0,height=0;
    const began=performance.now();
    const resize=()=>{width=node.width=innerWidth;height=node.height=innerHeight;};
    const draw=(now:number)=>{
      if(now-last>=1000/30 && !document.hidden){
        last=now;ctx.clearRect(0,0,width,height);
        const t=Math.min(1,(now-began)/1100),progress=1.18*(1-(1-t)**3);
        const radius=Math.hypot(Math.max(origin.x,width-origin.x),Math.max(origin.y,height-origin.y));
        for(let y=0;y<height;y+=12)for(let x=0;x<width;x+=10){
          const dx=x-origin.x,dy=y-origin.y,distance=Math.hypot(dx,dy);
          const curl=Math.sin(Math.atan2(dy,dx)*5-t*8)*30*(1-t);
          const fill=Math.max(0,Math.min(1,(progress*radius-distance+curl)/85));
          if(!fill)continue;
          const unfurl=1-(1-fill)**3;
          const px=origin.x+dx*unfurl,py=origin.y+dy*unfurl-Math.sin(fill*Math.PI)*Math.min(70,distance*.12);
          ctx.fillStyle=`rgba(5,5,7,${fill})`;ctx.fillRect(px,py,11,13);
          const light=(.07+.5*Math.sin(fill*Math.PI)**2)*fill;
          ctx.fillStyle=`rgba(255,65,70,${light})`;ctx.fillRect(px,py+2,2,8);
          ctx.fillStyle=`rgba(65,255,105,${light})`;ctx.fillRect(px+3,py+2,2,8);
          ctx.fillStyle=`rgba(65,115,255,${light})`;ctx.fillRect(px+6,py+2,2,8);
        }
      }
      frame=requestAnimationFrame(draw);
    };
    resize();frame=requestAnimationFrame(draw);window.addEventListener("resize",resize,{passive:true});
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("resize",resize);};
  },[origin]);
  return <div data-page-transition="pixel-genie" data-origin-x={origin.x} data-origin-y={origin.y} aria-hidden="true" className={`${s.overlay} ${leaving ? s.out : ""}`}><canvas ref={canvas}/></div>;
}
