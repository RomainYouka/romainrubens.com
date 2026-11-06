"use client";
import { useEffect, useState } from "react";
import { detectLanguage, type Language } from "@/lib/language";
import { Analytics } from "@/lib/analytics";
import { SplitAction } from "@/components/SplitAction";
import { SFIcon } from "@/components/SFIcon";
import { ContactField } from "./ContactField";
import { contactContent } from "./content";
import s from "./contact.module.css";

const email = "hello@romainrubens.com";
export default function ContactPage() {
  const [language, setLanguage] = useState<Language>("EN");
  const t = contactContent[language];
  useEffect(() => {
    setLanguage(detectLanguage());
    const change = (event: Event) => { const value = (event as CustomEvent<Language>).detail; if (value in contactContent) setLanguage(value); };
    window.addEventListener("languageChange", change);
    return () => window.removeEventListener("languageChange", change);
  }, []);
  const track = (type: "email" | "cal" | "linkedin") => { window.dispatchEvent(new CustomEvent("blob-wink")); Analytics.contactClick(type); };
  return <main id="main-content" data-theme="dark" className={s.page} lang={language === "ՀԱՅ" ? "hy" : language.toLowerCase()}>
    <ContactField />
    <section className={s.content} aria-labelledby="contact-title">
      <h1 id="contact-title">{t.heading}</h1><p className={s.intro}>{t.intro}</p>
      <div className={s.actions}>
        <SplitAction primary href={`mailto:${email}?subject=${encodeURIComponent(t.subject)}`} onClick={() => track("email")}><SFIcon name="envelope" size={19} onAccent /><span>{t.email}</span></SplitAction>
        <SplitAction href="https://cal.com/romainrubens" external onClick={() => track("cal")}><SFIcon name="calendar" size={19} /><span>{t.calendar}</span></SplitAction>
        <SplitAction href="https://www.linkedin.com/in/romain-rubens-ba660323b/" external onClick={() => track("linkedin")}><span className={s.linkedin} aria-hidden="true">in</span><span>{t.linkedin}</span></SplitAction>
      </div>
    </section>
  </main>;
}
