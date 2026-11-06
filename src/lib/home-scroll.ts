/** Discrete home navigation, with native escape paths for zoom and long content. */
export function setupHomeScroll() {
  let busy=false, consumed=false, delta=0, touchY:number|null=null, menuOpen=false;
  let releaseTimer=0, gestureTimer=0;
  const root=document.documentElement;
  root.setAttribute("data-home-snap","true");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  const targets=()=>{
    const intro=document.querySelector<HTMLElement>('[data-section="personal-intro"]');
    return [0,intro ? intro.getBoundingClientRect().top+window.scrollY : innerHeight,Math.max(0,root.scrollHeight-innerHeight)];
  };
  function canStep(target:EventTarget|null) {
    const intro=document.querySelector<HTMLElement>('[data-section="personal-intro"]');
    const element=target instanceof Element ? target : null;
    return !menuOpen && (window.visualViewport?.scale || 1)<=1.01
      && !!intro && intro.offsetHeight<=innerHeight+4
      && !element?.closest('input,textarea,select,[contenteditable="true"],[role="dialog"],[role="listbox"]')
      && !document.querySelector('header [aria-expanded="true"]');
  }
  function go(direction:number,absolute?:number) {
    if(busy) return;
    const points=targets();
    const nearest=points.reduce((best,y,index)=>Math.abs(y-scrollY)<Math.abs(points[best]-scrollY) ? index : best,0);
    const index=absolute ?? Math.max(0,Math.min(2,nearest+direction));
    if(Math.abs(points[index]-scrollY)<2) return;
    busy=true;
    window.scrollTo({top:points[index],behavior:reduced.matches ? "instant" : "smooth"});
    clearTimeout(releaseTimer);
    releaseTimer=window.setTimeout(()=>{busy=false;},reduced.matches ? 40 : 700);
  }
  function wheel(event:WheelEvent) {
    if(event.ctrlKey || event.metaKey || Math.abs(event.deltaX)>Math.abs(event.deltaY) || !canStep(event.target)) return;
    event.preventDefault();
    clearTimeout(gestureTimer);
    gestureTimer=window.setTimeout(()=>{consumed=false;delta=0;},200);
    if(busy || consumed) return;
    delta+=event.deltaY*(event.deltaMode===1 ? 16 : event.deltaMode===2 ? innerHeight : 1);
    if(Math.abs(delta)<24) return;
    consumed=true; go(Math.sign(delta));
  }
  function key(event:KeyboardEvent) {
    if(event.altKey || event.ctrlKey || event.metaKey || !canStep(event.target)) return;
    if(event.target instanceof Element && event.target.closest('a,button,[role="button"]')) return;
    const dir=event.key==="ArrowDown" || event.key==="PageDown" || (event.key===" " && !event.shiftKey) ? 1 : event.key==="ArrowUp" || event.key==="PageUp" || (event.key===" " && event.shiftKey) ? -1 : 0;
    if(!dir && event.key!=="Home" && event.key!=="End") return;
    event.preventDefault(); go(dir,event.key==="Home" ? 0 : event.key==="End" ? 2 : undefined);
  }
  function touchStart(event:TouchEvent) {
    consumed=false;
    touchY=event.touches.length===1 && canStep(event.target) ? event.touches[0].clientY : null;
  }
  function touchMove(event:TouchEvent) {
    if(touchY===null || event.touches.length!==1 || !canStep(event.target)) return;
    const distance=touchY-event.touches[0].clientY;
    if(Math.abs(distance)<12) return;
    event.preventDefault();
    if(!consumed && Math.abs(distance)>40) { consumed=true;go(Math.sign(distance)); }
  }
  const menu=(event:Event)=>{menuOpen=Boolean((event as CustomEvent<boolean>).detail);};
  window.addEventListener("wheel",wheel,{passive:false});
  window.addEventListener("keydown",key);
  window.addEventListener("touchstart",touchStart,{passive:true});
  window.addEventListener("touchmove",touchMove,{passive:false});
  window.addEventListener("menuStateChange",menu);
  return ()=>{
    root.removeAttribute("data-home-snap");
    clearTimeout(releaseTimer);clearTimeout(gestureTimer);
    window.removeEventListener("wheel",wheel);window.removeEventListener("keydown",key);
    window.removeEventListener("touchstart",touchStart);window.removeEventListener("touchmove",touchMove);
    window.removeEventListener("menuStateChange",menu);
  };
}
