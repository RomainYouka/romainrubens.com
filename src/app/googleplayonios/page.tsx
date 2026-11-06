import { Fragment, type CSSProperties } from "react";
import CaseStudy from "./case-study";
import { nativeFigures } from "./native-figures";
import { MobileStory } from "./mobile-story";
import s from "./project.module.css";

const sections = [
  ["92:44646", 1507], ["92:44531", 2953.494], ["92:44588", 1894.747],
  ["92:44597", 1150.511], ["92:48233", 5937.592], ["92:52268", 4298],
  ["92:53305", 4719], ["92:55215", 5483.441], ["92:55955", 1394],
] as const;
const systems: Record<string, {name:string;width:number;height:number;left:number;top:number}> = {
  "92:48233": {name:"typography-system",width:1262,height:5426,left:332.5,top:256},
  "92:52268": {name:"components-a",width:1252.194,height:4006,left:333.903,top:146},
  "92:53305": {name:"components-b",width:1252,height:4207,left:334,top:256},
};
export default function Page() {
  const figures: Record<string, React.ReactNode> = nativeFigures();
  return <CaseStudy>{sections.map(([id, height], index) => {
    const system=systems[id];
    return <Fragment key={id}>{index >= 1 && index <= 3 && <MobileStory section={index === 1 ? "design" : index === 2 ? "context" : "constraints"} />}<section className={`${s.plate} ${id==="92:48233" ? s.foundationPlate : ""} ${["92:44531", "92:44588", "92:44597"].includes(id) ? s.editorial : ""}`} style={{ "--plate-height": height + "px", "--plate-mobile-height": height / 1920 * 100 + "vw" } as CSSProperties}><div className={s.native}>{system ? <img className={s.exportedSystem} src={`/projects/googleplay-ios/exports/${system.name}.webp`} width={system.width} height={system.height} style={{left:system.left,top:system.top,width:system.width}} alt={`Google Play on iOS — ${system.name==="typography-system" ? "Typography, colors and interface foundations" : "Design system component specifications"}`} loading="lazy" decoding="async" /> : figures[id]}</div></section></Fragment>;
  })}</CaseStudy>;
}
