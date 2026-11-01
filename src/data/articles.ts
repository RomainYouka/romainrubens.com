import type { Language } from "@/lib/language";

export type Article = {
  id: string;
  image: string;
  href: Record<Language, string>;
  number: string;
  title: Record<Language, string>;
};

export const articles: Article[] = [
  {
    id: "01",
    image: "/articles/blocks/01.jpg",
    number: "01",
    href: {
      FR: "https://medium.com/@romainrubens/01-un-jour-je-serai-designer-d8662f384749",
      EN: "https://medium.com/@romainrubens/01-one-day-ill-be-a-designer-7201ecd9b1e9",
      ՀԱՅ: "https://medium.com/@romainrubens/01-un-jour-je-serai-designer-d8662f384749",
    },
    title: {
      FR: "Un jour, je serai Designer",
      EN: "One Day, I’ll Be a Designer",
      ՀԱՅ: "Մի օր ես դիզայներ կլինեմ",
    },
  },
  {
    id: "02",
    image: "/articles/blocks/02.jpg",
    number: "02",
    href: {
      FR: "https://medium.com/@romainrubens/02-la-maison-connect%C3%A9e-change-de-dimension-7395ebd6a3c4",
      EN: "https://medium.com/@romainrubens/02-the-smart-home-enters-a-new-era-836727159d88",
      ՀԱՅ: "https://medium.com/@romainrubens/02-la-maison-connect%C3%A9e-change-de-dimension-7395ebd6a3c4",
    },
    title: {
      FR: "La maison connectée change de dimension",
      EN: "The Smart Home Enters a New Era",
      ՀԱՅ: "Խելացի տունը մտնում է նոր դարաշրջան",
    },
  },
  {
    id: "03",
    image: "/articles/blocks/03.jpg",
    number: "03",
    href: {
      FR: "https://medium.com/@romainrubens/03-comprendre-avant-de-concevoir-c3c9fcb54959",
      EN: "https://medium.com/@romainrubens/03-understanding-before-designing-1837621ff58e",
      ՀԱՅ: "https://medium.com/@romainrubens/03-comprendre-avant-de-concevoir-c3c9fcb54959",
    },
    title: {
      FR: "Comprendre avant de concevoir",
      EN: "Understanding Before Designing",
      ՀԱՅ: "Հասկանալ նախքան ձևավորելը",
    },
  },
  {
    id: "04",
    image: "/articles/blocks/04.jpg",
    number: "04",
    href: {
      FR: "https://medium.com/@romainrubens/04-de-lautre-c%C3%B4t%C3%A9-de-l-interface-92c4eb051ed8",
      EN: "https://medium.com/@romainrubens/04-on-the-other-side-of-the-interface-19ce1aa7fa2f",
      ՀԱՅ: "https://medium.com/@romainrubens/04-de-lautre-c%C3%B4t%C3%A9-de-l-interface-92c4eb051ed8",
    },
    title: {
      FR: "De l’autre côté de l’interface",
      EN: "On the Other Side of the Interface",
      ՀԱՅ: "Ինտերֆեյսի մյուս կողմում",
    },
  },
];
