/** One automatic departure per mount; user input permanently takes priority. */
export function setupHomeAutoAdvance(advance: () => void, win: Window = window) {
  const doc = win.document;
  const reduced = win.matchMedia("(prefers-reduced-motion: reduce)");
  let cancelled = win.scrollY > 8 || doc.hidden || reduced.matches;
  let started = false;
  let timer: number | undefined;
  const cancel = () => { cancelled = true; win.clearTimeout(timer); };
  const scroll = () => { if (!started && win.scrollY > 8) cancel(); };
  const key = (event: KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Tab", "Escape"].includes(event.key)) cancel();
  };
  const visibility = () => { if (doc.hidden) cancel(); };
  const preference = () => { if (reduced.matches) cancel(); };
  const inputs = ["wheel", "touchmove", "pointerdown", "lenis-scroll-to-top"] as const;
  inputs.forEach(name => win.addEventListener(name, cancel, { passive: true }));
  win.addEventListener("scroll", scroll, { passive: true });
  win.addEventListener("keydown", key);
  doc.addEventListener("visibilitychange", visibility);
  reduced.addEventListener("change", preference);
  return {
    ready() {
      if (cancelled || started || timer !== undefined) return;
      timer = win.setTimeout(() => {
        if (cancelled || doc.hidden || reduced.matches || win.scrollY > 8) return;
        started = true;
        advance();
      }, 1000);
    },
    dispose() {
      cancel();
      inputs.forEach(name => win.removeEventListener(name, cancel));
      win.removeEventListener("scroll", scroll);
      win.removeEventListener("keydown", key);
      doc.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", preference);
    },
  };
}
