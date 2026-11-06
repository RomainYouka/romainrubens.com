import type { CSSProperties } from "react";
import dimensions from "./assets.json";
import s from "./native.module.css";

// Keep the original exported SVG root dimensions. Scale only its viewport wrapper.
export function SvgAsset({ src, className = "", style }: { src: string; className?: string; alt?: string; style?: CSSProperties }) {
  const size = (dimensions as Record<string, {width: number; height: number}>)[src];
  if (!size) throw new Error("Unknown project SVG: " + src);
  return <span aria-hidden="true" className={`${className} ${s.svg}`} style={{ ...style, "--svg-width": size.width + "px", "--svg-height": size.height + "px" } as CSSProperties}>
    <img src={src} width={size.width} height={size.height} alt="" loading="lazy" decoding="async" />
  </span>;
}
