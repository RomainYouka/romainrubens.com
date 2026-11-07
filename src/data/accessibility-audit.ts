// Observed in Google PageSpeed Insights, 6 November 2026, 19:42 UTC−5.
// Public production homepage only; these are lab scores, not WCAG compliance rates.
export const accessibilityAudit = {
  date:"2026-11-06",
  url:"https://romainrubens.com/",
  lighthouse:"13.6.0",
  report:"https://pagespeed.web.dev/analysis/https-romainrubens-com/diclczu5ak",
  mobile:{ performance:94, accessibility:100, bestPractices:100, seo:100, lcp:"3.0 s",tbt:"40 ms",cls:"0.013" },
  desktop:{ performance:98, accessibility:100, bestPractices:100, seo:100, lcp:"0.8 s",tbt:"0 ms",cls:"0.069" },
} as const;
