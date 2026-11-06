import { Fragment, type CSSProperties } from "react";
import CaseStudy from "./case-study";
import { nativeFigures } from "./native-figures";
import guides from "./native-guides.json";
import { NativeDesign, type DesignNode } from "@/components/project-native/NativeDesign";
import { MobileStory } from "./mobile-story";
import s from "./project.module.css";

const sections = [
  ["92:44646", 1507], ["92:44531", 2953.494], ["92:44588", 1894.747],
  ["92:44597", 1150.511], ["92:48233", 5937.592], ["92:52268", 4298],
  ["92:53305", 4719], ["92:55215", 5483.441], ["92:55955", 1394],
] as const;
export default function Page() {
  const figures: Record<string, React.ReactNode> = nativeFigures();
  const offline = guides as unknown as Record<string, DesignNode>;
  return <CaseStudy>{sections.map(([id, height], index) => <Fragment key={id}>{index >= 1 && index <= 3 && <MobileStory section={index === 1 ? "design" : index === 2 ? "context" : "constraints"} />}<section className={`${s.plate} ${["92:44531", "92:44588", "92:44597"].includes(id) ? s.editorial : ""}`} style={{ "--plate-height": height + "px", "--plate-mobile-height": height / 1920 * 100 + "vw" } as CSSProperties}><div className={s.native}>{figures[id] || <NativeDesign node={offline[id]} />}</div></section></Fragment>)}</CaseStudy>;
}
