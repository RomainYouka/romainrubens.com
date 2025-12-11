"use client";

interface ProjectNameQuestProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const translations = {
  EN: {
    title: "Name Quest - Educational Board Game on Last Names",
    year: "Designed in 2025",
    description:
      "NameQuest is an educational and inclusive board game that explores family-name discrimination through a 55-space path representing different countries.\nMade up of individual, collective and trap cards, the game mixes anecdotes, general-knowledge questions and real-life situations.\n\nDesigned for 2 to 6 players, it encourages reflection and conversation in a playful and accessible environment. The visual design is colorful, with laser-cut tokens and a strong cultural dimension.",
    contextText: "The project begins with a simple observation: a family name is never neutral.\nIt carries a story, an origin and a heritage. It can be a source of pride, but also of prejudice.\nMany people still report experiencing discrimination linked to their name, whether in administrative processes, in school environments or in everyday interactions.\n\nIn response to these realities, the goal was to imagine an inclusive educational tool capable of sparking an honest, playful and accessible conversation about identity."
  },
  FR: {
    title: "Name Quest - Jeu de Société Éducatif sur les Noms de Famille",
    year: "Conception : 2025",
    description:
      "NameQuest est un jeu de société éducatif et inclusif, abordant les discriminations liées aux noms de famille à travers un parcours de 55 cases représentant différents pays. Composé de cartes individuelles, collectives et pièges, le jeu mêle anecdotes, questions de culture générale et situations vécues.\n\nPensé pour 2 à 6 joueurs, il invite à la réflexion et au dialogue dans un cadre ludique et accessible, avec un design coloré, des pions en découpe laser, et une forte dimension culturelle.",
    contextText: "Le projet part d'un constat simple : le nom de famille n'est jamais neutre. Il révèle une histoire, une origine et un héritage. Il peut être source de fierté mais aussi de préjugés. Certaines personnes témoignent encore aujourd'hui de discriminations liées à leur nom, que ce soit dans les démarches administratives, dans le milieu scolaire ou dans les interactions du quotidien. Face à ces constats, l'objectif est d'imaginer un support pédagogique inclusif, capable de provoquer une conversation honnête, ludique et accessible autour de l'identité."
  },
  ՀԱՅ: {
    title: "Name Quest - Կրթական Սեղանի Խաղ Ազգանունների Մասին",
    year: "Նախագծված 2025-ին",
    description:
      "NameQuest-ը կրթական և ներառական սեղանի խաղ է, որը անդրադառնում է ազգանունների հետ կապված խտրականություններին՝ ներկայացնելով 55 վանդակից բաղկացած ուղի, որը խորհրդանշում է տարբեր երկրներ։\nԽաղը բաղկացած է անհատական, խմբային և թակարդ քարտերից՝ միավորելով ապրած պատմություններ, ընդհանուր մշակութային հարցեր և իրական կյանքից վերցված իրավիճակներ։\n\nՆախատեսված է 2-ից 6 խաղացողի համար և խրախուսում է մտորումը և զրույցը՝ պահպանելով խաղային ու մատչելի միջավայրը։ Դիզայնը գունավոր է, ֆիքսված լազերային կտրվածքով ֆիշկերով և հստակ արտահայտված մշակութային ընդգծումներով։",
    contextText: "Նախագիծը ծագում է մի պարզ դիտարկումից․ ազգանունը երբեք չեզոք չէ։ Այն կրում է պատմություն, ծագում և ժառանգություն։ Այն կարող է լինել հպարտության աղբյուր, բայց նաև՝ կանխակալություն։\nՇատ մարդիկ մինչ այսօր վկայում են իրենց ազգանունի հետ կապված խտրականությունների մասին՝ լինի դա վարչական գործընթացներում, կրթական միջավայրում կամ առօրյա շփումներում։\n\nԱյս իրողություններին դիմակայելով՝ նպատակն է պատկերացնել ներառական և ուսումնավարժական մի հարթակ, որը կկարողանա ստեղծել անկեղծ, խաղային և մատչելի զրույց՝ ինքնության թեմայի շուրջ։"
  }
};

export default function ProjectNameQuest({ language }: ProjectNameQuestProps) {
  const t = translations[language];

  return (
    <section
      id="namequest"
      className="w-full bg-[#F5F5F7]"
      style={{
        scrollMarginTop: "80px"
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col-reverse md:flex-row md:items-stretch gap-0 md:gap-0">
          {/* Image PNG à gauche */}
          <div
            className="w-full md:w-[45%] lg:w-[50%] xl:flex-shrink-0 xl:!w-[650px] xl:!max-w-[650px]"
            style={{
              maxWidth: "100%",
              display: "flex",
              alignItems: "flex-start"
            }}
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/eeeeeeeeee-1762112535901.png?width=8000&height=8000&resize=contain"
              alt="NameQuest Board Game"
              className="!w-full md:!h-auto xl:!h-full"
              style={{
                objectFit: "contain",
                objectPosition: "center top"
              }}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (window.innerWidth >= 1280) {
                  img.style.objectFit = "cover";
                  img.style.objectPosition = "center top";
                }
              }}
            />
          </div>

          {/* Contenu texte à droite */}
          <div
            className="flex-1 px-5 md:px-6 lg:px-10 flex flex-col justify-center"
            style={{
              textAlign: "left",
              paddingTop: "clamp(48px, 6vw, 80px)",
              paddingBottom: "clamp(48px, 6vw, 80px)"
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 600,
                color: "#86868b",
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
                color: "#1D1D1F",
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
                color: "#1D1D1F",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                whiteSpace: "pre-line",
                marginBottom: "clamp(24px, 3vw, 40px)"
              }}
            >
              {t.description}
            </div>

          </div>
        </div>

        {/* Podcast Section - Mobile only */}
        <div className="md:hidden px-5 py-12">
          <iframe 
            data-testid="embed-iframe" 
            style={{borderRadius: "12px"}}
            src="https://open.spotify.com/embed/episode/03xwhLY3oo5cApzEvD9IvY?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
      </div>

      {/* Podcast Section - Desktop only */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-5 md:px-6 lg:px-10 py-12">
        <iframe 
          data-testid="embed-iframe" 
          style={{borderRadius: "12px"}}
          src="https://open.spotify.com/embed/episode/03xwhLY3oo5cApzEvD9IvY?utm_source=generator&theme=0" 
          width="100%" 
          height="152" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        />
      </div>

      {/* Spacing divider */}
      <div className="h-16 md:h-24 bg-[#F5F5F7]" />

      {/* Responsive Mockups Section */}
      <div className="w-full bg-[#F5F5F7]">
        {/* Desktop view - ordinateur.png */}
        <div className="hidden md:block">
          <img
            src="/namequest/ordinateur.png"
            alt="NameQuest specifications for desktop"
            className="w-full h-auto"
            style={{ display: 'block' }}
          />
        </div>

        {/* Mobile/Tablet view - mobile.png */}
        <div className="md:hidden">
          <img
            src="/namequest/mobile.png"
            alt="NameQuest specifications for mobile"
            className="w-full h-auto"
            style={{ display: 'block' }}
          />
        </div>
      </div>

      {/* Context Section - Desktop only */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-5 md:px-6 lg:px-10 py-16 md:py-20">
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 1.6vw, 17px)",
            fontWeight: 400,
            color: "#1D1D1F",
            lineHeight: 1.5,
            letterSpacing: "-0.022em",
            whiteSpace: "pre-line"
          }}
        >
          {t.contextText}
        </div>
      </div>
    </section>
  );
}
