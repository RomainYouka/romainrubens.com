"use client";
import { useEffect, useState } from "react";
import { detectLanguage, type Language } from "@/lib/language";
import { Analytics } from "@/lib/analytics";
import { SFIcon } from "@/components/SFIcon";
import { ContactField } from "./ContactField";
import { contactContent } from "./content";
import s from "./contact.module.css";

const email = "hello@romainrubens.com";
export default function ContactPage() {
  const [language, setLanguage] = useState<Language>("EN");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const t = contactContent[language];
  useEffect(() => {
    setLanguage(detectLanguage());
    const change = (event: Event) => { const value = (event as CustomEvent<Language>).detail; if (value in contactContent) setLanguage(value); };
    window.addEventListener("languageChange", change);
    return () => window.removeEventListener("languageChange", change);
  }, []);
  useEffect(() => { if (copyStatus === "idle") return; const timer = setTimeout(() => setCopyStatus("idle"), 3000); return () => clearTimeout(timer); }, [copyStatus]);
  const track = (type: "email" | "cal" | "linkedin") => { window.dispatchEvent(new CustomEvent("blob-wink")); Analytics.contactClick(type); };
  const copyAddress = async () => { try { await navigator.clipboard.writeText(email); setCopyStatus("copied"); } catch { setCopyStatus("failed"); } };
  return <main id="main-content" className={s.page} lang={language === "ՀԱՅ" ? "hy" : language.toLowerCase()}>
    <ContactField />
    <section className={s.content} aria-labelledby="contact-title">
      <h1 id="contact-title">{t.heading}</h1><p className={s.intro}>{t.intro}</p>
      <div className={s.actions}>
        <div className={`${s.action} ${s.primary}`}><a className={s.actionLabel} href={`mailto:${email}?subject=${encodeURIComponent(t.subject)}`} onClick={() => track("email")}><SFIcon name="envelope" size={19} onAccent /><span className={s.emailText}><span>{t.email}</span><small>{email}</small></span></a><button type="button" className={`${s.actionArrow} ${s.copyCircle}`} onClick={copyAddress} aria-label={copyStatus === "copied" ? t.copied : t.copy} title={copyStatus === "copied" ? t.copied : t.copy}>{copyStatus === "copied" ? <span aria-hidden="true">✓</span> : <SFIcon name="document" size={20} onAccent />}</button></div>
        <a className={s.action} href="https://cal.com/romainrubens" target="_blank" rel="noopener noreferrer" onClick={() => track("cal")}><span className={s.actionLabel}><SFIcon name="calendar" size={19} /><span>{t.calendar}</span></span><span className={s.actionArrow}><SFIcon name="arrow-light" size={23} /></span></a>
        <a className={s.action} href="https://www.linkedin.com/in/romain-rubens-ba660323b/" target="_blank" rel="noopener noreferrer" onClick={() => track("linkedin")}><span className={s.actionLabel}><span className={s.linkedin} aria-hidden="true">in</span><span>{t.linkedin}</span></span><span className={s.actionArrow}><SFIcon name="arrow-light" size={23} /></span></a>
      </div>
      <p className={s.copyStatus} role="status">{copyStatus === "copied" ? t.copied : copyStatus === "failed" ? t.copyFailed : "\u00a0"}</p>
    </section>
  </main>;
}
