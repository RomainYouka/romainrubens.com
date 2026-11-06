import type { Language } from "@/lib/language";

type Copy = {
  introducing: string; discover: string; heading: string[]; intro: string[];
  statements: string[][]; foundation: string; component: string;
  foundationTitles: string[]; componentTitles: string[]; usability: string;
  ratings: string[]; criteria: string[][]; example: string; before: string;
  after: string; explore: string; back: string; next: string; zoom: string;
};

export const content: Record<Language, Copy> = {
  "EN": {
    "introducing": "Introducing",
    "discover": "Discover the project",
    "heading": [
      "Designing the future digital ecosystem",
      "of electric utility vehicles"
    ],
    "intro": [
      "Since 1996, Goupil has designed compact electric utility vehicles for professionals **whose daily work depends on reliability, adaptability, and efficiency.**",
      "During my internship, I explored **how Goupil’s digital ecosystem could evolve alongside its vehicles**. The project starts with a simple question: **how can digital services better support users before, during, and after using a Goupil vehicle?**",
      "The work combines **UX research, product strategy, and interface design. It identifies the people involved in the vehicle journey,** their roles, current habits, needs, frustrations, and future expectations. These insights inform a set of **digital platform opportunities, ranging from the modernization of existing tools to new services enabled by more connected vehicles.**",
      "To make these experiences consistent and scalable, I also created SyGo, **a Design System built to provide a shared foundation for Goupil’s future digital products.**"
    ],
    "statements": [
      [
        "DESIGN SYSTEM",
        "Creating SyGo was not just a matter of assembling components. It required **defining a shared language that could support Goupil’s evolving digital ecosystem,** from early research insights to future services. Clear principles, scalable foundations, and reusable patterns were essential to make every experience consistent, accessible, and easy to evolve **without losing its connection to users’ real needs.**"
      ],
      [
        "FOUNDATIONS",
        "SyGo’s foundations define the **essential rules behind every interface.** Color, typography, iconography, spacing, opacity, borders, and radii work together to **create a clear and recognisable visual language.** By establishing these shared standards from the start, the system ensures consistency across products **while giving teams the flexibility to build new experiences with confidence.**"
      ],
      [
        "LAYOUT GRIDS",
        "Layout grids provide the structure behind SyGo’s interfaces. **They define how content is aligned, spaced, and organised across different screen sizes, creating clear hierarchies and predictable user journeys.** By using a shared grid system, each product can remain visually consistent while **adapting naturally** to the needs of desktop, tablet, and mobile experiences."
      ],
      [
        "COMPONENTS",
        "Components are the reusable building blocks of SyGo. From buttons and form fields to navigation and selection controls, **each element is designed to solve a recurring user need with consistency and clarity.** Documented states, behaviours, and responsive rules **make interfaces faster to build, easier to maintain, and more reliable for every user.**"
      ],
      [
        "ECOSYSTEM",
        "Built on SyGo’s foundations, Goupil’s digital ecosystem brings together **a suite of connected platforms designed around the real needs** of drivers, fleet managers, technicians, dealers, and customers. From configuring a vehicle to managing maintenance and accessing technical support, **each platform solves a specific moment in the user journey** while contributing to a more coherent, scalable, and future-ready service experience."
      ],
      [
        "SELECTED EXPERIENCES",
        "The following screens show how the ecosystem takes shape across selected platforms. **Each experience translates a specific user need into a clear, practical interface**, whether it involves configuring a vehicle, finding a part, tracking a service request, or accessing technical information. **SyGo creates the consistency that connects these distinct journeys into one recognisable Goupil experience.**"
      ],
      [
        "MODES",
        "The system is designed to remain clear, familiar, and accessible in both light and dark modes. Beyond adapting colors, **each mode preserves visual hierarchy,** readability, contrast, and component behaviour, **allowing the Goupil experience to feel consistent in every environment.**"
      ]
    ],
    "foundation": "Foundations",
    "component": "Components",
    "foundationTitles": [
      "Color Palette",
      "Google Sans Font",
      "Material Design Icons by Google Fonts",
      "Google Fonts"
    ],
    "componentTitles": [
      "Icons",
      "Buttons",
      "Header",
      "Search",
      "Content & Progress",
      "Action Buttons",
      "Language Contents",
      "Segmented Navigation",
      "Circle Number & Text Button",
      "Table of Contents"
    ],
    "usability": "Usability Criteria",
    "ratings": [
      "critical",
      "insufficient",
      "fair",
      "acceptable",
      "good",
      "excellent"
    ],
    "criteria": [
      [
        "Clarity",
        "The product presents information in a simple, understandable, and unambiguous way.",
        "Example: clear labels, strong visual hierarchy, minimal visual clutter."
      ],
      [
        "User Control",
        "The product allows users to easily reverse or modify their actions.",
        "Example: canceling an action, editing a request, or returning to a previous step."
      ],
      [
        "Flexibility",
        "The product adapts to different user profiles, use cases, and levels of expertise.",
        "Example: simplified access for customers, advanced features for technicians."
      ],
      [
        "Error Prevention",
        "The product anticipates potential errors and supports users before they occur.",
        "Example: required field validation, data verification, warning messages before sensitive actions."
      ],
      [
        "Consistency",
        "The product maintains the same patterns, behaviors, and interaction logic across all interfaces.",
        "Example: consistent components, terminology, and actions across services."
      ],
      [
        "Visibility",
        "The product continuously informs users about its status, progress, and ongoing actions.",
        "Example: service ticket status, order progress, loading indicators."
      ],
      [
        "Guidance",
        "The product helps users complete tasks with minimal effort.",
        "Example: pre-filled forms, automatic suggestions, guided workflows."
      ],
      [
        "Help & Support",
        "The product provides the resources users need when assistance is required.",
        "Example: documentation, tutorials, FAQs, or technical support."
      ]
    ],
    "example": "Example",
    "before": "Before",
    "after": "After",
    "explore": "Continue exploring",
    "back": "Back to Projects",
    "next": "Next Project",
    "zoom": "Open the interface image"
  },
  "FR": {
    "introducing": "Présentation",
    "discover": "Découvrir le projet",
    "heading": [
      "Concevoir le futur écosystème numérique",
      "des véhicules utilitaires électriques"
    ],
    "intro": [
      "Depuis 1996, Goupil conçoit des véhicules utilitaires électriques compacts pour les professionnels **dont le quotidien repose sur la fiabilité, l’adaptabilité et l’efficacité.**",
      "Pendant mon stage, j’ai exploré **la manière dont l’écosystème numérique de Goupil pouvait évoluer avec ses véhicules**. Le projet part d’une question simple : **comment les services numériques peuvent-ils mieux accompagner les utilisateurs avant, pendant et après l’utilisation d’un véhicule Goupil ?**",
      "Ce travail associe **recherche UX, stratégie produit et design d’interface. Il identifie les acteurs du parcours du véhicule,** leurs rôles, habitudes, besoins, frustrations et attentes. Ces enseignements font émerger **des opportunités de plateformes numériques, de la modernisation des outils existants aux nouveaux services rendus possibles par des véhicules plus connectés.**",
      "Pour rendre ces expériences cohérentes et évolutives, j’ai également créé SyGo, **un design system qui fournit un socle commun aux futurs produits numériques de Goupil.**"
    ],
    "statements": [
      [
        "DESIGN SYSTEM",
        "Créer SyGo ne consistait pas simplement à assembler des composants. Il fallait **définir un langage commun capable d’accompagner l’évolution de l’écosystème numérique de Goupil,** des premiers enseignements de recherche aux futurs services. Des principes clairs, des fondations évolutives et des modèles réutilisables étaient essentiels pour des expériences cohérentes, accessibles et faciles à faire évoluer, **sans perdre le lien avec les besoins réels des utilisateurs.**"
      ],
      [
        "FONDATIONS",
        "Les fondations de SyGo définissent les **règles essentielles de chaque interface.** Couleurs, typographie, iconographie, espacements, opacité, bordures et rayons s’articulent pour **créer un langage visuel clair et reconnaissable.** Ces standards communs assurent la cohérence entre les produits, **tout en laissant aux équipes la souplesse nécessaire pour concevoir de nouvelles expériences avec confiance.**"
      ],
      [
        "GRILLES DE MISE EN PAGE",
        "Les grilles structurent les interfaces de SyGo. **Elles définissent l’alignement, les espacements et l’organisation du contenu selon les tailles d’écran, pour des hiérarchies claires et des parcours prévisibles.** Ce système partagé permet à chaque produit de rester cohérent tout en **s’adaptant naturellement** aux usages sur ordinateur, tablette et mobile."
      ],
      [
        "COMPOSANTS",
        "Les composants sont les briques réutilisables de SyGo. Des boutons aux champs de formulaire, en passant par la navigation et la sélection, **chaque élément répond à un besoin récurrent avec cohérence et clarté.** La documentation des états, comportements et règles responsive **accélère la conception des interfaces et les rend plus simples à maintenir et plus fiables pour chacun.**"
      ],
      [
        "ÉCOSYSTÈME",
        "À partir des fondations de SyGo, l’écosystème numérique de Goupil réunit **des plateformes connectées conçues autour des besoins réels** des conducteurs, gestionnaires de flotte, techniciens, distributeurs et clients. De la configuration d’un véhicule à la maintenance et au support technique, **chaque plateforme répond à un moment précis du parcours**, pour une expérience de service plus cohérente, évolutive et tournée vers l’avenir."
      ],
      [
        "EXPÉRIENCES SÉLECTIONNÉES",
        "Ces écrans montrent comment l’écosystème prend forme sur différentes plateformes. **Chaque expérience transforme un besoin précis en une interface claire et concrète** : configurer un véhicule, trouver une pièce, suivre une demande ou consulter une information technique. **SyGo relie ces parcours distincts dans une expérience Goupil reconnaissable et cohérente.**"
      ],
      [
        "MODES",
        "Le système est conçu pour rester clair, familier et accessible en mode clair comme en mode sombre. Au-delà des couleurs, **chaque mode préserve la hiérarchie visuelle,** la lisibilité, les contrastes et le comportement des composants, **pour une expérience Goupil cohérente dans tous les environnements.**"
      ]
    ],
    "foundation": "Fondations",
    "component": "Composants",
    "foundationTitles": [
      "Palette de couleurs",
      "Police Google Sans",
      "Icônes Material Design par Google Fonts",
      "Google Fonts"
    ],
    "componentTitles": [
      "Icônes",
      "Boutons",
      "En-tête",
      "Recherche",
      "Contenu et progression",
      "Boutons d’action",
      "Sélection de langue",
      "Navigation segmentée",
      "Boutons numérotés et textuels",
      "Table des matières"
    ],
    "usability": "Critères d’utilisabilité",
    "ratings": [
      "critique",
      "insuffisant",
      "passable",
      "acceptable",
      "bon",
      "excellent"
    ],
    "criteria": [
      [
        "Clarté",
        "Le produit présente l’information de façon simple, compréhensible et sans ambiguïté.",
        "Exemple : libellés clairs, hiérarchie visuelle forte, peu de bruit visuel."
      ],
      [
        "Contrôle utilisateur",
        "Le produit permet d’annuler ou de modifier facilement une action.",
        "Exemple : annuler une action, modifier une demande ou revenir à l’étape précédente."
      ],
      [
        "Flexibilité",
        "Le produit s’adapte aux profils, usages et niveaux d’expertise.",
        "Exemple : accès simplifié pour les clients et fonctions avancées pour les techniciens."
      ],
      [
        "Prévention des erreurs",
        "Le produit anticipe les erreurs et accompagne l’utilisateur avant qu’elles surviennent.",
        "Exemple : validation des champs, vérification des données et avertissements avant une action sensible."
      ],
      [
        "Cohérence",
        "Le produit conserve les mêmes modèles, comportements et logiques d’interaction.",
        "Exemple : composants, terminologie et actions homogènes entre les services."
      ],
      [
        "Visibilité",
        "Le produit informe en continu de son état et des actions en cours.",
        "Exemple : état d’un ticket, progression d’une commande et indicateurs de chargement."
      ],
      [
        "Guidage",
        "Le produit aide à accomplir les tâches avec un minimum d’effort.",
        "Exemple : formulaires préremplis, suggestions automatiques et parcours guidés."
      ],
      [
        "Aide et support",
        "Le produit apporte les ressources nécessaires en cas de besoin.",
        "Exemple : documentation, tutoriels, FAQ et assistance technique."
      ]
    ],
    "example": "Exemple",
    "before": "Avant",
    "after": "Après",
    "explore": "Continuer l’exploration",
    "back": "Retour aux projets",
    "next": "Projet suivant",
    "zoom": "Ouvrir le visuel de l’interface"
  },
  "ՀԱՅ": {
    "introducing": "Ներկայացնում ենք",
    "discover": "Բացահայտել նախագիծը",
    "heading": [
      "Նախագծել ապագայի թվային էկոհամակարգը",
      "էլեկտրական աշխատանքային մեքենաների համար"
    ],
    "intro": [
      "1996 թվականից Goupil-ը ստեղծում է կոմպակտ էլեկտրական աշխատանքային մեքենաներ մասնագետների համար, **որոնց առօրյան հիմնված է հուսալիության, հարմարվողականության և արդյունավետության վրա։**",
      "Իմ պրակտիկայի ընթացքում ուսումնասիրեցի, **թե ինչպես կարող է Goupil-ի թվային էկոհամակարգը զարգանալ իր մեքենաների հետ։** Նախագիծը սկսվում է մի պարզ հարցից. **ինչպե՞ս կարող են թվային ծառայություններն ավելի լավ աջակցել օգտատերերին մեքենան օգտագործելուց առաջ, ընթացքում և հետո։**",
      "Աշխատանքը համադրում է **UX հետազոտություն, արտադրանքի ռազմավարություն և ինտերֆեյսների դիզայն։ Այն բացահայտում է մեքենայի օգտագործման ճանապարհին ներգրավված մարդկանց,** նրանց դերերը, սովորությունները, կարիքներն ու ակնկալիքները։ Այս բացահայտումներն ուղղորդում են **թվային հարթակների հնարավորությունները՝ գործող գործիքների արդիականացումից մինչև կապակցված մեքենաներով հնարավոր դարձող նոր ծառայություններ։**",
      "Փորձառությունները միասնական և ընդլայնելի դարձնելու համար ստեղծեցի նաև SyGo-ն՝ **դիզայն համակարգ, որը ընդհանուր հիմք է տրամադրում Goupil-ի ապագա թվային արտադրանքներին։**"
    ],
    "statements": [
      [
        "ԴԻԶԱՅՆ ՀԱՄԱԿԱՐԳ",
        "SyGo-ի ստեղծումը միայն բաղադրիչների հավաքում չէր։ Անհրաժեշտ էր **սահմանել ընդհանուր լեզու՝ Goupil-ի զարգացող թվային էկոհամակարգին աջակցելու համար**՝ հետազոտության արդյունքներից մինչև ապագա ծառայություններ։ Հստակ սկզբունքները, ընդլայնելի հիմքերն ու կրկնօգտագործվող ձևաչափերը ապահովում են միասնական, հասանելի և զարգացող փորձառություն՝ **պահպանելով կապը օգտատերերի իրական կարիքների հետ։**"
      ],
      [
        "ՀԻՄՔԵՐ",
        "SyGo-ի հիմքերը սահմանում են **յուրաքանչյուր ինտերֆեյսի հիմնական կանոնները։** Գույները, տառատեսակները, պատկերակները, միջակայքերը, թափանցիկությունը, եզրագծերն ու անկյունները միասին **ստեղծում են հստակ և ճանաչելի տեսողական լեզու։** Ընդհանուր չափանիշները պահպանում են արտադրանքների միասնականությունը՝ **թիմերին նոր փորձառություններ ստեղծելու ճկունություն տալով։**"
      ],
      [
        "ԴԱՍԱՎՈՐՄԱՆ ՑԱՆՑԵՐ",
        "Ցանցերը կառուցվածք են տալիս SyGo-ի ինտերֆեյսներին։ **Դրանք սահմանում են բովանդակության հավասարեցումը, միջակայքերն ու կազմակերպումը տարբեր էկրանների վրա՝ ստեղծելով հստակ հիերարխիա և կանխատեսելի ուղիներ։** Ընդհանուր համակարգը պահպանում է միասնականությունը՝ **բնականորեն հարմարվելով** համակարգչին, պլանշետին և հեռախոսին։"
      ],
      [
        "ԲԱՂԱԴՐԻՉՆԵՐ",
        "Բաղադրիչները SyGo-ի կրկնօգտագործվող կառուցողական մասերն են։ Կոճակներից և ձևերի դաշտերից մինչև նավարկում՝ **յուրաքանչյուր տարր հստակ և հետևողական լուծում է կրկնվող կարիքի համար։** Նկարագրված վիճակները, վարքագիծն ու հարմարվողական կանոնները **արագացնում են կառուցումը և հեշտացնում սպասարկումը՝ բարձրացնելով հուսալիությունը։**"
      ],
      [
        "ԷԿՈՀԱՄԱԿԱՐԳ",
        "SyGo-ի հիմքերի վրա Goupil-ի թվային էկոհամակարգը միավորում է **կապակցված հարթակներ՝ վարորդների, պարկի ղեկավարների, տեխնիկների, դիստրիբյուտորների և հաճախորդների իրական կարիքների համար։** Մեքենայի կազմաձևումից մինչև սպասարկում՝ **յուրաքանչյուր հարթակ լուծում է օգտատիրոջ ուղու որոշակի պահը**՝ ստեղծելով ավելի միասնական և ապագային պատրաստ ծառայություն։"
      ],
      [
        "ԸՆՏՐՎԱԾ ՓՈՐՁԱՌՈՒԹՅՈՒՆՆԵՐ",
        "Այս էկրանները ցույց են տալիս էկոհամակարգի իրականացումը տարբեր հարթակներում։ **Յուրաքանչյուր փորձառություն որոշակի կարիքը վերածում է հստակ և գործնական ինտերֆեյսի**՝ մեքենայի կազմաձևում, պահեստամասի որոնում, հարցման հետևում կամ տեխնիկական տեղեկության հասանելիություն։ **SyGo-ն այս ուղիները միավորում է ճանաչելի Goupil փորձառության մեջ։**"
      ],
      [
        "ՌԵԺԻՄՆԵՐ",
        "Համակարգը նախագծված է պարզ, ծանոթ և հասանելի մնալու բաց ու մուգ ռեժիմներում։ Գույներից բացի **յուրաքանչյուր ռեժիմ պահպանում է տեսողական հիերարխիան,** ընթեռնելիությունը, կոնտրաստն ու բաղադրիչների վարքագիծը՝ **միասնական փորձառություն ապահովելով ցանկացած միջավայրում։**"
      ]
    ],
    "foundation": "Հիմքեր",
    "component": "Բաղադրիչներ",
    "foundationTitles": [
      "Գույների ներկապնակ",
      "Google Sans տառատեսակ",
      "Material Design պատկերակներ՝ Google Fonts",
      "Google Fonts"
    ],
    "componentTitles": [
      "Պատկերակներ",
      "Կոճակներ",
      "Վերնամաս",
      "Որոնում",
      "Բովանդակություն և առաջընթաց",
      "Գործողության կոճակներ",
      "Լեզվի ընտրություն",
      "Հատվածային նավարկում",
      "Համարակալված և տեքստային կոճակներ",
      "Բովանդակության ցանկ"
    ],
    "usability": "Օգտագործելիության չափանիշներ",
    "ratings": [
      "կրիտիկական",
      "անբավարար",
      "միջին",
      "ընդունելի",
      "լավ",
      "գերազանց"
    ],
    "criteria": [
      [
        "Հստակություն",
        "Արտադրանքը տեղեկությունը ներկայացնում է պարզ և միանշանակ։",
        "Օրինակ՝ հստակ անվանումներ, ուժեղ տեսողական հիերարխիա և քիչ ավելորդ տարրեր։"
      ],
      [
        "Օգտատիրոջ վերահսկողություն",
        "Օգտատերը կարող է հեշտությամբ չեղարկել կամ փոխել գործողությունները։",
        "Օրինակ՝ փոփոխել հարցումը կամ վերադառնալ նախորդ քայլին։"
      ],
      [
        "Ճկունություն",
        "Արտադրանքը հարմարվում է տարբեր օգտատերերին ու փորձի մակարդակներին։",
        "Օրինակ՝ պարզ հասանելիություն հաճախորդների և ընդլայնված գործառույթներ տեխնիկների համար։"
      ],
      [
        "Սխալների կանխում",
        "Արտադրանքը կանխատեսում է սխալներն ու աջակցում դրանցից առաջ։",
        "Օրինակ՝ դաշտերի ստուգում և զգուշացում զգայուն գործողություններից առաջ։"
      ],
      [
        "Հետևողականություն",
        "Ինտերֆեյսները պահպանում են նույն վարքագիծն ու տրամաբանությունը։",
        "Օրինակ՝ միասնական բաղադրիչներ, բառապաշար և գործողություններ։"
      ],
      [
        "Տեսանելիություն",
        "Արտադրանքը շարունակաբար տեղեկացնում է վիճակի և ընթացքի մասին։",
        "Օրինակ՝ հարցման կարգավիճակ, պատվերի ընթացք և բեռնման ցուցիչներ։"
      ],
      [
        "Ուղղորդում",
        "Արտադրանքը օգնում է կատարել առաջադրանքները նվազագույն ջանքով։",
        "Օրինակ՝ նախալրացված ձևեր, ավտոմատ առաջարկներ և ուղղորդված քայլեր։"
      ],
      [
        "Օգնություն և աջակցություն",
        "Արտադրանքը տրամադրում է անհրաժեշտ օժանդակ ռեսուրսներ։",
        "Օրինակ՝ փաստաթղթեր, ուսուցումներ, հաճախակի հարցեր և տեխնիկական աջակցություն։"
      ]
    ],
    "example": "Օրինակ",
    "before": "Մինչև",
    "after": "Հետո",
    "explore": "Շարունակել բացահայտումը",
    "back": "Վերադառնալ նախագծերին",
    "next": "Հաջորդ նախագիծ",
    "zoom": "Բացել ինտերֆեյսի պատկերը"
  }
};
