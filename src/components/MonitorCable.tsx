"use client";

import { useRef, useEffect, useState, type PointerEvent, type KeyboardEvent } from "react";
import s from "./home-scroll-scene.module.css";

// Both ends stay concealed: the display hides the attachment and the other end
// extends beyond the viewport even at the maximum drag distance.
const curve = (x: number, y: number) => `M480 -160 C${480+x*.15} -55 ${438+x*.4} ${20+y*.25} ${380+x*.6} ${35+y*.4} C${240+x} ${55+y*.7} ${100+x} ${65+y} ${-1100+x} ${65+y}`;
const languageCodes: Record<string,string> = {FR:"fr",EN:"en",ՀԱՅ:"hy"};

/** Anchored behind the display. Geometry changes only while grabbed or via keys. */
export default function MonitorCable() {
  const svg = useRef<SVGSVGElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const offset = useRef({ x:0, y:0 });
  const grab = useRef<{ id:number; x:number; y:number; dx:number; dy:number } | null>(null);
  const frame = useRef(0);
  const [value,setValue] = useState(0);
  const [language,setLanguage] = useState("en");
  useEffect(() => {
    const sync = (event?: Event) => { const language=(event as CustomEvent<string> | undefined)?.detail; setLanguage(language ? (languageCodes[language] || "en") : document.documentElement.lang); };
    sync(); window.addEventListener("languageChange",sync);
    return () => { cancelAnimationFrame(frame.current); window.removeEventListener("languageChange",sync); };
  }, []);
  const paint = () => {
    frame.current=0;
    for(const path of paths.current) path?.setAttribute("d",curve(offset.current.x,offset.current.y));
  };
  const schedule = () => { if(!frame.current) frame.current=requestAnimationFrame(paint); };
  const down = (event:PointerEvent<SVGSVGElement>) => {
    if(event.button!==0) return;
    event.preventDefault();
    grab.current={id:event.pointerId,x:event.clientX,y:event.clientY,dx:offset.current.x,dy:offset.current.y};
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event:PointerEvent<SVGSVGElement>) => {
    const start=grab.current;
    if(!start || start.id!==event.pointerId || !svg.current) return;
    const rect=svg.current.getBoundingClientRect();
    offset.current={x:Math.max(-420,Math.min(420,start.dx+(event.clientX-start.x)/rect.width*1000)),y:Math.max(-65,Math.min(10,start.dy+(event.clientY-start.y)/rect.height*180))};
    schedule();
  };
  const up = (event:PointerEvent<SVGSVGElement>) => {
    if(grab.current?.id!==event.pointerId) return;
    grab.current=null; setValue(Math.round(offset.current.x));
    if(event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const key = (event:KeyboardEvent<SVGSVGElement>) => {
    if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","Escape"].includes(event.key)) return;
    event.preventDefault();
    if(event.key==="Home" || event.key==="Escape") offset.current={x:0,y:0};
    else offset.current={x:Math.max(-420,Math.min(420,offset.current.x+(event.key==="ArrowLeft" ? -20 : event.key==="ArrowRight" ? 20 : 0))),y:Math.max(-65,Math.min(10,offset.current.y+(event.key==="ArrowUp" ? -16 : event.key==="ArrowDown" ? 16 : 0)))};
    schedule(); setValue(Math.round(offset.current.x));
  };
  const label=language==="fr" ? "Déplacer le câble : flèches du clavier, touche Début pour réinitialiser" : language==="hy" ? "Տեղափոխել մալուխը՝ սլաքներով, Home՝ վերակայելու համար" : "Move power cable: arrow keys, Home to reset";
  return <svg ref={svg} className={s.cables} data-monitor-cable viewBox="0 0 1000 180" preserveAspectRatio="none" fill="none" role="slider" tabIndex={0} aria-label={label} aria-valuemin={-420} aria-valuemax={420} aria-valuenow={value} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onLostPointerCapture={()=>{grab.current=null;}} onKeyDown={key}>
    <path ref={node=>{paths.current[0]=node;}} d={curve(0,0)} stroke="#09090b" strokeWidth="5.5" strokeLinecap="round" />
    <path ref={node=>{paths.current[1]=node;}} d={curve(0,0)} stroke="#515158" strokeOpacity=".5" strokeWidth=".8" />
    <path ref={node=>{paths.current[2]=node;}} className={s.cableHit} d={curve(0,0)} stroke="transparent" strokeWidth="26" />
  </svg>;
}
