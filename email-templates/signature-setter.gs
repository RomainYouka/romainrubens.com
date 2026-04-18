/**
 * Signature setter — hello@romainrubens.com
 * Google Apps Script — à coller sur script.google.com
 *
 * INSTALLATION :
 *  1. Ouvre script.google.com (connecté au compte Gmail de hello@)
 *  2. Active le service Gmail API : menu gauche → Services (+) → Gmail API → Ajouter
 *  3. Colle ce fichier dans Code.gs
 *  4. Enregistre (Cmd+S)
 *  5. Menu déroulant → setSignature → Exécuter
 *  6. Accepte les permissions
 */

function setSignature() {
  var EMAIL = "hello@romainrubens.com";

  var signature =
    '<style>' +
    '@media (prefers-color-scheme: dark) {' +
    '.sig-name    { color: #f2f2f7 !important; }' +
    '.sig-sub     { color: #aeaeb2 !important; }' +
    '.sig-divider { background-color: #5194FF !important; }' +
    '.sig-site    { color: #5194FF !important; }' +
    '.sig-social  { color: #aeaeb2 !important; }' +
    '.sig-dot     { color: #48484a !important; }' +
    '.sig-star    { filter: brightness(0) saturate(100%) invert(47%) sepia(69%) saturate(500%) hue-rotate(196deg) brightness(110%) !important; }' +
    '}' +
    '</style>' +

    '<table role="presentation" cellpadding="0" cellspacing="0" border="0"' +
    ' style="border-collapse:collapse;font-family:-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,Arial,sans-serif;">' +

    // Ligne 1 : icône + nom + titre
    '<tr>' +
    '<td style="vertical-align:middle;padding-right:10px;">' +
    '<img class="sig-star" src="https://romainrubens.com/icons/logo-animation_20260414110105.gif"' +
    ' width="40" height="40" alt="" style="display:block;border:0;width:40px;height:40px;border-radius:9px;">' +
    '</td>' +
    '<td style="vertical-align:middle;">' +
    '<p class="sig-name" style="margin:0 0 3px;font-size:15px;font-weight:700;color:#1c1c1e;line-height:1.2;letter-spacing:-0.2px;">Romain Rubens</p>' +
    '<p class="sig-sub" style="margin:0;font-size:12px;color:#48484a;line-height:1.3;">UI/UX Designer &ndash; Smart Home</p>' +
    '</td>' +
    '</tr>' +

    // Ligne 2 : séparateur + liens (décalé sous le texte)
    '<tr>' +
    '<td></td>' +
    '<td style="padding-top:10px;">' +
    '<div class="sig-divider" style="width:28px;height:2px;background-color:#314DCB;border-radius:2px;margin-bottom:8px;"></div>' +
    '<p style="margin:0 0 4px;">' +
    '<a class="sig-site" href="https://romainrubens.com" target="_blank" rel="noopener noreferrer" style="font-size:12px;font-weight:600;color:#314DCB;text-decoration:none;">romainrubens.com</a>' +
    '</p>' +
    '<p style="margin:0;">' +
    '<a class="sig-social" href="https://www.linkedin.com/in/romain-rubens-ba660323b/" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#8e8e93;text-decoration:none;">LinkedIn</a>' +
    '<span class="sig-dot" style="color:#d1d1d6;margin:0 5px;">&middot;</span>' +
    '<a class="sig-social" href="https://www.behance.net/rubensromain" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#8e8e93;text-decoration:none;">Behance</a>' +
    '<span class="sig-dot" style="color:#d1d1d6;margin:0 5px;">&middot;</span>' +
    '<a class="sig-social" href="https://romainrubens.com/resume" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#8e8e93;text-decoration:none;">Resume</a>' +
    '</p>' +
    '</td>' +
    '</tr>' +

    '</table>';

  Gmail.Users.Settings.SendAs.update(
    { signature: signature },
    "me",
    EMAIL
  );

  Logger.log("\u2705 Signature appliqu\u00e9e sur " + EMAIL);
}
