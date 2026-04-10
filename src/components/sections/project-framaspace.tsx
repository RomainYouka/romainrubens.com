"use client";

interface ProjectFramaspaceProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const translations = {
  FR: {
    title: "Framaspace : Refonte visuelle axée sur l'essentiel",
    year: "La Conception : 2024",
    description:
      "Framaspace est un service open source de collaboration et de stockage en ligne. Nous avons revu l'esthétique de cet interface afin de le rendre plus interatif et plus compréhensible par ses utilisateurs. L'objectif était de moderniser l'interface tout en respectant l'éthique libre du projet. Un travail a été mené sur la typographie, la palette de couleurs, la lisibilité, et la cohérence visuelle.\n\nNous avons élaboré une narration visuelle sobre mais marquante, où chaque phrase d'accroche guide l'utilisateur avec complicité. L'esthétique vient soutenir l'usage, dans une interface pensée pour être à la fois lisible, cohérente et engageante.",
    collaboration: "Collaboration : Thalia Mehio"
  },
  EN: {
    title: "Framaspace: Visual Redesign Focused on Essentials",
    year: "Designed in 2024",
    description:
      "Framaspace is an open-source platform for online collaboration and file storage. We redesigned its visual identity to make the interface more interactive and easier for users to understand. The goal was to modernize the experience while staying true to the project's open-source values.\nWe worked on typography, color palette, readability and overall visual consistency.\n\nWe developed a visual narrative that is simple yet striking, where every headline guides the user with clarity and intention. The aesthetic supports the functionality, resulting in an interface designed to be readable, coherent and engaging.",
    collaboration: "Collaboration: Thalia Mehio"
  },
  ՀԱՅ: {
    title: "Framaspace. Տեսողական վերաձևավորում՝",
    year: "Նախագծված 2024-ին",
    description:
      "Framaspace-ը բաց կոդով առցանց համագործակցության և պահման ծառայություն է։ Մենք վերանայել ենք այս միջերեսի էսթետիկան՝ այն ավելի ինտերակտիվ և օգտատերի համար հասկանալի դարձնելու նպատակով։\nԾառայության նպատակն էր ժամանակակից տեսք տալ միջերեսին՝ լիովին պահպանելով նախագծի բաց և ազատ սկզբունքները։\n\nԱշխատանքները ներառել են տիպոգրաֆիայի, գունային պատկերի, ընթեռնելիության և տեսողական համահունչության մշակումը։\n\nՄենք մշակել ենք զուսպ, սակայն տպավորիչ տեսողական պատմություն, որտեղ յուրաքանչյուր արտահայտություն ընկերական կերպով ուղղորդում է օգտատերին։\nԷսթետիկան ծառայում է գործառույթին՝ ստեղծելով միջերես, որը միաժամանակ ընթեռնելի է, համահունչ և ներգրավող։",
    collaboration: "Համագործակցություն․ Թալիա Մեհիո"
  }
};

export default function ProjectFramaspace({ language }: ProjectFramaspaceProps) {
  const t = translations[language];

  return (
    <section
      id="framaspace"
      className="w-full bg-black"
      style={{
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
        scrollMarginTop: "80px"
      }}
    >
      <div className="container max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          <div
            className="w-full md:w-auto md:flex-shrink-0 flex justify-center md:justify-start"
            style={{
              maxWidth: "500px",
              margin: "0 auto md:0"
            }}
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/rnybtevfdcz-1762190003461.png?width=8000&height=8000&resize=contain"
              alt="Framaspace Interface Redesign"
              style={{
                width: "100%",
                height: "auto",
                display: "block"
              }}
            />
          </div>

          <div className="flex-1" style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 600,
                color: "var(--theme-subtle)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "clamp(8px, 1vw, 12px)"
              }}
            >
              {t.year}
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 600,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(20px, 2.5vw, 32px)"
              }}
            >
              {t.title}
            </h2>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#F5F5F7",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                whiteSpace: "pre-line",
                marginBottom: "clamp(16px, 2vw, 24px)"
              }}
            >
              {t.description}
            </div>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#F5F5F7",
                lineHeight: 1.5,
                letterSpacing: "-0.022em"
              }}
            >
              {t.collaboration}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}