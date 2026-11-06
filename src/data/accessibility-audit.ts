// Observed in Google PageSpeed Insights, 6 November 2026, 12:07 UTC−5.
// Public production homepage only; these are lab scores, not WCAG compliance rates.
export const accessibilityAudit = {
  date:"2026-11-06",
  url:"https://romainrubens.com/",
  lighthouse:"13.6.0",
  report:"https://pagespeed.web.dev/analysis/https-romainrubens-com/z2f6ipn9v6",
  mobile:{ performance:92, accessibility:95, bestPractices:100, seo:100, lcp:"3.3 s",tbt:"50 ms",cls:"0.018" },
  desktop:{ performance:97, accessibility:96, bestPractices:100, seo:100, lcp:"0.7 s",tbt:"0 ms",cls:"0.012" },
} as const;
