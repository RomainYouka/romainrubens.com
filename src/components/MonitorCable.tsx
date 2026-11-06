"use client";

import { useRef, useEffect, useState, type PointerEvent, type KeyboardEvent } from "react";
import s from "./home-scroll-scene.module.css";

// Both ends stay concealed: the display hides the attachment and the other end
// extends beyond the viewport even at the maximum drag distance.
const curve = (x: number, y: number) => `M480 -160 C${480+x*.15} -55 ${438+x*.4} ${20+y*.25} ${380+x*.6} ${35+y*.4} C${240+x} ${55+y*.7} ${100+x} ${65+y} ${-1100+x} ${65+y}`;
const phoneCurve = (x:number,y:number) => `M500 -10L500 36 C500 ${59+y*.1} ${480+x*.1} ${72+y*.2} ${430+x*.3} ${80+y*.4} C${300+x} ${92+y*.7} ${100+x} ${95+y} ${-1100+x} ${95+y}`;
const constrain=(x:number,y:number,mobile:boolean)=>({x:Math.max(mobile ? -90 : -420,Math.min(mobile ? 90 : 420,x)),y:Math.max(mobile ? -16 : -65,Math.min(mobile ? 6 : 10,y))});
const languageCodes: Record<string,string> = {FR:"fr",EN:"en",ՀԱՅ:"hy"};

/** Anchored behind the display. Geometry changes only while grabbed or via keys. */
export default function MonitorCable() {
  const svg = useRef<SVGSVGElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const offset = useRef({ x:420, y:10 });
  const grab = useRef<{ id:number; x:number; y:number; dx:number; dy:number } | null>(null);
  const frame = useRef(0);
  const mobile = useRef(false);
  const [value,setValue] = useState(420);
  const [language,setLanguage] = useState("en");
  useEffect(() => {
    const sync = (event?: Event) => { const language=(event as CustomEvent<string> | undefined)?.detail; setLanguage(language ? (languageCodes[language] || "en") : document.documentElement.lang); };
    sync(); window.addEventListener("languageChange",sync);
    const media=matchMedia("(max-width:767px)");
    const device=()=>{mobile.current=media.matches;offset.current=mobile.current ? {x:0,y:0} : {x:420,y:10};setValue(offset.current.x);for(const path of paths.current)path?.setAttribute("d",(mobile.current ? phoneCurve : curve)(offset.current.x,offset.current.y));};
    device(); media.addEventListener("change",device);
    return () => { cancelAnimationFrame(frame.current); window.removeEventListener("languageChange",sync); media.removeEventListener("change",device); };
  }, []);
  const paint = () => {
    frame.current=0;
    for(const path of paths.current) path?.setAttribute("d",(mobile.current ? phoneCurve : curve)(offset.current.x,offset.current.y));
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
    offset.current=constrain(start.dx+(event.clientX-start.x)/rect.width*1000,start.dy+(event.clientY-start.y)/rect.height*180,mobile.current);
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
    if(event.key==="Home" || event.key==="Escape") offset.current=mobile.current ? {x:0,y:0} : {x:420,y:10};
    else offset.current=constrain(offset.current.x+(event.key==="ArrowLeft" ? -20 : event.key==="ArrowRight" ? 20 : 0),offset.current.y+(event.key==="ArrowUp" ? -8 : event.key==="ArrowDown" ? 8 : 0),mobile.current);
    schedule(); setValue(Math.round(offset.current.x));
  };
  const label=language==="fr" ? "Déplacer le câble : flèches du clavier, touche Début pour réinitialiser" : language==="hy" ? "Տեղափոխել մալուխը՝ սլաքներով, Home՝ վերակայելու համար" : "Move power cable: arrow keys, Home to reset";
  return <svg ref={svg} className={s.cables} data-monitor-cable viewBox="0 0 1000 180" preserveAspectRatio="none" fill="none" role="slider" tabIndex={0} aria-label={label} aria-valuemin={-420} aria-valuemax={420} aria-valuenow={value} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onLostPointerCapture={()=>{grab.current=null;}} onKeyDown={key}>
    <defs><pattern id="home-usb-braid" width="8" height="5" patternUnits="userSpaceOnUse"><path d="M-2 5L3 0M2 5L7 0M6 5L11 0" stroke="#39393e" strokeWidth=".65"/><path d="M-2 0L3 5M2 0L7 5M6 0L11 5" stroke="#08080a" strokeWidth=".65"/></pattern></defs>
    <defs><linearGradient id="usb-shell"><stop stopColor="#111113"/><stop offset=".18" stopColor="#3e3e42"/><stop offset=".6" stopColor="#242427"/><stop offset="1" stopColor="#09090b"/></linearGradient></defs>
    <path ref={node=>{paths.current[0]=node;}} className={s.cableMain} d={curve(420,10)} stroke="var(--cable-color,#09090b)" strokeWidth="5.5" strokeLinecap="round" />
    <path ref={node=>{paths.current[1]=node;}} className={s.cableHighlight} d={curve(420,10)} stroke="#515158" strokeOpacity=".5" strokeWidth=".8" />
    <path ref={node=>{paths.current[3]=node;}} className={s.braid} d={curve(420,10)} stroke="url(#home-usb-braid)" strokeWidth="4.5" />
    <g className={s.usbPlug}><rect x="488" y="-10" width="24" height="11" rx="2.5" fill="#b9bab9" stroke="#777b7c" strokeWidth="1"/><rect x="484" y="-2" width="32" height="28" rx="4.5" fill="url(#usb-shell)" stroke="#151518" strokeWidth=".8"/><path d="M491 25L493 36Q500 38 507 36L509 25" fill="url(#usb-shell)"/></g>
    <path ref={node=>{paths.current[2]=node;}} className={s.cableHit} d={curve(420,10)} stroke="transparent" strokeWidth="26" />
  </svg>;
}
