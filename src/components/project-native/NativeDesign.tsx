import type { CSSProperties } from "react";
import s from "./native.module.css";

export interface DesignNode {
  style: CSSProperties;
  text?: string;
  trim?: boolean;
  runs?: { text: string; style: CSSProperties }[];
  image?: { src: string; style: CSSProperties };
  svg?: string;
  paths?: { d: string; fill: string; fillRule: string; gradient?: { id: string; stops: { offset: number; color: string }[] } }[];
  children?: DesignNode[];
}

// Server-rendered HTML and vector paths: no screenshot-based UI and no client renderer.
export function NativeDesign({ node }: { node: DesignNode }) {
  if (node.text !== undefined) return <p className={node.trim ? s.trim : undefined} style={node.style}>{node.runs ? node.runs.map((run, i) => <span key={i} style={run.style}>{run.text}</span>) : node.text}</p>;
  return <div style={node.style}>
    {node.svg && <img src={node.svg} width={Number(node.style.width)} height={Number(node.style.height)} style={{ display: "block", maxWidth: "none" }} alt="" loading="lazy" decoding="async" />}
    {node.image && <img src={node.image.src} style={node.image.style} alt="" loading="lazy" decoding="async" />}
    {!!node.paths?.length && <svg width={Number(node.style.width)} height={Number(node.style.height)} viewBox={`0 0 ${node.style.width} ${node.style.height}`} style={{ position: "absolute", overflow: "visible" }} aria-hidden="true"><defs>{node.paths.filter(p => p.gradient).map((p, i) => <linearGradient key={i} id={p.gradient!.id} x1="0" y1="0" x2="0" y2="1">{p.gradient!.stops.map((stop, j) => <stop key={j} offset={stop.offset} stopColor={stop.color} />)}</linearGradient>)}</defs>{node.paths.map((p, i) => <path key={i} d={p.d} fill={p.fill} fillRule={p.fillRule as "evenodd" | "nonzero"} />)}</svg>}
    {node.children?.map((child, i) => <NativeDesign key={i} node={child} />)}
  </div>;
}
