/**
 * Auto-reply — contact@romainrubens.com
 * Google Apps Script — à coller sur script.google.com
 *
 * INSTALLATION :
 *  1. Ouvre script.google.com (connecté au compte Gmail de hello@)
 *  2. Crée un nouveau projet (différent de celui de report@)
 *  3. Colle ce fichier entier
 *  4. Enregistre (Cmd+S)
 *  5. Menu déroulant → setupTrigger → Exécuter (une seule fois)
 *  6. Accepte les permissions
 */

// ─── Constantes ───────────────────────────────────────────────────────────────

var LABEL_NAME    = "Auto-replied-contact";
var FROM_NAME     = "Romain Rubens";
var REPLY_FROM    = "noreply@romainrubens.com";
var WATCH_ADDRESS = "contact@romainrubens.com";
var START_DATE    = "2026/04/14";

// ─── Citations (20) ───────────────────────────────────────────────────────────
// Rotation aléatoire sans répétition avant 15 autres (via PropertiesService)

var QUOTES = [
  {
    fr: "\u201cUn bon design est aussi peu de design que possible.\u201d",
    en: "\u201cGood design is as little design as possible.\u201d",
    author: "Dieter Rams"
  },
  {
    fr: "\u201cLe design, c\u2019est la pens\u00e9e rendue visible.\u201d",
    en: "\u201cDesign is thinking made visual.\u201d",
    author: "Paul Rand"
  },
  {
    fr: "\u201cLes d\u00e9tails ne sont pas les d\u00e9tails. Ils constituent le design.\u201d",
    en: "\u201cThe details are not the details. They make the design.\u201d",
    author: "Charles Eames"
  },
  {
    fr: "\u201cUne solution brillante \u00e0 un mauvais probl\u00e8me peut \u00eatre pire qu\u2019aucune solution.\u201d",
    en: "\u201cA brilliant solution to the wrong problem can be worse than no solution at all.\u201d",
    author: "Donald Norman"
  },
  {
    fr: "\u201cLe design ne se limite pas \u00e0 l\u2019apparence. Le design, c\u2019est aussi le fonctionnement.\u201d",
    en: "\u201cDesign is not just what it looks like and feels like. Design is how it works.\u201d",
    author: "Steve Jobs"
  },
  {
    fr: "\u201cLa vie d\u2019un designer est une vie de combat contre la laideur.\u201d",
    en: "\u201cThe life of a designer is a life of fight against the ugliness.\u201d",
    author: "Massimo Vignelli"
  },
  {
    fr: "\u201cIl y a trois r\u00e9ponses \u00e0 un design\u00a0: oui, non, et WOW\u00a0! C\u2019est le WOW qu\u2019il faut viser.\u201d",
    en: "\u201cThere are three responses to a piece of design \u2013 yes, no, and WOW! Wow is the one to aim for.\u201d",
    author: "Milton Glaser"
  },
  {
    fr: "\u201cLes gens ignorent les designs qui ignorent les gens.\u201d",
    en: "\u201cPeople ignore design that ignores people.\u201d",
    author: "Frank Chimero"
  },
  {
    fr: "\u201cLa simplicit\u00e9 consiste \u00e0 soustraire l\u2019\u00e9vident et \u00e0 ajouter ce qui a du sens.\u201d",
    en: "\u201cSimplicity is about subtracting the obvious and adding the meaningful.\u201d",
    author: "John Maeda"
  },
  {
    fr: "\u201cAussi r\u00e9ussie que soit votre interface, elle serait meilleure avec moins d\u2019\u00e9l\u00e9ments.\u201d",
    en: "\u201cNo matter how cool your interface is, it would be better if there were less of it.\u201d",
    author: "Alan Cooper"
  },
  {
    fr: "\u201cLa simplicit\u00e9 n\u2019est pas l\u2019absence de d\u00e9sordre \u2014 c\u2019en est une cons\u00e9quence.\u201d",
    en: "\u201cSimplicity is not the absence of clutter, that\u2019s a consequence of simplicity.\u201d",
    author: "Jony Ive"
  },
  {
    fr: "\u201cL\u2019encombrement et la confusion sont des \u00e9checs du design, non des attributs de l\u2019information.\u201d",
    en: "\u201cClutter and confusion are failures of design, not attributes of information.\u201d",
    author: "Edward Tufte"
  },
  {
    fr: "\u201cQuand je travaille sur un probl\u00e8me, je ne pense jamais \u00e0 la beaut\u00e9. Mais si ma solution n\u2019est pas belle, je sais qu\u2019elle est fausse.\u201d",
    en: "\u201cWhen I am working on a problem, I never think about beauty. But when I have finished, if the solution is not beautiful, I know it is wrong.\u201d",
    author: "Buckminster Fuller"
  },
  {
    fr: "\u201cQuand le point de contact entre le produit et les personnes devient un point de friction, le designer a \u00e9chou\u00e9.\u201d",
    en: "\u201cWhen the point of contact between the product and the people becomes a point of friction, then the designer has failed.\u201d",
    author: "Henry Dreyfuss"
  },
  {
    fr: "\u201cLe design est l\u2019effort conscient d\u2019imposer un ordre significatif.\u201d",
    en: "\u201cDesign is the conscious effort to impose a meaningful order.\u201d",
    author: "Victor Papanek"
  },
  {
    fr: "\u201cJe veux cr\u00e9er de belles choses, m\u00eame si personne ne s\u2019en soucie.\u201d",
    en: "\u201cI want to make beautiful things, even if nobody cares.\u201d",
    author: "Saul Bass"
  },
  {
    fr: "\u201cUn bon design est honn\u00eate.\u201d",
    en: "\u201cGood design is honest.\u201d",
    author: "Dieter Rams"
  },
  {
    fr: "\u201cN\u2019ayez rien chez vous que vous ne sachiez utile ou ne croyiez beau.\u201d",
    en: "\u201cHave nothing in your houses that you do not know to be useful, or believe to be beautiful.\u201d",
    author: "William Morris"
  },
  {
    fr: "\u201cIl ne suffit pas de concevoir des produits fonctionnels et utilisables. Il faut aussi cr\u00e9er des produits qui apportent joie, enthousiasme et beaut\u00e9 dans la vie des gens.\u201d",
    en: "\u201cIt\u2019s not enough that we build products that function and are usable. We also need to build products that bring joy and excitement, pleasure and fun, and, yes, beauty to people\u2019s lives.\u201d",
    author: "Don Norman"
  },
  {
    fr: "\u201cLe design n\u2019est pas une profession, c\u2019est une attitude.\u201d",
    en: "\u201cDesign is not a profession but an attitude.\u201d",
    author: "L\u00e1szl\u00f3 Moholy-Nagy"
  }
];

function getRandomQuote() {
  var props   = PropertiesService.getScriptProperties();
  var rawRecent = props.getProperty("recentQuotes");
  var recent  = rawRecent ? JSON.parse(rawRecent) : [];

  // Indices disponibles (pas dans les 15 derniers)
  var available = [];
  for (var i = 0; i < QUOTES.length; i++) {
    if (recent.indexOf(i) === -1) available.push(i);
  }
  // Sécurité : si tout est dans recent (ne devrait pas arriver), on repart de zéro
  if (available.length === 0) {
    available = [];
    for (var j = 0; j < QUOTES.length; j++) available.push(j);
    recent = [];
  }

  var idx = available[Math.floor(Math.random() * available.length)];
  recent.push(idx);
  if (recent.length > 15) recent.shift();
  props.setProperty("recentQuotes", JSON.stringify(recent));

  return QUOTES[idx];
}

// ─── Détection de langue ──────────────────────────────────────────────────────

function detectLanguage(text) {
  var frenchPattern = /\b(bonjour|bonsoir|bonne\s|salut|merci|cordialement|je\s|vous\s|nous\s|mon\s|ma\s|mes\s|votre\s|notre\s|le\s|la\s|les\s|de\s|du\s|un\s|une\s|est\s|sont\s|avec\s|pour\s|sur\s|dans\s|qui\s|que\s|quoi|comment|bien|jour|soir|nuit)\b/i;
  return frenchPattern.test(text) ? "FR" : "EN";
}

// ─── Contenu selon la langue ──────────────────────────────────────────────────

var content = {
  FR: {
    subject:      "Message bien re\u00e7u\u00a0!",
    preheader:    "Votre message a bien \u00e9t\u00e9 re\u00e7u. Je reviendrai vers vous d\u00e8s que possible.",
    heading:      "Votre message a bien \u00e9t\u00e9 re\u00e7u",
    body:         "Merci pour votre message. Une r\u00e9ponse vous sera apport\u00e9e en fonction de votre demande.",
    // "à" attaché par &nbsp; pour éviter la rupture de ligne sur mobile
    purposeLabel: "Cette adresse est d\u00e9di\u00e9e\u00a0\u00e0",
    purposeItems: [
      "Demandes de ressources",
      "Questions d\u2019accessibilit\u00e9",
      "Demandes d\u2019information compl\u00e9mentaire",
      "Demandes particuli\u00e8res"
    ],
    reportLabel:  "Un signalement \u00e0 effectuer\u00a0?",
    reportText:   "Pour tout signalement (bug, contenu inappropri\u00e9, probl\u00e8me technique), merci de vous adresser \u00e0 <a href=\"mailto:report@romainrubens.com\" style=\"color:#314DCB;text-decoration:none;font-weight:600;\">report@romainrubens.com</a>. Cette adresse est aliment\u00e9e par intelligence artificielle, ce qui permet de prioriser les demandes et d\u2019apporter, le cas \u00e9ch\u00e9ant, une correction automatis\u00e9e.",
    cta:          "Explorer le portfolio &rarr;",
    invite:       "En attendant, n\u2019h\u00e9sitez pas \u00e0 consulter mon portfolio et mes travaux.",
    noticeLabel:  "R\u00e9ponse automatique",
    noticeText:   "Ce message est g\u00e9n\u00e9r\u00e9 automatiquement depuis une adresse qui ne re\u00e7oit pas de r\u00e9ponses. Merci de ne pas r\u00e9pondre \u00e0 cet email.",
    footerNote:   "Ce message est envoy\u00e9 depuis une adresse qui ne re\u00e7oit pas de r\u00e9ponses."
  },
  EN: {
    subject:      "Message received!",
    preheader:    "Your message has been received. I will get back to you as soon as possible.",
    heading:      "Your message has been received",
    body:         "Thank you for your message. A response will be provided based on the nature of your request.",
    purposeLabel: "This address handles",
    purposeItems: [
      "Resource requests",
      "Accessibility inquiries",
      "Requests for additional information",
      "Special requests"
    ],
    reportLabel:  "Need to file a report?",
    reportText:   "For any report (bug, inappropriate content, technical issue), please reach out to <a href=\"mailto:report@romainrubens.com\" style=\"color:#314DCB;text-decoration:none;font-weight:600;\">report@romainrubens.com</a>. This address is powered by artificial intelligence, which allows requests to be prioritized and, where applicable, automatically handled.",
    cta:          "Explore the portfolio &rarr;",
    invite:       "In the meantime, feel free to browse my portfolio and work.",
    noticeLabel:  "Automated reply",
    noticeText:   "This message has been automatically generated from an address that does not accept replies. Please do not reply to this email.",
    footerNote:   "This message was sent from an address that does not accept replies."
  }
};

// ─── Détection email commercial / automatique ────────────────────────────────

function isCommercialOrAutomated(msg) {
  if (msg.getHeader("List-Unsubscribe")) return true;
  var precedence = msg.getHeader("Precedence") || "";
  if (/bulk|list|junk/i.test(precedence)) return true;
  var autoSubmitted = msg.getHeader("Auto-Submitted") || "";
  if (autoSubmitted && autoSubmitted.toLowerCase() !== "no") return true;
  if (msg.getHeader("X-Auto-Response-Suppress")) return true;
  var from = msg.getFrom().toLowerCase();
  if (/noreply|no-reply|donotreply|do-not-reply|newsletter|notification|notifications|mailer|marketing|campaigns|bounce/i.test(from)) return true;
  return false;
}

// ─── Salutation selon l'heure ─────────────────────────────────────────────────

function getGreeting(lang, emailDate, firstName) {
  var hour = emailDate.getHours();
  var isEvening = hour >= 18 || hour < 6;
  if (!firstName) return "";
  if (lang === "FR") {
    return (isEvening ? "Bonsoir" : "Bonjour") + " " + firstName + ",<br><br>";
  } else {
    var salut = (hour >= 18 || hour < 6) ? "Good evening" : (hour >= 12 ? "Good afternoon" : "Good morning");
    return salut + " " + firstName + ",<br><br>";
  }
}

// ─── Template HTML ─────────────────────────────────────────────────────────────

function getHtmlBody(firstName, lang, emailDate, quote) {
  var t        = content[lang] || content["EN"];
  var greeting = getGreeting(lang, emailDate, firstName);
  var quoteText = lang === "FR" ? quote.fr : quote.en;

  // Liste des items de l'adresse dédiée
  var listItems = "";
  for (var k = 0; k < t.purposeItems.length; k++) {
    listItems += '<li style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#3c3c43;" class="text-body">' + t.purposeItems[k] + '</li>';
  }

  var html = '<!DOCTYPE html>' +
    '<html lang="' + (lang === "FR" ? "fr" : "en") + '" xmlns="http://www.w3.org/1999/xhtml">' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1.0">' +
    '<title>' + t.heading + ' \u2014 Romain Rubens</title>' +
    '<style>' +
    '@media (prefers-color-scheme: dark) {' +
    '.body-bg    { background-color: #1c1c1e !important; }' +
    '.footer-bg  { background-color: #2c2c2e !important; border-top-color: #3a3a3c !important; }' +
    '.blue-bg    { background-color: #5194FF !important; }' +
    '.blue-text  { color: #5194FF !important; }' +
    '.info-box   { background-color: #1a2147 !important; }' +
    '.quote-box  { background-color: #1a1a1c !important; border-left-color: #5194FF !important; }' +
    '.report-box { background-color: #1e1e20 !important; border-color: #3a3a3c !important; }' +
    '.notice-box { background-color: #2c2c2e !important; border-color: #3a3a3c !important; }' +
    '.divider    { background-color: #3a3a3c !important; }' +
    '.text-main  { color: #f2f2f7 !important; }' +
    '.text-body  { color: #ebebf599 !important; }' +
    '.text-muted { color: #8e8e93 !important; }' +
    '.text-quote { color: #c7c7cc !important; }' +
    '.text-footer-link { color: #636366 !important; }' +
    '.card-border { border-color: #3a3a3c !important; }' +
    '}' +
    '</style>' +
    '</head>' +
    '<body style="margin:0;padding:0;background-color:transparent;">' +

    '<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">' + t.preheader + '</div>' +

    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td align="center" style="padding:48px 16px;">' +

    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="card-border" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06);border:1px solid #e5e5ea;">' +

    // HEADER
    '<tr><td class="blue-bg" style="background-color:#314DCB;padding:48px 48px 40px;text-align:center;">' +
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">' +
    '<tr><td style="width:72px;height:72px;background-color:#ffffff;border-radius:18px;text-align:center;vertical-align:middle;">' +
    '<img src="https://romainrubens.com/icons/android-chrome-192x192.png" width="52" height="52" alt="RR" style="display:block;margin:10px auto;border:0;width:52px;height:52px;object-fit:contain;border-radius:10px;">' +
    '</td></tr></table>' +
    '<h1 style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Romain Rubens</h1>' +
    '<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.68);">UI/UX Designer \u2013 Smart Home</p>' +
    '</td></tr>' +

    // BODY
    '<tr><td class="body-bg" style="background-color:#ffffff;padding:48px 48px 40px;">' +

    '<h2 class="text-main" style="margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;color:#0f0f12;letter-spacing:-0.2px;">' + t.heading + '</h2>' +
    '<p class="text-body" style="margin:0 0 28px;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#3c3c43;">' + greeting + t.body + '</p>' +

    // Citation
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">' +
    '<tr><td class="quote-box" style="padding:16px 20px;border-left:3px solid #314DCB;">' +
    '<p class="text-quote" style="margin:0 0 8px;font-family:Georgia,\'Times New Roman\',Times,serif;font-size:15px;font-style:italic;line-height:1.7;color:#3c3c43;">' + quoteText + '</p>' +
    '<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:12px;font-style:italic;color:#8e8e93;">\u2014 ' + quote.author + '</p>' +
    '</td></tr></table>' +

    // Purpose box
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:12px;background-color:#f0f3ff;margin-bottom:24px;">' +
    '<tr><td class="info-box" style="padding:20px 24px;">' +
    '<p class="blue-text" style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;color:#314DCB;text-transform:uppercase;letter-spacing:0.1em;white-space:nowrap;">' + t.purposeLabel + '</p>' +
    '<ul style="margin:0;padding:0 0 0 18px;">' + listItems + '</ul>' +
    '</td></tr></table>' +

    // Report box
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:12px;background-color:#fafafa;border:1px solid #e5e5ea;margin-bottom:32px;">' +
    '<tr><td class="report-box" style="padding:20px 24px;">' +
    '<p class="text-muted" style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;color:#8e8e93;text-transform:uppercase;letter-spacing:0.08em;">' + t.reportLabel + '</p>' +
    '<p class="text-body" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.65;color:#3c3c43;">' + t.reportText + '</p>' +
    '</td></tr></table>' +

    '<p class="text-body" style="margin:0 0 36px;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#3c3c43;">' + t.invite + '</p>' +

    // CTA
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 36px;">' +
    '<tr><td class="blue-bg" style="border-radius:100px;background-color:#314DCB;text-align:center;">' +
    '<a href="https://romainrubens.com" style="display:inline-block;padding:15px 36px;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;white-space:nowrap;">' + t.cta + '</a>' +
    '</td></tr></table>' +

    // Divider
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td class="divider" style="height:1px;background-color:#e5e5ea;"></td></tr>' +
    '</table>' +

    // Notice
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">' +
    '<tr><td class="notice-box" style="padding:18px 20px;background-color:#fafafa;border-radius:10px;border:1px solid #e5e5ea;">' +
    '<p class="text-muted" style="margin:0 0 5px;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;color:#8e8e93;text-transform:uppercase;letter-spacing:0.08em;">' + t.noticeLabel + '</p>' +
    '<p class="text-muted" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#636366;">' + t.noticeText + '</p>' +
    '</td></tr></table>' +

    '</td></tr>' +

    // LINKS
    '<tr><td class="footer-bg" style="background-color:#f9f9fb;padding:24px 48px 20px;border-top:1px solid #e5e5ea;text-align:center;">' +
    '<a href="https://romainrubens.com" class="blue-text" style="font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:#314DCB;font-size:13px;font-weight:500;text-decoration:none;margin:0 10px;">Portfolio</a>' +
    '<span style="color:#d1d1d6;">&middot;</span>' +
    '<a href="https://romainrubens.com/contact" class="blue-text" style="font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:#314DCB;font-size:13px;font-weight:500;text-decoration:none;margin:0 10px;">Contact</a>' +
    '<span style="color:#d1d1d6;">&middot;</span>' +
    '<a href="https://www.linkedin.com/in/romain-rubens-ba660323b/" class="blue-text" style="font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:#314DCB;font-size:13px;font-weight:500;text-decoration:none;margin:0 10px;">LinkedIn</a>' +
    '<span style="color:#d1d1d6;">&middot;</span>' +
    '<a href="https://www.behance.net/rubensromain" class="blue-text" style="font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:#314DCB;font-size:13px;font-weight:500;text-decoration:none;margin:0 10px;">Behance</a>' +
    '</td></tr>' +

    // FOOTER
    '<tr><td class="footer-bg" style="background-color:#f9f9fb;padding:0 48px 36px;text-align:center;">' +
    '<p class="text-footer-link" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.7;color:#aeaeb2;">' +
    '&copy; 2026 Romain Rubens &nbsp;&middot;&nbsp;' +
    '<a href="https://romainrubens.com" class="text-footer-link" style="color:#aeaeb2;text-decoration:none;">romainrubens.com</a><br>' +
    t.footerNote +
    '</p></td></tr>' +

    '</table>' +
    '</td></tr></table>' +
    '</body></html>';

  return html;
}

// ─── Logique principale ────────────────────────────────────────────────────────

// Date à partir de laquelle le script traite les emails.
// Mettre la date du jour de l'installation pour ne pas traiter les anciens emails.
var START_DATE = "2026/04/14";

function checkAndReply() {
  var label = GmailApp.getUserLabelByName(LABEL_NAME);
  if (!label) label = GmailApp.createLabel(LABEL_NAME);

  var query   = "deliveredto:" + WATCH_ADDRESS + " -label:" + LABEL_NAME + " after:" + START_DATE;
  var threads = GmailApp.search(query, 0, 20);

  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    try {
      var messages = thread.getMessages();
      var firstMsg = messages[0];

      // Ignorer les emails commerciaux, newsletters, envois automatiques
      if (isCommercialOrAutomated(firstMsg)) {
        thread.addLabel(label);
        Logger.log("\u23ED\uFE0F Skipped (commercial/automated): " + firstMsg.getFrom());
        continue;
      }

      var textToAnalyze = (firstMsg.getSubject() || "") + " " + (firstMsg.getPlainBody() || "");
      var lang = detectLanguage(textToAnalyze);

      var fromRaw    = firstMsg.getFrom();
      var nameMatch  = fromRaw.match(/^([^<"]+?)(?:\s*<|$)/);
      var firstName  = nameMatch ? nameMatch[1].trim().split(" ")[0] : "";

      var replyToAddress = firstMsg.getReplyTo() || firstMsg.getFrom();
      var t              = content[lang] || content["EN"];
      var replySubject   = t.subject;
      var quote          = getRandomQuote();

      GmailApp.sendEmail(replyToAddress, replySubject, "", {
        htmlBody: getHtmlBody(firstName, lang, firstMsg.getDate(), quote),
        name:     FROM_NAME,
        from:     REPLY_FROM,
        replyTo:  REPLY_FROM,
        headers:  {
          "Precedence":               "first-class",
          "X-Auto-Response-Suppress": "OOF, AutoReply"
        }
      });

      thread.addLabel(label);
      Logger.log("\u2705 Auto-reply [" + lang + "] sent to: " + replyToAddress + " | quote: " + quote.author);
    } catch (err) {
      Logger.log("\u274C Error on thread: " + err);
    }
  }
}

// ─── Setup du déclencheur ─────────────────────────────────────────────────────
// Lancer UNE SEULE FOIS manuellement : menu déroulant → setupTrigger → Exécuter

function setupTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "checkAndReply") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger("checkAndReply")
    .timeBased()
    .everyMinutes(1)
    .create();
  Logger.log("\u2705 Trigger cr\u00e9\u00e9 : checkAndReply toutes les minutes");
}
