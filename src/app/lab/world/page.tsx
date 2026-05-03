"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import maplibregl, { AttributionControl, Marker, NavigationControl, type Map as MapLibreMap } from "maplibre-gl";
import { useTheme } from "@/contexts/ThemeContext";
import { detectLanguage, type Language } from "@/lib/language";

type PlaceText = {
  kicker: string;
  title: string;
  body: string;
  signal: string;
};

type Place = PlaceText & {
  id: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  video: string;
  palette: string;
};

const uiCopy: Record<Language, { lab: string; previous: string; next: string; select: string; aerial: string; places: string; map: string }> = {
  FR: {
    lab: "Retour au Lab",
    previous: "Précédent",
    next: "Suivant",
    select: "Afficher",
    aerial: "Survol aérien",
    places: "Lieux",
    map: "Carte interactive des lieux",
  },
  EN: {
    lab: "Back to Lab",
    previous: "Previous",
    next: "Next",
    select: "Show",
    aerial: "Aerial flyover",
    places: "Places",
    map: "Interactive places map",
  },
  ՀԱՅ: {
    lab: "Վերադառնալ Lab",
    previous: "Նախորդ",
    next: "Հաջորդ",
    select: "Ցուցադրել",
    aerial: "Օդային դիտում",
    places: "Վայրեր",
    map: "Ինտերակտիվ քարտեզ",
  },
};

const placeNames: Record<Language, Record<string, string>> = {
  FR: {
    shanghai: "Shanghai",
    singapore: "Singapour",
    yerevan: "Yerevan",
    "sf-bay": "Baie de San Francisco",
    chicago: "Chicago",
    nyc: "New York City",
    vancouver: "Vancouver",
    lyon: "Lyon",
    paris: "Paris",
    bordeaux: "Bordeaux",
    beijing: "Beijing",
    "tokyo-osaka": "Tokyo / Osaka",
  },
  EN: {
    shanghai: "Shanghai",
    singapore: "Singapore",
    yerevan: "Yerevan",
    "sf-bay": "San Francisco Bay Area",
    chicago: "Chicago",
    nyc: "New York City",
    vancouver: "Vancouver",
    lyon: "Lyon",
    paris: "Paris",
    bordeaux: "Bordeaux",
    beijing: "Beijing",
    "tokyo-osaka": "Tokyo / Osaka",
  },
  ՀԱՅ: {
    shanghai: "Շանհայ",
    singapore: "Սինգապուր",
    yerevan: "Երևան",
    "sf-bay": "Սան Ֆրանցիսկոյի ծոց",
    chicago: "Չիկագո",
    nyc: "Նյու Յորք",
    vancouver: "Վանկուվեր",
    lyon: "Լիոն",
    paris: "Փարիզ",
    bordeaux: "Բորդո",
    beijing: "Պեկին",
    "tokyo-osaka": "Տոկիո / Օսակա",
  },
};

const mapStyles = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
};

const placeTranslations: Record<string, Partial<Record<Language, PlaceText>>> = {
  shanghai: {
    EN: {
      kicker: "Total urban interface",
      title: "When I discovered that everything could feel possible",
      body: "Shanghai challenges many European assumptions. Services, payment, mobility, delivery and daily decisions feel connected through one continuous urban interface. What stays with me is not only technological speed, but the way connected behaviors become ordinary, legible and almost invisible.",
      signal: "Mobile payment, dense transit, integrated services, trust in scale.",
    },
    ՀԱՅ: {
      kicker: "Քաղաքային ամբողջական ինտերֆեյս",
      title: "Երբ հասկացա, որ ամեն ինչ կարող է հնարավոր թվալ",
      body: "Շանհայը փոխում է Եվրոպայից եկող շատ կանխակալ պատկերացումներ։ Վճարումը, շարժունակությունը, ծառայությունները և առօրյա որոշումները դառնում են քաղաքի ու հեռախոսի միջև շարունակական ինտերֆեյս։ Ամենից ուժեղը ոչ միայն տեխնոլոգիական արագությունն է, այլ այն, թե ինչպես են կապակցված սովորությունները դառնում բնական և գրեթե անտեսանելի։",
      signal: "Բջջային վճարում, խիտ տրանսպորտ, ինտեգրված ծառայություններ, մասշտաբի վստահություն։",
    },
  },
  singapore: {
    EN: {
      kicker: "Public service as product",
      title: "Precision as an experience",
      body: "Singapore shows another form of design: a city where efficiency becomes a sensory quality. Digital services, wayfinding, flows, cleanliness and governance create continuity. Interaction is not only on the screen; it is in the way the city removes friction.",
      signal: "Smart Nation, mobility, legibility, service sovereignty.",
    },
    ՀԱՅ: {
      kicker: "Հանրային ծառայությունը որպես արտադրանք",
      title: "Ճշգրտությունը որպես փորձառություն",
      body: "Սինգապուրը ցույց է տալիս դիզայնի այլ ձև․ քաղաք, որտեղ արդյունավետությունը դառնում է զգայական որակ։ Թվային ծառայությունները, ուղղորդումը, հոսքերը և կառավարումը ստեղծում են շարունակականություն։ Ինտերակցիան միայն էկրանին չէ, այլ քաղաքի շփումները նվազեցնելու ձևի մեջ։",
      signal: "Smart Nation, շարժունակություն, ընթեռնելիություն, ծառայության համակարգվածություն։",
    },
  },
  "sf-bay": {
    EN: {
      kicker: "Permanent prototype",
      title: "The world as a public beta",
      body: "The Bay Area made one idea unavoidable: a product can be alive. Prototype culture, feedback loops, technical communities and human-centered design shaped much of the modern web. It is inspiring, but demanding: interface choices can reshape social habits.",
      signal: "HCI, startup culture, accessibility, rapid experimentation.",
    },
  },
  paris: {
    EN: {
      kicker: "Culture and friction",
      title: "Composing with heritage",
      body: "Paris forces negotiation with history. Everything already feels drawn, named, loved or criticized. For a designer, it is a school of constraint: how to modernize without flattening, and how to make access easier without making the experience banal.",
      signal: "Heritage, mobility, institutions, tension between beauty and use.",
    },
  },
};

const places: Place[] = [
  {
    id: "shanghai",
    city: "Shanghai",
    country: "Chine",
    lat: 31.2304,
    lon: 121.4737,
    kicker: "Interface urbaine totale",
    title: "Quand j'ai découvert que tout était possible",
    body:
      "Shanghai renverse beaucoup de préjugés européens. On arrive avec l'image d'une Chine souvent racontée à distance, par ses tensions ou ses excès, et l'on découvre une ville qui fonctionne avec une fluidité presque déroutante. Le paiement, la mobilité, la livraison, la réservation, l'accès à un service ou à une information forment une continuité entre le corps, la rue et le téléphone.\n\nCe lieu m'a fait comprendre qu'une interface peut dépasser l'écran. Elle peut devenir une infrastructure sociale, un réflexe collectif, une couche invisible posée sur la ville. Ce n'est pas seulement l'avance technologique qui impressionne, mais la manière dont elle devient ordinaire, acceptée, lisible, parfois même élégante dans son efficacité.",
    signal: "Paiement mobile, transports denses, services intégrés, confiance dans l'échelle.",
    video: "https://www.pexels.com/download/video/33765200/",
    palette: "linear-gradient(135deg, #111827 0%, #293241 42%, #d97706 100%)",
  },
  {
    id: "singapore",
    city: "Singapour",
    country: "Singapour",
    lat: 1.3521,
    lon: 103.8198,
    kicker: "Service public comme produit",
    title: "La précision comme expérience",
    body:
      "Singapour montre une forme de design presque systémique. Tout semble pensé pour réduire les hésitations: se déplacer, comprendre une règle, trouver un service, passer d'un espace physique à une interface numérique. La ville transforme l'efficacité en qualité sensible, sans forcément la rendre froide.\n\nCe que j'en retiens, c'est la puissance d'un service public conçu comme un produit. Les parcours sont clairs, les signaux sont constants, les frictions sont anticipées. Pour le design d'interaction, Singapour rappelle que la meilleure interface n'est pas toujours celle qui se remarque, mais celle qui organise une expérience continue.",
    signal: "Smart Nation, mobilité, lisibilité, souveraineté du service.",
    video: "https://www.pexels.com/download/video/35382112/",
    palette: "linear-gradient(135deg, #06202a 0%, #155e75 46%, #f8fafc 100%)",
  },
  {
    id: "yerevan",
    city: "Yerevan",
    country: "Arménie",
    lat: 40.1872,
    lon: 44.5152,
    kicker: "Mémoire et futur",
    title: "Créer depuis une histoire qui reste vivante",
    body:
      "Yerevan apporte une tension rare entre mémoire, identité et futur. La pierre, la langue, les gestes familiaux, la nourriture, la musique et les traces de l'histoire donnent à la ville une densité émotionnelle très forte. En même temps, on y ressent une énergie jeune, technologique, éducative, tournée vers la création.\n\nCette ville me rappelle que le design ne doit pas seulement optimiser. Il doit aussi transmettre, préserver, relier. Une interface peut porter une culture, une manière de parler, une façon d'accueillir ou de se souvenir. Yerevan donne envie de créer des expériences modernes sans effacer ce qui les rend profondément humaines.",
    signal: "Culture, identité, éducation créative, technologie à taille humaine.",
    video: "https://www.pexels.com/download/video/16209386/",
    palette: "linear-gradient(135deg, #2f1f1b 0%, #7c2d12 48%, #f4d6a0 100%)",
  },
  {
    id: "sf-bay",
    city: "Baie de San Francisco",
    country: "États-Unis",
    lat: 37.7749,
    lon: -122.4194,
    kicker: "Prototype permanent",
    title: "Le monde comme bêta publique",
    body:
      "La Baie de San Francisco a imposé une idée très forte dans ma manière de regarder les produits: rien n'est vraiment figé. Un service peut apprendre, se corriger, écouter, échouer publiquement puis revenir meilleur. Cette culture du prototype, du feedback et du design centré utilisateur a façonné une grande partie du web moderne.\n\nElle m'inspire autant qu'elle me rend prudent. Quand une interface se diffuse à grande échelle, elle ne modifie pas seulement une tâche, elle modifie des habitudes sociales. La Baie rappelle que le designer travaille avec des comportements vivants, pas seulement avec des écrans propres.",
    signal: "HCI, startup culture, accessibilité, expérimentation rapide.",
    video: "https://www.pexels.com/download/video/30294588/",
    palette: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #f97316 100%)",
  },
  {
    id: "chicago",
    city: "Chicago",
    country: "États-Unis",
    lat: 41.8781,
    lon: -87.6298,
    kicker: "Structure et caractère",
    title: "Comprendre la ville comme système",
    body:
      "Chicago m'intéresse par sa structure. La grille, l'architecture, le lac, les transports et les strates industrielles donnent une impression de ville construite par logique autant que par caractère. Elle montre qu'un système peut être robuste sans devenir impersonnel.\n\nPour le design d'interaction, Chicago parle de hiérarchie, de repères et de confiance. Une bonne interface doit parfois ressembler à une ville bien tenue: on comprend où l'on est, où l'on peut aller, ce qui est principal, ce qui est secondaire, et pourquoi l'ensemble tient debout.",
    signal: "Architecture, grille urbaine, lisibilité, design systémique.",
    video: "https://www.pexels.com/download/video/26562758/",
    palette: "linear-gradient(135deg, #111827 0%, #475569 52%, #7dd3fc 100%)",
  },
  {
    id: "nyc",
    city: "New York City",
    country: "États-Unis",
    lat: 40.7128,
    lon: -74.006,
    kicker: "Densité expressive",
    title: "Faire exister une idée dans le bruit",
    body:
      "New York oblige à clarifier. Tout y parle en même temps: les enseignes, les transports, les façades, les gens, les marques, les institutions, les cultures visuelles. Dans ce niveau de densité, une idée faible disparaît immédiatement.\n\nCette ville m'apprend le contraste. Une interface doit pouvoir exister dans le bruit sans crier inutilement. Elle doit hiérarchiser, trancher, choisir son rythme. New York donne une leçon de présence: être lisible vite, mais garder une personnalité.",
    signal: "Identité, signalétique, services civiques, densité d'usages.",
    video: "https://www.pexels.com/download/video/12122310/",
    palette: "linear-gradient(135deg, #0a0f1f 0%, #4338ca 48%, #facc15 100%)",
  },
  {
    id: "vancouver",
    city: "Vancouver",
    country: "Canada",
    lat: 49.2827,
    lon: -123.1207,
    kicker: "Nature comme contrainte",
    title: "Quand la douceur devient méthode",
    body:
      "Vancouver amène une attention plus calme. La présence de l'eau, des montagnes, de la lumière et des mobilités douces modifie le rapport au temps. La ville donne l'impression qu'une expérience peut être efficace sans être pressante.\n\nDans ma vision du design, Vancouver ouvre une question importante: comment créer des interfaces respirables ? Des interfaces qui accompagnent sans pousser, qui informent sans saturer, qui respectent l'attention au lieu de la capturer.",
    signal: "Durabilité, rythme calme, mobilité, relation au paysage.",
    video: "https://www.pexels.com/download/video/32805734/",
    palette: "linear-gradient(135deg, #052e2b 0%, #0f766e 42%, #bae6fd 100%)",
  },
  {
    id: "lyon",
    city: "Lyon",
    country: "France",
    lat: 45.764,
    lon: 4.8357,
    kicker: "Design du quotidien",
    title: "Observer avant de dessiner",
    body:
      "Lyon apprend la nuance. C'est une ville de passages, de quartiers, de reliefs, de gastronomie, d'écoles et d'usages quotidiens. Elle ne donne pas tout immédiatement: il faut observer les rythmes, les habitudes, les déplacements, les façons de se retrouver.\n\nElle me rappelle que le design d'interaction commence souvent avant Figma, avant l'écran, avant le composant. Il commence dans l'observation fine: comment les gens attendent, traversent, cherchent, partagent, s'orientent et inventent parfois leurs propres solutions.",
    signal: "Usage quotidien, proximités, apprentissage, observation terrain.",
    video: "",
    palette: "linear-gradient(135deg, #1f2937 0%, #7f1d1d 48%, #f6c177 100%)",
  },
  {
    id: "paris",
    city: "Paris",
    country: "France",
    lat: 48.8566,
    lon: 2.3522,
    kicker: "Culture et friction",
    title: "Composer avec l'héritage",
    body:
      "Paris oblige à négocier avec l'histoire. Tout y est déjà dessiné, nommé, commenté, adoré ou critiqué. Chaque intervention semble dialoguer avec quelque chose qui existait avant elle.\n\nPour un designer, c'est une école de contrainte. Comment moderniser sans aplatir ? Comment rendre accessible sans banaliser ? Comment créer une expérience contemporaine dans un décor chargé de symboles ? Paris m'apprend que l'élégance n'est pas seulement une esthétique, c'est souvent une manière de tenir une tension.",
    signal: "Patrimoine, mobilité, institutions, tension entre beauté et usage.",
    video: "https://www.pexels.com/download/video/7206450/",
    palette: "linear-gradient(135deg, #111827 0%, #334155 46%, #eab308 100%)",
  },
  {
    id: "bordeaux",
    city: "Bordeaux",
    country: "France",
    lat: 44.8378,
    lon: -0.5792,
    kicker: "Échelle habitable",
    title: "Rendre le raffinement accessible",
    body:
      "Bordeaux apporte une relation sensible à l'échelle, au rythme et à la matière. La pierre, la lumière, les quais et la promenade construisent une élégance plus lente, plus accessible, moins démonstrative.\n\nDans le design, Bordeaux m'aide à penser le tact. Une expérience peut être raffinée sans devenir distante. Elle peut être belle, claire, vivante, mais jamais intimidante. C'est une ville qui rappelle que la sophistication n'a de valeur que si elle reste accueillante.",
    signal: "Matière, promenade, clarté, élégance sans emphase.",
    video: "https://www.pexels.com/download/video/12248558/",
    palette: "linear-gradient(135deg, #1c1917 0%, #9f1239 46%, #fed7aa 100%)",
  },
  {
    id: "beijing",
    city: "Beijing",
    country: "Chine",
    lat: 39.9042,
    lon: 116.4074,
    kicker: "Échelle politique du design",
    title: "Penser l'interface à l'échelle d'un pays",
    body:
      "Beijing donne une autre profondeur au design connecté. On y ressent l'échelle des infrastructures, des standards, des plateformes et de l'ambition nationale. Ce n'est pas seulement une ville: c'est un lieu où la technologie se pense comme organisation collective.\n\nOn peut regarder ce modèle avec prudence, nuance et esprit critique, mais il serait réducteur de l'observer uniquement à travers les clichés européens. Beijing montre une capacité impressionnante à faire passer des technologies complexes dans des usages massifs, et cette échelle oblige à repenser la responsabilité du design.",
    signal: "Infrastructure, gouvernance, plateformes, très grande échelle.",
    video: "https://www.pexels.com/download/video/34769579/",
    palette: "linear-gradient(135deg, #111827 0%, #991b1b 46%, #f59e0b 100%)",
  },
  {
    id: "tokyo-osaka",
    city: "Tokyo / Osaka",
    country: "Japon",
    lat: 35.6762,
    lon: 139.6503,
    kicker: "Micro-interactions partout",
    title: "La précision qui devient hospitalité",
    body:
      "Tokyo et Osaka montrent une culture de l'attention. Les trains, les distributeurs, les commerces, les sons, les pictogrammes, les emballages et les gestes de service composent une expérience presque chorégraphique.\n\nCe qui me marque, c'est la précision comme forme d'hospitalité. Chaque détail peut aider, rassurer, orienter ou surprendre. Le design d'interaction y devient une suite de micro-attentions qui rendent l'environnement plus lisible et plus agréable, sans avoir besoin de grands discours.",
    signal: "Signalétique, micro-interactions, robotique, soin du détail.",
    video: "https://www.pexels.com/download/video/35462656/",
    palette: "linear-gradient(135deg, #111827 0%, #581c87 48%, #f9a8d4 100%)",
  },
];

function WorldMap({
  selected,
  onSelect,
  isDark,
  reduceMotion,
  lang,
}: {
  selected: number;
  onSelect: (index: number) => void;
  isDark: boolean;
  reduceMotion: boolean;
  lang: Language;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const place = places[selected];
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: isDark ? mapStyles.dark : mapStyles.light,
      center: [place.lon, place.lat],
      zoom: 1.45,
      minZoom: 0.8,
      maxZoom: 8,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    });

    const applyProjection = () => {
      if ("setProjection" in map) {
        map.setProjection({ type: "globe" });
      }
    };

    map.on("style.load", applyProjection);
    map.addControl(new NavigationControl({ showCompass: true, showZoom: true }), "top-right");
    map.addControl(new AttributionControl({ compact: true }), "bottom-right");

    markersRef.current = places.map((item, index) => {
      const markerButton = document.createElement("button");
      markerButton.type = "button";
      markerButton.className = "world-map-marker-button";
      markerButton.setAttribute("aria-label", placeNames[lang][item.id]);
      markerButton.addEventListener("click", () => onSelect(index));

      return new Marker({ element: markerButton, anchor: "center" })
        .setLngLat([item.lon, item.lat])
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.setStyle(isDark ? mapStyles.dark : mapStyles.light);
  }, [isDark]);

  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      const element = marker.getElement();
      element.classList.toggle("is-active", index === selected);
      element.setAttribute("aria-label", placeNames[lang][places[index].id]);
    });

    const map = mapRef.current;
    const place = places[selected];
    if (!map) return;

    map.flyTo({
      center: [place.lon, place.lat],
      zoom: 2.75,
      pitch: 0,
      bearing: 0,
      duration: reduceMotion ? 0 : 1100,
      essential: true,
    });
  }, [lang, reduceMotion, selected]);

  return <div ref={containerRef} className="world-map-container" aria-label={placeNames[lang][places[selected].id]} />;
}

export default function LabWorldPage() {
  const { isDark } = useTheme();
  const [selected, setSelected] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [lang, setLang] = useState<Language>("FR");
  const reduceMotion = Boolean(useReducedMotion());
  const videoRef = useRef<HTMLVideoElement>(null);
  const place = places[selected];
  const t = uiCopy[lang];
  const placeText = placeTranslations[place.id]?.[lang] ?? place;
  const articleLang = lang === "ՀԱՅ" ? "hy" : lang.toLowerCase();

  useEffect(() => {
    setLang(detectLanguage());
    const handler = (event: CustomEvent<Language>) => setLang(event.detail);
    window.addEventListener("languageChange", handler as EventListener);
    return () => window.removeEventListener("languageChange", handler as EventListener);
  }, []);

  useEffect(() => {
    setVideoFailed(false);
    const video = videoRef.current;
    if (!video || reduceMotion || !place.video) return;
    video.load();
    video.play().catch(() => {});
  }, [selected, reduceMotion, place.video]);

  const go = (direction: 1 | -1) => {
    setSelected((current) => (current + direction + places.length) % places.length);
  };

  return (
    <main id="main-content" className={`world-page ${isDark ? "world-page-dark" : "world-page-light"}`}>
      <div className="world-shell">
        <section className="world-globe-panel" aria-label={t.map}>
          <div className="world-topbar">
            <Link href="/lab" className="world-back">
              <ArrowLeft size={18} aria-hidden="true" />
              <span>{t.lab}</span>
            </Link>
            <span className="world-count">{String(selected + 1).padStart(2, "0")} / {String(places.length).padStart(2, "0")}</span>
          </div>
          <div className="world-globe" role="img" aria-label={`${t.map}: ${place.city}`}>
            <WorldMap selected={selected} onSelect={setSelected} isDark={isDark} reduceMotion={reduceMotion} lang={lang} />
          </div>
          <div className="world-place-selector">
            <label htmlFor="world-place-select">{t.places}</label>
            <select
              id="world-place-select"
              value={selected}
              onChange={(event) => setSelected(Number(event.target.value))}
              aria-label={t.places}
            >
              {places.map((item, index) => (
                <option key={item.id} value={index}>
                  {placeNames[lang][item.id]}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="world-story-panel" aria-live="polite">
          <div className="world-video-wrap">
            {place.video && (
              <video
                ref={videoRef}
                key={place.id}
                muted
                loop
                playsInline
                autoPlay={!reduceMotion}
                preload="metadata"
                src={place.video}
                onError={() => setVideoFailed(true)}
                style={{ opacity: videoFailed ? 0 : 1 }}
                aria-label={`${t.aerial} ${place.city}`}
              />
            )}
            <div className="world-video-fallback" style={{ background: place.palette }} aria-hidden="true" />
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={place.id}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="world-copy"
              lang={articleLang}
            >
              <div className="world-heading">
                <h1>{place.city}</h1>
                <h2>{placeText.title}</h2>
              </div>
              <p>{placeText.body}</p>
            </motion.article>
          </AnimatePresence>

          <div className="world-actions">
            <button type="button" onClick={() => go(-1)} aria-label={t.previous}>
              <ChevronLeft size={20} />
              <span>{t.previous}</span>
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t.next}>
              <span>{t.next}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </section>
      </div>

      <style jsx>{`
        .world-page {
          min-height: 100dvh;
          background: var(--theme-bg);
          color: var(--theme-fg);
          padding: 5.5rem 1.5rem 4rem;
        }

        .world-page-light {
          background:
            linear-gradient(180deg, #f5f5f7 0%, var(--theme-bg) 46%),
            var(--theme-bg);
          color: #1d1d1f;
        }

        .world-page-dark {
          background:
            radial-gradient(circle at 26% 18%, rgba(56, 189, 248, 0.16), transparent 32%),
            linear-gradient(180deg, #05070b 0%, var(--theme-bg) 54%);
        }

        .world-shell {
          width: min(1400px, 100%);
          min-height: calc(100dvh - 9.5rem);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.98fr) minmax(420px, 0.82fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: stretch;
        }

        .world-globe-panel,
        .world-story-panel {
          min-width: 0;
        }

        .world-globe-panel {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: min(760px, calc(100dvh - 9.5rem));
        }

        .world-story-panel {
          display: grid;
          grid-template-rows: minmax(240px, 32%) minmax(0, 1fr) auto;
          gap: clamp(1.25rem, 2.4vw, 2rem);
          min-height: min(760px, calc(100dvh - 9.5rem));
        }

        .world-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0;
          margin-bottom: clamp(1.25rem, 2.5vw, 2rem);
          z-index: 2;
        }

        .world-back,
        .world-actions button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          border: 1px solid var(--theme-border);
          background: color-mix(in srgb, var(--theme-bg) 84%, transparent);
          color: var(--theme-fg);
          text-decoration: none;
          font-family: var(--font-body);
          font-weight: 600;
          cursor: pointer;
        }

        .world-back {
          height: 44px;
          padding: 0 1.05rem 0 0.95rem;
          border-radius: 999px;
          font-size: 15px;
          backdrop-filter: blur(18px);
          white-space: nowrap;
          flex-shrink: 0;
          min-width: fit-content;
          line-height: 1;
        }

        .world-back {
          border-color: color-mix(in srgb, var(--theme-accent) 44%, var(--theme-border));
          background: var(--theme-accent);
          color: var(--theme-accent-fg);
        }

        .world-back:hover,
        .world-actions button:hover {
          border-color: var(--theme-accent);
          transform: translateY(-1px);
        }

        .world-back:focus-visible,
        .world-actions button:focus-visible,
        .world-place-selector select:focus-visible {
          outline: 3px solid color-mix(in srgb, var(--theme-accent) 70%, transparent);
          outline-offset: 3px;
        }

        .world-count {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          color: color-mix(in srgb, var(--theme-fg) 68%, var(--theme-muted));
          letter-spacing: 0.08em;
        }

        .world-globe {
          flex: 1;
          min-height: 0;
          height: auto;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          background:
            radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--theme-accent) 13%, transparent), transparent 36%),
            color-mix(in srgb, var(--theme-bg) 96%, var(--theme-fg) 4%);
          border: 1px solid var(--theme-border);
        }

        .world-map-container {
          width: 100%;
          height: 100%;
          min-height: 0;
          display: block;
          overflow: hidden;
        }

        .world-place-selector {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0;
          min-height: 48px;
          padding: 0;
          border: 1px solid var(--theme-border);
          border-radius: 999px;
          background: color-mix(in srgb, var(--theme-bg) 96%, var(--theme-fg) 4%);
          backdrop-filter: blur(18px);
          overflow: hidden;
        }

        .world-place-selector label {
          color: color-mix(in srgb, var(--theme-fg) 70%, var(--theme-muted));
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
          padding: 0 0.9rem 0 1.05rem;
        }

        .world-place-selector select {
          flex: 1;
          min-width: 0;
          align-self: stretch;
          height: auto;
          border: 0;
          border-left: 1px solid var(--theme-border);
          border-radius: 0 999px 999px 0;
          background: color-mix(in srgb, var(--theme-bg) 90%, transparent);
          color: var(--theme-fg);
          padding: 0 2.35rem 0 1rem;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          outline: none;
        }

        .world-place-selector select option {
          background: var(--theme-bg);
          color: var(--theme-fg);
        }

        .world-video-wrap {
          position: relative;
          min-height: 240px;
          overflow: hidden;
          background: #111;
          border-radius: 24px;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.16);
        }

        .world-video-wrap video,
        .world-video-fallback {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .world-video-wrap video {
          z-index: 1;
        }

        .world-video-fallback {
          background:
            linear-gradient(120deg, rgba(89, 178, 255, 0.28), transparent 42%),
            linear-gradient(25deg, #111827, #263541 45%, #09090b);
          z-index: 0;
        }

        .world-video-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(to bottom, transparent 35%, rgba(0, 0, 0, 0.38));
          pointer-events: none;
        }

        .world-copy {
          overflow: auto;
          padding-right: 0.25rem;
        }

        .world-heading {
          display: grid;
          gap: 1rem;
          margin-bottom: 1.3rem;
        }

        .world-copy h1 {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(46px, 6.8vw, 88px);
          line-height: 0.98;
          letter-spacing: 0;
          color: var(--theme-fg);
        }

        .world-page-light .world-copy h1 {
          color: #1d1d1f;
        }

        .world-copy h2 {
          margin: 0;
          max-width: 760px;
          font-family: var(--font-display);
          font-size: clamp(18px, 1.25vw, 22px);
          line-height: 1.28;
          letter-spacing: 0;
          color: color-mix(in srgb, var(--theme-fg) 76%, var(--theme-muted));
        }

        .world-page-light .world-copy h2 {
          color: rgba(29, 29, 31, 0.72);
        }

        .world-copy p {
          max-width: 760px;
          margin: 0;
          color: color-mix(in srgb, var(--theme-fg) 82%, var(--theme-muted));
          font-size: clamp(17px, 1.35vw, 20px);
          line-height: 1.62;
          letter-spacing: 0;
        }

        .world-page-light .world-copy p {
          color: rgba(29, 29, 31, 0.82);
        }

        .world-actions {
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .world-actions button {
          min-width: 128px;
          height: 46px;
          border-radius: 999px;
          font-size: 14px;
        }

        .world-actions button:last-child {
          border-color: color-mix(in srgb, var(--theme-accent) 44%, var(--theme-border));
          background: color-mix(in srgb, var(--theme-accent) 14%, var(--theme-bg));
        }

        @media (max-width: 980px) {
          .world-page {
            padding: 4.75rem 1rem 3rem;
          }

          .world-shell {
            grid-template-columns: 1fr;
            min-height: 0;
            gap: 2.5rem;
          }

          .world-globe-panel,
          .world-story-panel {
            min-height: auto;
          }

          .world-globe {
            height: 480px;
          }

          .world-story-panel {
            grid-template-rows: 280px auto auto;
          }

          .world-copy {
            overflow: visible;
          }
        }

        @media (max-width: 560px) {
          .world-page {
            padding-inline: 1rem;
            padding-bottom: 2rem;
          }

          .world-shell {
            gap: 2rem;
          }

          .world-globe-panel,
          .world-story-panel {
            border-left: 0;
            border-right: 0;
          }

          .world-topbar {
            padding: 0;
            align-items: flex-start;
          }

          .world-globe {
            height: 360px;
            border-radius: 18px;
          }

          .world-place-selector {
            align-items: stretch;
            flex-direction: column;
            border-radius: 18px;
            padding: 0.85rem;
          }

          .world-place-selector select {
            width: 100%;
            background: color-mix(in srgb, var(--theme-bg) 70%, transparent);
          }

          .world-story-panel {
            grid-template-rows: 220px 1fr auto;
            min-height: auto;
          }

          .world-actions button {
            min-width: 0;
            flex: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .world-video-wrap video {
            display: none;
          }
        }
      `}</style>
      <style jsx global>{`
        .world-map-marker-button {
          width: 18px;
          height: 18px;
          border: 3px solid var(--theme-bg);
          border-radius: 999px;
          background: var(--theme-accent);
          box-shadow:
            0 0 0 7px color-mix(in srgb, var(--theme-accent) 20%, transparent),
            0 8px 18px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition:
            width 180ms ease,
            height 180ms ease,
            box-shadow 180ms ease,
            background-color 180ms ease;
        }

        .world-map-marker-button.is-active {
          width: 26px;
          height: 26px;
          background: var(--theme-fg);
          box-shadow:
            0 0 0 9px color-mix(in srgb, var(--theme-accent) 34%, transparent),
            0 12px 28px rgba(0, 0, 0, 0.28);
        }

        .world-map-marker-button:focus-visible {
          outline: 3px solid color-mix(in srgb, var(--theme-accent) 70%, transparent);
          outline-offset: 4px;
        }

        .world-globe .maplibregl-ctrl-group {
          border-radius: 999px;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
        }

        .world-globe .maplibregl-ctrl button {
          width: 34px;
          height: 34px;
        }

        .world-globe .maplibregl-ctrl-attrib {
          font-family: var(--font-body);
          font-size: 11px;
        }
      `}</style>
    </main>
  );
}
