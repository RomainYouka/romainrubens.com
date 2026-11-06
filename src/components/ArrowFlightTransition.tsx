"use client";

import type { CSSProperties } from "react";
import { SFIcon } from "./SFIcon";
import { usePathname } from "next/navigation";
import s from "./arrow-flight.module.css";

/** One composited traveller and a camera move; routes remain separate. */
export function ArrowFlightTransition({ leaving, origin }: { leaving:boolean; origin:{x:number;y:number} }) {
  const pathname=usePathname();
  const width=window.innerWidth,height=window.innerHeight;
  const path=leaving
    ? `M-70 -70 C-20 10 55 65 110 145`
    : `M${origin.x} ${origin.y} C${origin.x+width*.22} ${origin.y-height*.68} ${origin.x+width*.78} ${origin.y-height*.85} ${width*1.45} ${-height*.4}`;
  return <div data-page-transition="flight" data-source={pathname==="/" ? "home" : "destination"} data-phase={leaving ? "out" : "in"} className={`${s.overlay} ${leaving ? s.out : ""}`} aria-hidden="true" style={{"--flight-path":`path('${path}')`} as CSSProperties}>
    {!leaving && pathname==="/" && <span className={s.traveller}><SFIcon name="arrow-light" size={23} onAccent /></span>}
  </div>;
}
