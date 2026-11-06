"use client";
import { usePageTransition } from "@/contexts/PageTransitionContext";
import { ArrowFlightTransition } from "./ArrowFlightTransition";
import { PixelReturnTransition } from "./PixelReturnTransition";
export function PageTransitionOverlay(){
 const {phase,effect,origin}=usePageTransition();
 if(phase==="idle")return null;
 return effect==="flight" ? <ArrowFlightTransition leaving={phase==="out"} origin={origin}/> : <PixelReturnTransition leaving={phase==="out"} origin={origin}/>;
}
