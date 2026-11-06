import type { ReactNode, MouseEvent } from "react";
import { SFIcon } from "./SFIcon";
import s from "./split-action.module.css";

export function SplitAction({ children, href, onClick, primary = false, external = false }: {
  children: ReactNode; href?: string; onClick?: (event: MouseEvent<HTMLElement>) => void; primary?: boolean; external?: boolean;
}) {
  const contents = <><span className={s.label}>{children}</span><span className={s.arrow}><SFIcon name="arrow-light" size={23} onAccent={primary} /></span></>;
  const className = `${s.action} ${primary ? s.primary : ""}`;
  return href ? <a className={className} href={href} onClick={onClick} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{contents}</a> : <button type="button" className={className} onClick={onClick}>{contents}</button>;
}
