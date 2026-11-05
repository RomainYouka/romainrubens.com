import type { Metadata } from "next";
export const metadata: Metadata = { title:"Stratos — Campus App", description:"Stratos, a campus app concept by Romain Rubens: connect Strate design students through events, shared experiences and group conversations.", alternates:{canonical:"/stratosapp"} };
export default function Layout({children}:{children:React.ReactNode}) { return children; }
