import type { CSSProperties } from "react";
import type { Language } from "@/lib/language";
import s from "./SFIcon.module.css";

// Native SVG sizes are preserved; their wrappers provide consistent optical slots.
const dimensions = {
  translate:[51,37], sun:[35,35], moon:[32,32], palette:[39,33],
  "check-circle":[33,33], envelope:[39,28], calendar:[32,30], document:[27,34],
  share:[29,36], "share-fill":[29,36], "share-circle":[33,33],
} as const;
export type SFIconName = keyof typeof dimensions;

export function SFIcon({ name, size=20, onAccent=false, className="" }: {
  name:SFIconName; size?:number; onAccent?:boolean; className?:string;
}) {
  const [width,height] = dimensions[name];
  return <span aria-hidden="true" className={`${s.icon} ${onAccent?s.accent:""} ${className}`} style={{width:size,height:size,"--sf-scale":size/Math.max(width,height)} as CSSProperties}>
    <img className={s.glyph} src={`/icons/sf/${name}.svg`} width={width} height={height} alt="" decoding="async" />
  </span>;
}

const openLabels: Record<Language, string> = { FR:"Accéder", EN:"Open", ՀԱՅ:"Բացել" };

export function CardOpenBadge({ language }: { language: Language }) {
  return <span aria-hidden="true" className={`${s.badge} ${s.open}`}>
    <span className={s.openLabel}>{openLabels[language]}</span>
    <span className={s.openIcon}>
      <img className={s.light} src="/icons/sf/arrow-light.svg" width={31} height={25} alt="" decoding="async" />
      <img className={s.dark} src="/icons/sf/arrow-dark.svg" width={31} height={25} alt="" decoding="async" />
    </span>
  </span>;
}

export function ExternalLinkBadge() {
  return <span aria-hidden="true" className={`${s.badge} ${s.external}`}>
    <img className={s.light} src="/icons/sf/external-light.svg" width={48} height={48} alt="" decoding="async" />
    <img className={s.dark} src="/icons/sf/external-dark.svg" width={48} height={48} alt="" decoding="async" />
  </span>;
}
