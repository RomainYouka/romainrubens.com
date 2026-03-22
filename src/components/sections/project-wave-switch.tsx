"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward } from "lucide-react";

interface ProjectWaveSwitchProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const translations = {
  EN: {
    title: "Wave Switch & App",
    year: "Designed in 2025",
    paragraph1:
    "WaveSwitch is a touchless, gesture-activated switch. It is designed for a speculative future in 2080, where humans live with medical and aesthetic skin fungi shaped by global transformations. The device uses artificial intelligence to translate movement into action.\n\nBeyond the object itself, the project finds its meaning in the web and mobile interfaces. Users can customize their gestures, see real-time visual feedback and track their interactions as they use the system.",
    paragraph2:
    "This project explores the boundary between tangible objects and interactive systems, where design exists not only as a physical form but also in the relationship between humans and machines.\nThe switch becomes a way to question our connection to gesture, technological mediation and the changing nature of domestic or professional environments.",
    play: "Play",
    pause: "Pause"
  },
  FR: {
    title: "Wave Switch & App",
    year: "Conception en 2025",
    paragraph1:
    "WaveSwitch est un interrupteur sans contact activé par geste. Conçu pour un avenir spéculatif en 2080, où les humains vivent avec des champignons cutanés médicaux et esthétiques nés des transformations mondiales, il s'appuie sur l'intelligence artificielle pour traduire le mouvement en action. Au-delà de l'objet lui-même, son sens réside dans l'interface web et mobile : personnalisation des gestes, retour visuel en temps réel et suivi des interactions.",
    paragraph2:
    "Ce projet explore la frontière entre objets tangibles et systèmes interactifs, où le design existe non seulement sous forme physique mais dans la relation entre l'humain et la machine. L'interrupteur devient un moyen de questionner notre connexion au geste, à la médiation technologique et à l'évolution de l'environnement domestique ou professionnel.",
    play: "Lire",
    pause: "Pause"
  },
  ՀԱՅ: {
    title: "Wave Switch & App",
    year: "Նախագծված 2025-ին",
    paragraph1:
    "WaveSwitch-ը շփում չպահանջող, ժեստով ակտիվացվող անջատիչ է։ Ստեղծված է 2080 թվականի սպեկուլատիվ ապագայի համար, որտեղ մարդիկ ապրում են բժշկական ու գեղագիտական նշանակություն ունեցող մաշկային սնկերի հետ՝ գլոբալ փոփոխությունների հետևանքով առաջացած նոր իրականության մեջ։\nՍարքը հիմնված է արհեստական բանականության վրա, որը շարժումը վերածում է գործողության։\n\nՍակայն WaveSwitch-ի իմաստը միայն առարկայում չէ․ նախագծի էությունը իրեն ընդգրկում է նաև վեբ և շարժական միջերեսները՝ ժեստերի անհատականացում, իրական ժամանակում տեսողական հետադարձ կապ և օգտագործման պատմության հետևում։",
    paragraph2:
    "Այս նախագիծը ուսումնասիրում է շոշափելի առարկաների և ինտերակտիվ համակարգերի սահմանը, որտեղ դիզայնը գոյություն ունի ոչ միայն ֆիզիկական ձևով, այլև մարդու և մեքենայի փոխհարաբերության մեջ։\nԱնջատիչը վերածվում է մի միջոցի, որը հանդես է գալիս որպես հարցադրում՝ մեր կապի մասին ժեստի, տեխնոլոգիական միջնորդման և կենցաղային կամ աշխատանքային միջավայրի զարգացող բնույթի հետ։",
    play: "Նվագարկել",
    pause: "Դադարեցնել"
  }
};

export const ProjectWaveSwitch = ({ language }: ProjectWaveSwitchProps) => {
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoContainer1 = useRef<HTMLDivElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoContainer2 = useRef<HTMLDivElement>(null);

  const t = translations[language];


  useEffect(() => {
    const videoElement1 = videoRef1.current;
    const container1 = videoContainer1.current;

    if (!videoElement1 || !container1) return;

    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            videoElement1.play().catch(() => {});
            setIsPlaying1(true);
          } else {
            videoElement1.pause();
            setIsPlaying1(false);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    observer1.observe(container1);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElement1.pause();
        setIsPlaying1(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer1.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const togglePlayPause1 = () => {
    const videoElement = videoRef1.current;
    if (!videoElement) return;
    
    if (isPlaying1) {
      videoElement.pause();
      setIsPlaying1(false);
    } else {
      videoElement.play().catch(() => {});
      setIsPlaying1(true);
    }
  };

  const skipForward1 = () => {
    const videoElement = videoRef1.current;
    if (!videoElement) return;
    videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
  };

  useEffect(() => {
    const videoElement2 = videoRef2.current;
    const container2 = videoContainer2.current;

    if (!videoElement2 || !container2) return;

    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            videoElement2.play().catch(() => {});
            setIsPlaying2(true);
          } else {
            videoElement2.pause();
            setIsPlaying2(false);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    observer2.observe(container2);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElement2.pause();
        setIsPlaying2(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer2.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const togglePlayPause2 = () => {
    const videoElement = videoRef2.current;
    if (!videoElement) return;
    
    if (isPlaying2) {
      videoElement.pause();
      setIsPlaying2(false);
    } else {
      videoElement.play().catch(() => {});
      setIsPlaying2(true);
    }
  };

  const skipForward2 = () => {
    const videoElement = videoRef2.current;
    if (!videoElement) return;
    videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
  };

  return (
    <section
      id="waveswitch"
      className="w-full bg-white"
      style={{
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
        scrollMarginTop: "80px"
      }}>

      <div className="container max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-16 mb-16 md:mb-24">
          <div
            ref={videoContainer1}
            className="w-full md:w-auto md:flex-shrink-0 mx-auto md:mx-0"
            style={{
              maxWidth: "min(85vw, 400px)"
            }}>

            <div
              style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "clamp(12px, 2vw, 20px)"
              }}>

              <video
                ref={videoRef1}
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/4730AC9B-6273-4BD0-A10F-373F327D9B3B-1762106663715.mp4"
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
                aria-label="Wave Switch app interface demonstration"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block"
                }} />

            </div>

            <div className="flex items-center justify-center gap-3" style={{ marginTop: "-20px", position: "relative", zIndex: 10 }}>
              <button
                onClick={togglePlayPause1}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)"
                }}
                aria-label={isPlaying1 ? "Pause" : "Play"}
              >
                {isPlaying1 ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying1 ? "Pause" : "Play"}
              </button>
              
              <button
                onClick={skipForward1}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)"
                }}
                aria-label="Skip forward 5 seconds"
              >
                <SkipForward className="w-4 h-4" />
                +5s
              </button>
            </div>
          </div>

          <div className="flex-1" style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 600,
                color: "#86868b",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "clamp(8px, 1vw, 12px)"
              }}>

              {t.year}
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 600,
                color: "#1D1D1F",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(20px, 2.5vw, 32px)"
              }}>

              {t.title}
            </h2>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#1D1D1F",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                marginBottom: "clamp(24px, 3vw, 32px)"
              }}>

              {t.paragraph1}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mb-16 md:mb-24 mt-12 md:mt-16">
          <div
            className="w-full md:flex-1 mx-auto md:mx-0 flex flex-col items-center md:items-start justify-center"
            style={{
              maxWidth: "100%"
            }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.3vw, 15px)",
                fontWeight: 400,
                color: "#1D1D1F",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                textAlign: "left",
                width: "100%"
              }}>
              {t.paragraph2}
            </div>
          </div>

          <div
            ref={videoContainer2}
            className="w-full md:w-auto md:flex-shrink-0 mx-auto md:mx-0 flex flex-col items-center"
            style={{
              maxWidth: "100%"
            }}>

            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                overflow: "hidden",
                backgroundColor: "transparent",
                borderRadius: "clamp(12px, 2vw, 20px)"
              }}>

              <video
                ref={videoRef2}
                src="/projects/waveswitch/mockup waveswitch_2.mp4"
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
                aria-label="Wave Switch mockup demonstration"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block"
                }} />

            </div>

            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={togglePlayPause2}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)"
                }}
                aria-label={isPlaying2 ? "Pause" : "Play"}
              >
                {isPlaying2 ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying2 ? "Pause" : "Play"}
              </button>
              
              <button
                onClick={skipForward2}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)"
                }}
                aria-label="Skip forward 5 seconds"
              >
                <SkipForward className="w-4 h-4" />
                +5s
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 w-full">
          <div className="hidden md:block">
            <img
              src="/projects/waveswitch/ordinateur.png"
              alt="WaveSwitch specifications for desktop"
              className="w-full h-auto"
              loading="eager"
              style={{ display: 'block' }}
            />
          </div>

          <div className="md:hidden">
            <img
              src="/projects/waveswitch/tablet.png"
              alt="WaveSwitch specifications for tablet"
              className="w-full h-auto"
              loading="eager"
              style={{ display: 'block' }}
            />
          </div>
        </div>

      </div>
    </section>);

};
