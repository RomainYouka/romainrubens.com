/**
 * Auto-reply — report@romainrubens.com
 * Google Apps Script — à coller sur script.google.com
 *
 * INSTALLATION :
 *  1. Ouvre script.google.com (connecté au compte Gmail de hello@)
 *  2. Colle ce fichier entier
 *  3. Enregistre (Cmd+S)
 *  4. Menu déroulant → setupTrigger → Exécuter (une seule fois)
 *  5. Accepte les permissions
 */

// ─── Constantes ───────────────────────────────────────────────────────────────

const LABEL_NAME    = "Auto-replied";
const FROM_NAME     = "Romain Rubens";
const REPLY_FROM    = "noreply@romainrubens.com";
const WATCH_ADDRESS = "report@romainrubens.com";
const SUBJECT_PREFIX = "Re: ";

// ─── Détection de langue ──────────────────────────────────────────────────────

function detectLanguage(text) {
  const frenchPattern = /\b(bonjour|bonsoir|bonne\s|salut|merci|cordialement|je\s|vous\s|nous\s|mon\s|ma\s|mes\s|votre\s|notre\s|le\s|la\s|les\s|de\s|du\s|un\s|une\s|est\s|sont\s|avec\s|pour\s|sur\s|dans\s|qui\s|que\s|quoi|comment|bien|bonne\s|jour|soir|nuit)\b/i;
  return frenchPattern.test(text) ? "FR" : "EN";
}

// ─── Contenu selon la langue ──────────────────────────────────────────────────

const content = {
  FR: {
    subject: "Message bien reçu !",
    preheader: "Votre message a bien été reçu. Une réponse vous sera apportée sous 2 jours si nécessaire.",
    heading: "Votre message a bien été reçu",
    body: "Merci de m'avoir contacté. Votre message a été réceptionné avec succès et sera examiné dans les meilleurs délais.",
    delayLabel: "Délai de réponse",
    delayText: "Si votre demande nécessite une réponse, elle vous sera apportée <strong>sous 2 jours calendaires</strong>.",
    cta: "Explorer le portfolio &rarr;",
    invite: "En attendant, n'hésitez pas à consulter mon portfolio et mes travaux.",
    noticeLabel: "Réponse automatique",
    noticeText: "Ce message est généré automatiquement depuis une adresse qui ne reçoit pas de réponses. Merci de ne pas répondre à cet email.",
    footerNote: "Ce message est envoyé depuis une adresse qui ne reçoit pas de réponses.",
  },
  EN: {
    subject: "Message received!",
    preheader: "Your message has been received. A reply will be sent within 2 calendar days if needed.",
    heading: "Your message has been received",
    body: "Thank you for reaching out. Your message has been successfully received and will be reviewed as soon as possible.",
    delayLabel: "Response time",
    delayText: "If your request requires a reply, you will hear back <strong>within 2 calendar days</strong>.",
    cta: "Explore the portfolio &rarr;",
    invite: "In the meantime, feel free to browse my portfolio and work.",
    noticeLabel: "Automated reply",
    noticeText: "This message has been automatically generated from an address that does not accept replies. Please do not reply to this email.",
    footerNote: "This message was sent from an address that does not accept replies.",
  },
};

// ─── Salutation selon l'heure ─────────────────────────────────────────────────

function getGreeting(lang, emailDate, firstName) {
  const hour = emailDate.getHours(); // heure dans le fuseau du compte Gmail
  const isEvening = hour >= 18 || hour < 6;

  if (!firstName) return "";

  if (lang === "FR") {
    return `${isEvening ? "Bonsoir" : "Bonjour"} ${firstName},<br><br>`;
  } else {
    const salut = hour >= 18 || hour < 6 ? "Good evening" : hour >= 12 ? "Good afternoon" : "Good morning";
    return `${salut} ${firstName},<br><br>`;
  }
}

// ─── Template HTML ─────────────────────────────────────────────────────────────

function getHtmlBody(firstName, lang, emailDate) {
  const t = content[lang] || content["EN"];
  const greeting = getGreeting(lang, emailDate, firstName);

  return `<!DOCTYPE html>
<html lang="${lang === "FR" ? "fr" : "en"}" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${t.heading} — Romain Rubens</title>
<style>
  @media (prefers-color-scheme: dark) {
    .body-bg    { background-color: #1c1c1e !important; }
    .footer-bg  { background-color: #2c2c2e !important; border-top-color: #3a3a3c !important; }
    .blue-bg    { background-color: #5194FF !important; }
    .blue-text  { color: #5194FF !important; }
    .info-box   { background-color: #1a2147 !important; }
    .notice-box { background-color: #2c2c2e !important; border-color: #3a3a3c !important; }
    .divider    { background-color: #3a3a3c !important; }
    .text-main  { color: #f2f2f7 !important; }
    .text-body  { color: #ebebf5b3 !important; }
    .text-muted { color: #8e8e93 !important; }
    .text-footer-link { color: #636366 !important; }
    .card-border { border-color: #3a3a3c !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:transparent;">

<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${t.preheader}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" style="padding:48px 16px;">

  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
    class="card-border"
    style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;
           box-shadow:0 8px 40px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06);
           border:1px solid #e5e5ea;">

    <!-- HEADER -->
    <tr>
      <td class="blue-bg" style="background-color:#314DCB;padding:48px 48px 40px;text-align:center;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
          <tr>
            <td style="width:72px;height:72px;background-color:#ffffff;border-radius:18px;text-align:center;vertical-align:middle;">
              <img src="https://romainrubens.com/icons/android-chrome-192x192.png" width="52" height="52" alt="RR" style="display:block;margin:10px auto;border:0;width:52px;height:52px;object-fit:contain;border-radius:10px;">
            </td>
          </tr>
        </table>
        <h1 style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Romain Rubens</h1>
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.68);">UI/UX Designer – Smart Home</p>
      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td class="body-bg" style="background-color:#ffffff;padding:48px 48px 40px;">
        <h2 class="text-main" style="margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;color:#0f0f12;letter-spacing:-0.2px;">${t.heading}</h2>
        <p class="text-body" style="margin:0 0 28px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#3c3c43;">${greeting}${t.body}</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="border-radius:12px;background-color:#f0f3ff;margin-bottom:32px;">
          <tr>
            <td class="info-box" style="padding:20px 24px;">
              <p class="blue-text" style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;color:#314DCB;text-transform:uppercase;letter-spacing:0.1em;">${t.delayLabel}</p>
              <p class="text-main" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#0f0f12;">${t.delayText}</p>
            </td>
          </tr>
        </table>

        <p class="text-body" style="margin:0 0 36px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#3c3c43;">${t.invite}</p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 36px;">
          <tr>
            <td class="blue-bg" style="border-radius:100px;background-color:#314DCB;text-align:center;">
              <a href="https://romainrubens.com"
                style="display:inline-block;padding:15px 36px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;white-space:nowrap;">${t.cta}</a>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td class="divider" style="height:1px;background-color:#e5e5ea;"></td></tr>
        </table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
          <tr>
            <td class="notice-box" style="padding:18px 20px;background-color:#fafafa;border-radius:10px;border:1px solid #e5e5ea;">
              <p class="text-muted" style="margin:0 0 5px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;color:#8e8e93;text-transform:uppercase;letter-spacing:0.08em;">${t.noticeLabel}</p>
              <p class="text-muted" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#636366;">${t.noticeText}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- LINKS -->
    <tr>
      <td class="footer-bg" style="background-color:#f9f9fb;padding:24px 48px 20px;border-top:1px solid #e5e5ea;text-align:center;">
        <a href="https://romainrubens.com" class="blue-text" style="font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;color:#314DCB;font-size:13px;font-weight:500;text-decoration:none;margin:0 10px;">Portfolio</a>
        <span style="color:#d1d1d6;">·</span>
        <a href="https://romainrubens.com/contact" class="blue-text" style="font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;color:#314DCB;font-size:13px;font-weight:500;text-decoration:none;margin:0 10px;">Contact</a>
        <span style="color:#d1d1d6;">·</span>
        <a href="https://www.linkedin.com/in/romain-rubens-ba660323b/" class="blue-text" style="font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;color:#314DCB;font-size:13px;font-weight:500;text-decoration:none;margin:0 10px;">LinkedIn</a>
        <span style="color:#d1d1d6;">·</span>
        <a href="https://www.behance.net/rubensromain" class="blue-text" style="font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;color:#314DCB;font-size:13px;font-weight:500;text-decoration:none;margin:0 10px;">Behance</a>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td class="footer-bg" style="background-color:#f9f9fb;padding:0 48px 36px;text-align:center;">
        <p class="text-footer-link" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.7;color:#aeaeb2;">
          &copy; 2026 Romain Rubens &nbsp;&middot;&nbsp;
          <a href="https://romainrubens.com" class="text-footer-link" style="color:#aeaeb2;text-decoration:none;">romainrubens.com</a><br>
          ${t.footerNote}
        </p>
      </td>
    </tr>

  </table>
</td>
</tr>
</table>
</body>
</html>`;
}

// ─── Logique principale ────────────────────────────────────────────────────────

// Date à partir de laquelle le script traite les emails (format YYYY/MM/DD).
// Mettre la date du jour de l'installation pour ne pas traiter les anciens emails.
const START_DATE = "2026/04/14";

function checkAndReply() {
  let label = GmailApp.getUserLabelByName(LABEL_NAME);
  if (!label) label = GmailApp.createLabel(LABEL_NAME);

  const query = `deliveredto:${WATCH_ADDRESS} -label:${LABEL_NAME} after:${START_DATE}`;
  const threads = GmailApp.search(query, 0, 20);

  for (const thread of threads) {
    try {
      const messages = thread.getMessages();
      const firstMsg = messages[0];

      // Détection de la langue via sujet + corps
      const textToAnalyze = (firstMsg.getSubject() || "") + " " + (firstMsg.getPlainBody() || "");
      const lang = detectLanguage(textToAnalyze);
      const t = content[lang] || content["EN"];

      // Extraction du prénom
      const fromRaw = firstMsg.getFrom();
      const nameMatch = fromRaw.match(/^([^<"]+?)(?:\s*<|$)/);
      const firstName = nameMatch ? nameMatch[1].trim().split(" ")[0] : "";

      const replyToAddress = firstMsg.getReplyTo() || firstMsg.getFrom();
      const replySubject = t.subject;

      GmailApp.sendEmail(replyToAddress, replySubject, "", {
        htmlBody: getHtmlBody(firstName, lang, firstMsg.getDate()),
        name: FROM_NAME,
        from: REPLY_FROM,
        replyTo: REPLY_FROM,
        headers: {
          "Precedence": "first-class",
          "X-Auto-Response-Suppress": "OOF, AutoReply",
        },
      });

      thread.addLabel(label);
      Logger.log(`✅ Auto-reply [${lang}] sent to: ${replyToAddress}`);
    } catch (err) {
      Logger.log(`❌ Error on thread: ${err}`);
    }
  }
}

// ─── Setup du déclencheur ─────────────────────────────────────────────────────
// Lancer UNE SEULE FOIS manuellement : menu déroulant → setupTrigger → Exécuter

function setupTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const t of triggers) {
    if (t.getHandlerFunction() === "checkAndReply") {
      ScriptApp.deleteTrigger(t);
    }
  }

  ScriptApp.newTrigger("checkAndReply")
    .timeBased()
    .everyMinutes(1)
    .create();

  Logger.log("✅ Trigger créé : checkAndReply toutes les minutes");
}
