import Frame14204 from "../imports/Frame14204";
import SecondFrame from "../imports/2";

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden">
      <div className="relative w-full" style={{
        maxWidth: '1920px',
        margin: '0 auto',
      }}>
        <div className="relative w-full" style={{
          aspectRatio: '1920 / 3691',
        }}>
          <div className="absolute inset-0 origin-top-left" style={{
            width: '1920px',
            height: '3691px',
            transform: 'scale(var(--scale))',
            ['--scale' as any]: 'min(1, calc(100vw / 1920))',
          }}>
            <Frame14204 />
          </div>
        </div>
        <div className="relative w-full" style={{
          aspectRatio: '1920 / 6143',
        }}>
          <div className="absolute inset-0 origin-top-left" style={{
            width: '1920px',
            height: '6143px',
            transform: 'scale(var(--scale))',
            ['--scale' as any]: 'min(1, calc(100vw / 1920))',
          }}>
            <SecondFrame />
          </div>
        </div>
      </div>
    </div>
  );
}