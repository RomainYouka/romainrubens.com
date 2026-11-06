// Static case-study component, implemented from the corresponding Figma design context.
import { SvgAsset } from "@/components/project-native/SvgAsset";
export default function OmiCardDesktop() {
    return (<p className="[word-break:break-word] font-[family-name:var(--font-body)] font-bold leading-[0] not-italic relative size-full text-[17.177px] text-[color:#18181b] whitespace-nowrap" style={{ color: "#18181b", fontSize: "17.177px", fontWeight: 700, lineHeight: "0", fontFamily: "inherit", letterSpacing: "inherit" }}>
      <span className="leading-[22.902px]">{`Icon Button `}</span>
      <span className="font-[family-name:var(--font-body)] font-normal leading-[22.902px]">Desktop</span>
      <span className="leading-[22.902px]">{` `}</span>
      <span className="font-[family-name:var(--font-body)] font-normal leading-[22.902px]">(18 x 18px)</span>
    </p>);
}
