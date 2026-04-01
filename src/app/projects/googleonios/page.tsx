import Frame9 from "./Frame14204";
import Component from "./2";

export default function GooglePlayOnIOSPage() {
  return (
    <div style={{ "--scale": "min(1, calc(100vw / 1920))" } as React.CSSProperties}>
      <div style={{ width: "1920px", height: "3691px", transform: "scale(var(--scale))", transformOrigin: "0 0" }}>
        <Frame9 />
      </div>
      <div style={{ width: "1920px", height: "6143px", transform: "scale(var(--scale))", transformOrigin: "0 0" }}>
        <Component />
      </div>
    </div>
  );
}
