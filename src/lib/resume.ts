// English remains the fallback for English and Armenian interfaces.
export const resumePdfPath = "/resume/Romain_Rubens_Resume.pdf";
export const resumePdfUrl = `${resumePdfPath}?v=9fb768e3`;
export const resumeDownloadName = "Romain Rubens (resume).pdf";
export const frenchResumePdfPath = "/resume/Romain_Rubens_Resume_FR.pdf";
export const frenchResumePdfUrl = `${frenchResumePdfPath}?v=25788089`;
export const frenchResumeDownloadName = "Romain Rubens (Résumé).pdf";

export function getResume(language: string) {
  return language === "FR"
    ? { url: frenchResumePdfUrl, downloadName: frenchResumeDownloadName }
    : { url: resumePdfUrl, downloadName: resumeDownloadName };
}
