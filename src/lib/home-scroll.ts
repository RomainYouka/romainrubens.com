/** Sticky scenes use native scrolling, including keyboard, touch, zoom and anchors. */
export function setupHomeScroll() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const go = (top: number) => window.scrollTo({ top, behavior: reduced.matches ? "instant" : "smooth" });
  const toTop = () => go(0);
  const to = (event: Event) => { event.preventDefault(); go((event as CustomEvent<number>).detail); };
  window.addEventListener("lenis-scroll-to-top", toTop);
  window.addEventListener("lenis-scroll-to", to);
  return () => { window.removeEventListener("lenis-scroll-to-top", toTop); window.removeEventListener("lenis-scroll-to", to); };
}
