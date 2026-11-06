"use client";
import { startTransition, useEffect, useRef, useState } from "react";
import { NativeDesign, type DesignNode } from "./NativeDesign";

// Large component inventories stay native HTML, but only mount near the viewport.
// Their reserved dimensions are owned by the case-study's outer figure wrapper.
export function LazyNativeFigure({ src }: { src: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<DesignNode>();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => startTransition(() => setVisible(entry.isIntersecting)), { rootMargin: "600px" });
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || node || failed) return;
    const controller = new AbortController();
    fetch(src, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error("Component illustration unavailable");
      return response.json() as Promise<DesignNode>;
    }).then(data => startTransition(() => setNode(data))).catch(error => { if (error.name !== "AbortError") setFailed(true); });
    return () => controller.abort();
  }, [visible, node, failed, src]);
  return <div ref={host} style={{ width: "100%", height: "100%" }}>{visible && node ? <NativeDesign node={node} /> : failed ? <button type="button" aria-label="Reload component illustration" onClick={() => setFailed(false)}>↻</button> : null}</div>;
}
