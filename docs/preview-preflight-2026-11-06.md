# Préparation de la publication — 6 novembre 2026

## Périmètre

Contrôle de `/renaultextensionapp`, `/stratosapp`, `/googlemapsextension`,
`/googleplayonios` et `/goupildigitalecosystem`, ainsi que des transitions communes,
du header mobile et des protections HTTP existantes. Publication sur `future`
uniquement : aucune promotion en production.

## Corrections

- Stratos : variantes WebP 960/2400/4096 px, dimensions explicites, décodage
  asynchrone et suppression du vide transparent sous les rangées de téléphones.
  Les sources d'origine sont conservées. Le recadrage conserve les 1670 px déjà
  prévus par le conteneur ; les sept rangées occupent les lignes 6 à 1665.
  Les sept variantes 960 px totalisent 338 336 octets contre 2 370 602 octets
  pour les anciens WebP, soit environ 86 % de moins. Il s'agit du poids des
  fichiers, pas d'une promesse de gain équivalent sur le temps de chargement.
- Renault : dimensions explicites des fonds ; fond de l'introduction chargé à
  l'approche de sa section plutôt qu'en concurrence avec la couverture.
- Goupil : vidéo arrêtée hors écran, onglet masqué ou préférence de réduction des
  animations ; affiche statique conservée si la lecture est indisponible.
- Goupil : boutons de navigation mobile alignés sur les autres projets.
- Transitions : la phase d'arrivée commence lorsque la destination est réellement
  montée, et non à une échéance fixe qui pouvait expirer avant la navigation.
- Header : espacement corrigé à 320 px, notamment avec le libellé arménien du CV.
- Cache : inclusion des affiches AVIF et du mockup mobile dans les règles d'assets.
- Polices : désactivation de l'ajustement automatique de repli non pris en charge
  par les deux polices ; familles de repli explicites inchangées.
- Outillage : correction de six alertes modérées par verrouillage ciblé de
  `minimatch` 11.0.1 sous `@typescript-eslint/typescript-estree`.
  Référence : https://github.com/advisories/GHSA-g3hv-75wg-m249

## Vérifications

- Installation indépendante (`npm ci --ignore-scripts`), ESLint, TypeScript,
  compilation des 37 routes et tests HTTP du site compilé.
- `npm audit` : zéro vulnérabilité connue, production et développement inclus.
- Cinq projets : un seul titre principal, un seul repère principal, liens de
  retour présents, aucun identifiant HTML dupliqué dans le rendu initial.
- 264 ressources des projets, 21 fichiers de composants, 70 ressources internes
  et 49 exports visuels contrôlés sans fichier manquant.
- Images adaptatives Stratos et cache AVIF/mockup contrôlés par les tests.
- Contrôle navigateur des cinq projets à 1440 px en anglais et 320 px en arménien :
  pas de débordement horizontal ; header sans changement de thème sur ces pages.
- Menu mobile : blocage du scroll et superposition au-dessus du contenu vérifiés.
- Vidéo Goupil en pause à la fin de la page ; footer raccordé au fond final.
- Version finale : téléphones Stratos complets, variante 960 px sélectionnée sur
  mobile, boutons Goupil de 48 px de haut, répétition du parcours logo → accueil
  → découverte → projets réussie, aucune erreur dans la console de ce parcours.

## Limites

Ce contrôle n'est ni une certification d'accessibilité ni la garantie qu'aucun
défaut ne subsiste. Il ne comprend pas de nouvelle comparaison exhaustive avec
les fichiers Figma. Aucun score Lighthouse, INP, CLS ou LCP de production n'est
annoncé : aucun outil de trace navigateur n'était disponible dans cette session.
Une campagne de mesures réseau/mobile réelles reste à effectuer pour valider
ces métriques sur le domaine final après publication autorisée.

## Mise à jour du catalogue

Interface Projects : Renault, Google Maps, Stratos, Intratone, iOS 26, Wave Switch.
Design System Projects : Goupil, Google Play on iOS. Le troisième groupe reste
inchangé. Les liens de projet suivant, les plans du site et `llms.txt` suivent
ce classement. Framasoft et ses 14 visuels sont retirés ; l'ancienne page redirige
vers le catalogue. Ces fichiers restent récupérables dans l'historique Git.

Le lecteur Spotify Namequest compact sombre (152 px) est restauré et vérifié en
navigateur. La permission d'intégration Spotify est limitée à cette seule route ;
un lien direct reste disponible. Libellés français, anglais et arménien mis à jour.
