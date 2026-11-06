// Static case-study component, implemented from the corresponding Figma design context.
import { SvgAsset } from "@/components/project-native/SvgAsset";
import { ProjectCopy } from "../ProjectCopy";
const imgFleche = "/projects/googleplay-ios/native/8136d8a969ce63f2.svg";
const imgFleche1 = "/projects/googleplay-ios/native/808a38e2bdb4629e.svg";
const imgIcone = "/projects/googleplay-ios/native/42f8f2f649ba2b5d.webp";
const imgImage = "/projects/googleplay-ios/native/7de09c5e842e3945.webp";
const imgAvatars = "/projects/googleplay-ios/native/45d8774bb587d758.webp";
const imgFlecheBack = "/projects/googleplay-ios/native/bd5355baca348fee.svg";
const imgMoreVert = "/projects/googleplay-ios/native/6f1c15b7435334dc.svg";
const imgCapa1 = "/projects/googleplay-ios/native/ca08924764906f50.svg";
const imgFlecheBack1 = "/projects/googleplay-ios/native/bc6c4a10a2563678.svg";
const imgCapa2 = "/projects/googleplay-ios/native/354b39e2d32025ba.svg";
const imgCapa3 = "/projects/googleplay-ios/native/b8b2e2e7f1fd14dd.svg";
const imgCapa4 = "/projects/googleplay-ios/native/80f8d3867afe5298.svg";
const imgCapa5 = "/projects/googleplay-ios/native/dcff5f07f559e06e.svg";
const imgCapa6 = "/projects/googleplay-ios/native/36dfae2a329ddf08.svg";
const imgCapa7 = "/projects/googleplay-ios/native/086a9e7459cdbc3c.svg";
const imgBgBlur = "/projects/googleplay-ios/native/d34d2dd2da94f313.svg";
const imgCapa8 = "/projects/googleplay-ios/native/50a6824ad724c730.svg";
const imgBgBlur1 = "/projects/googleplay-ios/native/67a9f36f6696721a.svg";
const imgCapa9 = "/projects/googleplay-ios/native/ef0a3dcf774b70cb.svg";
const imgBgBlur2 = "/projects/googleplay-ios/native/d202c030b0c66b2b.svg";
const imgCapa10 = "/projects/googleplay-ios/native/8304e7cc1b82ea72.svg";
const imgBgBlur3 = "/projects/googleplay-ios/native/2e97b4c3ab905af3.svg";
const imgCapa11 = "/projects/googleplay-ios/native/bf70c98db57b0b9d.svg";
const imgBgBlur4 = "/projects/googleplay-ios/native/ebe7708d266fc519.svg";
const imgCapa12 = "/projects/googleplay-ios/native/c0b135f39ceec84a.svg";
const imgBgBlur5 = "/projects/googleplay-ios/native/8051b6610961c4a7.svg";
const imgCapa13 = "/projects/googleplay-ios/native/091fe1d8df117b56.svg";
const imgBgBlur6 = "/projects/googleplay-ios/native/ae040e2f2a1a3f42.svg";
const imgCapa14 = "/projects/googleplay-ios/native/2b14b557a558c8f3.svg";
const imgBgBlur7 = "/projects/googleplay-ios/native/4cda1500e8091ecd.svg";
const imgCapa15 = "/projects/googleplay-ios/native/f2547c47ff0665ec.svg";
function Degrade({ className }: {
    className?: string;
}) {
    return (<div className={className || "h-[70.111px] relative w-[213.519px]"}>
      <div className="absolute bg-gradient-to-b from-[2.892%] from-[rgba(255,255,255,0)] inset-0 rounded-bl-[31.869px] rounded-br-[31.869px] to-[84.337%] to-white via-[31.085%] via-[rgba(255,255,255,0.6)]" data-node-id="92:40303"/>
    </div>);
}
type HistoriqueDachatProps = {
    className?: string;
    property1?: "Ouvert" | "Fermé";
};
function HistoriqueDachat({ className, property1 = "Ouvert" }: HistoriqueDachatProps) {
    const isFerme = property1 === "Fermé";
    return (<div className={className || `content-stretch flex flex-col items-start relative w-[256.297px] ${isFerme ? "" : "gap-[11.328px]"}`} id={isFerme ? "node-92_53223" : "node-92_53218"}>
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" id={isFerme ? "node-92_53224" : "node-92_53219"}>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium h-[11.328px] justify-center leading-[0] not-italic relative shrink-0 text-[12.744px] text-white tracking-[-0.354px] w-[244.969px]" id={isFerme ? "node-92_53225" : "node-92_53220"} style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
          <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Titre</p>
        </div>
        <div className="relative shrink-0 size-[11.328px]" id={isFerme ? "node-92_53226" : "node-92_53221"}>
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={isFerme ? imgFleche1 : imgFleche} loading="lazy" decoding="async"/>
        </div>
      </div>
      {property1 === "Ouvert" && (<p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-normal font-normal leading-[0] relative shrink-0 text-[0px] text-[color:#f5f5f5] w-full" style={{ color: "#f5f5f5", fontSize: "0px", fontWeight: 400, lineHeight: "0", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[#f5f5f5] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Texte.
          </span>
          <span className="leading-[normal] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>{` `}</span>
          <span className="leading-[normal] text-[#cfe4ff] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Texte
          </span>
        </p>)}
    </div>);
}
type AbonnementsProps = {
    className?: string;
    property1?: "Ouvert" | "Fermé";
};
function Abonnements({ className, property1 = "Ouvert" }: AbonnementsProps) {
    const isFerme = property1 === "Fermé";
    return (<div className={className || `content-stretch flex flex-col items-start relative w-[256.297px] ${isFerme ? "" : "gap-[11.328px]"}`} id={isFerme ? "node-92_53213" : "node-92_53208"}>
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" id={isFerme ? "node-92_53214" : "node-92_53209"}>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium h-[11.328px] justify-center leading-[0] not-italic relative shrink-0 text-[12.744px] text-white tracking-[-0.354px] w-[244.969px]" id={isFerme ? "node-92_53215" : "node-92_53210"} style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
          <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Titre</p>
        </div>
        <div className="relative shrink-0 size-[11.328px]" id={isFerme ? "node-92_53216" : "node-92_53211"}>
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={isFerme ? imgFleche1 : imgFleche} loading="lazy" decoding="async"/>
        </div>
      </div>
      {property1 === "Ouvert" && (<p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-normal font-normal leading-[0] relative shrink-0 text-[0px] text-[color:#f5f5f5] w-full" style={{ color: "#f5f5f5", fontSize: "0px", fontWeight: 400, lineHeight: "0", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[#f5f5f5] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Texte.
          </span>
          <span className="leading-[normal] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>{` `}</span>
          <span className="leading-[normal] text-[#cfe4ff] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Texte
          </span>
        </p>)}
    </div>);
}
type NotificationsProps = {
    className?: string;
    property1?: "Ouvert" | "Fermé";
};
function Notifications({ className, property1 = "Ouvert" }: NotificationsProps) {
    const isFerme = property1 === "Fermé";
    return (<div className={className || `content-stretch flex flex-col items-start relative w-[256.297px] ${isFerme ? "" : "gap-[11.328px]"}`} id={isFerme ? "node-92_53203" : "node-92_53198"}>
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" id={isFerme ? "node-92_53204" : "node-92_53199"}>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium h-[11.328px] justify-center leading-[0] not-italic relative shrink-0 text-[12.744px] text-white tracking-[-0.354px] w-[244.969px]" id={isFerme ? "node-92_53205" : "node-92_53200"} style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
          <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Titre</p>
        </div>
        <div className="relative shrink-0 size-[11.328px]" id={isFerme ? "node-92_53206" : "node-92_53201"}>
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={isFerme ? imgFleche1 : imgFleche} loading="lazy" decoding="async"/>
        </div>
      </div>
      {property1 === "Ouvert" && (<p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-normal font-normal leading-[0] relative shrink-0 text-[0px] text-[color:#f5f5f5] w-full" style={{ color: "#f5f5f5", fontSize: "0px", fontWeight: 400, lineHeight: "0", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[#f5f5f5] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Texte.
          </span>
          <span className="leading-[normal] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>{` `}</span>
          <span className="leading-[normal] text-[#cfe4ff] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Texte
          </span>
        </p>)}
    </div>);
}
type HistoriqueDachat1Props = {
    className?: string;
    property1?: "Ouvert" | "Fermé";
};
function HistoriqueDachat1({ className, property1 = "Ouvert" }: HistoriqueDachat1Props) {
    const isFerme = property1 === "Fermé";
    return (<div className={className || `content-stretch flex flex-col items-start relative w-[256.297px] ${isFerme ? "" : "gap-[11.328px]"}`} id={isFerme ? "node-92_53193" : "node-92_53188"}>
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" id={isFerme ? "node-92_53194" : "node-92_53189"}>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium h-[11.328px] justify-center leading-[0] not-italic relative shrink-0 text-[12.744px] text-white tracking-[-0.354px] w-[244.969px]" id={isFerme ? "node-92_53195" : "node-92_53190"} style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
          <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Historique d’achat</p>
        </div>
        <div className="relative shrink-0 size-[11.328px]" id={isFerme ? "node-92_53196" : "node-92_53191"}>
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={isFerme ? imgFleche1 : imgFleche} loading="lazy" decoding="async"/>
        </div>
      </div>
      {property1 === "Ouvert" && (<p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-normal font-normal leading-[0] relative shrink-0 text-[0px] text-[color:#f5f5f5] w-full" style={{ color: "#f5f5f5", fontSize: "0px", fontWeight: 400, lineHeight: "0", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[#f5f5f5] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Votre historique d’achat est vide.
          </span>
          <span className="leading-[normal] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>{` `}</span>
          <span className="leading-[normal] text-[#cfe4ff] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            En savoir plus
          </span>
        </p>)}
    </div>);
}
type Abonnements1Props = {
    className?: string;
    property1?: "Ouvert" | "Fermé";
};
function Abonnements1({ className, property1 = "Ouvert" }: Abonnements1Props) {
    const isFerme = property1 === "Fermé";
    return (<div className={className || `content-stretch flex flex-col items-start relative w-[256.297px] ${isFerme ? "" : "gap-[11.328px]"}`} id={isFerme ? "node-92_53183" : "node-92_53178"}>
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" id={isFerme ? "node-92_53184" : "node-92_53179"}>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium h-[11.328px] justify-center leading-[0] not-italic relative shrink-0 text-[12.744px] text-white tracking-[-0.354px] w-[244.969px]" id={isFerme ? "node-92_53185" : "node-92_53180"} style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
          <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Abonnements</p>
        </div>
        <div className="relative shrink-0 size-[11.328px]" id={isFerme ? "node-92_53186" : "node-92_53181"}>
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={isFerme ? imgFleche1 : imgFleche} loading="lazy" decoding="async"/>
        </div>
      </div>
      {property1 === "Ouvert" && (<p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-normal font-normal leading-[0] relative shrink-0 text-[0px] text-[color:#f5f5f5] w-full" style={{ color: "#f5f5f5", fontSize: "0px", fontWeight: 400, lineHeight: "0", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[#f5f5f5] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Vous n’avez aucun abonnement.
          </span>
          <span className="leading-[normal] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>{` `}</span>
          <span className="leading-[normal] text-[#cfe4ff] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            En savoir plus
          </span>
        </p>)}
    </div>);
}
type Notifications1Props = {
    className?: string;
    property1?: "Ouvert" | "Fermé";
};
function Notifications1({ className, property1 = "Ouvert" }: Notifications1Props) {
    const isFerme = property1 === "Fermé";
    return (<div className={className || `content-stretch flex flex-col items-start relative w-[256.297px] ${isFerme ? "" : "gap-[11.328px]"}`} id={isFerme ? "node-92_53173" : "node-92_53168"}>
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" id={isFerme ? "node-92_53174" : "node-92_53169"}>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium h-[11.328px] justify-center leading-[0] not-italic relative shrink-0 text-[12.744px] text-white tracking-[-0.354px] w-[244.969px]" id={isFerme ? "node-92_53175" : "node-92_53170"} style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
          <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Notifications</p>
        </div>
        <div className="relative shrink-0 size-[11.328px]" id={isFerme ? "node-92_53176" : "node-92_53171"}>
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={isFerme ? imgFleche1 : imgFleche} loading="lazy" decoding="async"/>
        </div>
      </div>
      {property1 === "Ouvert" && (<p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-normal font-normal leading-[0] relative shrink-0 text-[0px] text-[color:#f5f5f5] w-full" style={{ color: "#f5f5f5", fontSize: "0px", fontWeight: 400, lineHeight: "0", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[#f5f5f5] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Vous n’avez aucune notification.
          </span>
          <span className="leading-[normal] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>{` `}</span>
          <span className="leading-[normal] text-[#cfe4ff] text-[8.496px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            En savoir plus
          </span>
        </p>)}
    </div>);
}
type AppPetitProps = {
    className?: string;
    property1?: "Installer" | "MàJ" | "Ouvrir" | "En cours";
};
function AppPetit({ className, property1 = "Installer" }: AppPetitProps) {
    const isEnCours = property1 === "En cours";
    const isMaJ = property1 === "MàJ";
    const isOuvrir = property1 === "Ouvrir";
    return (<div className={className || "content-stretch flex gap-[33.686px] items-center relative"} id={isEnCours ? "node-92_53149" : isOuvrir ? "node-92_53139" : isMaJ ? "node-92_53129" : "node-92_53119"}>
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" id={isEnCours ? "node-92_53150" : isOuvrir ? "node-92_53140" : isMaJ ? "node-92_53130" : "node-92_53120"}>
        <div className="col-1 content-stretch flex h-[16.843px] items-center ml-0 mt-0 relative row-1 w-[120.306px]" id={isEnCours ? "node-92_53151" : isOuvrir ? "node-92_53141" : isMaJ ? "node-92_53131" : "node-92_53121"}>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" id={isEnCours ? "node-92_53152" : isOuvrir ? "node-92_53142" : isMaJ ? "node-92_53132" : "node-92_53122"}>
            <div className="col-1 content-stretch flex gap-[3.609px] h-[16.843px] items-center ml-0 mt-0 relative row-1 w-[120.306px]" id={isEnCours ? "node-92_53153" : isOuvrir ? "node-92_53143" : isMaJ ? "node-92_53133" : "node-92_53123"}>
              <div className="relative rounded-[3.609px] shadow-[0.267px_0.267px_2.136px_0px_rgba(255,255,255,0.25)] shrink-0 size-[16.843px]" id={isEnCours ? "node-92_53154" : isOuvrir ? "node-92_53144" : isMaJ ? "node-92_53134" : "node-92_53124"}>
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[3.609px] size-full" src={imgIcone} loading="lazy" decoding="async"/>
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[2.406px] items-start leading-[0] relative shrink-0 w-[96.846px]" id={isEnCours ? "node-92_53155" : isOuvrir ? "node-92_53145" : isMaJ ? "node-92_53135" : "node-92_53125"}>
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-[family-name:var(--font-project-roboto)] font-medium font-medium justify-center relative shrink-0 text-[6.015px] text-[color:white] w-[96.846px]" id={isEnCours ? "node-92_53156" : isOuvrir ? "node-92_53146" : isMaJ ? "node-92_53136" : "node-92_53126"} style={{ fontVariationSettings: '"wdth" 100' }}>
                  <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Nom de l’App</p>
                </div>
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-[family-name:var(--font-project-roboto)] font-normal font-normal justify-center min-w-full relative shrink-0 text-[3.609px] text-[color:#eff1f2] w-[min-content]" id={isEnCours ? "node-92_53157" : isOuvrir ? "node-92_53147" : isMaJ ? "node-92_53137" : "node-92_53127"} style={{ fontVariationSettings: '"wdth" 100' }}>
                  <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Nom du Développeur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`content-stretch flex h-[14.437px] items-center justify-center p-[6.015px] relative rounded-[30.076px] shrink-0 w-[36.092px] ${isEnCours ? "bg-[var(--bleu-clair,#cfe4ff)]" : isOuvrir ? "bg-[var(--vert,#01875f)]" : "bg-[var(--bleu,#0059d8)]"}`} id={isEnCours ? "node-92_53158" : isOuvrir ? "node-92_53148" : isMaJ ? "node-92_53138" : "node-92_53128"}>
        {["Installer", "MàJ", "Ouvrir"].includes(property1) && (<p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-semibold font-semibold leading-[normal] relative shrink-0 text-[4.81px] text-[color:white] text-center whitespace-nowrap" id={isOuvrir ? "node-I92_53148-1133_5263" : isMaJ ? "node-I92_53138-1133_5261" : "node-I92_53128-1133_5256"} style={{ color: "white", fontSize: "4.81px", fontWeight: 600, lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
            {isOuvrir ? "Ouvrir" : isMaJ ? "Mettre à jour" : "Installer"}
          </p>)}
      </div>
    </div>);
}
type ApplicationBanniereProps = {
    className?: string;
    property1?: "Installer" | "MàJ" | "Ouvrir" | "En cours";
};
function ApplicationBanniere({ className, property1 = "Installer" }: ApplicationBanniereProps) {
    const isEnCours = property1 === "En cours";
    const isMaJ = property1 === "MàJ";
    const isOuvrir = property1 === "Ouvrir";
    return (<div className={className || "h-[45.693px] relative w-[258.451px]"} id={isEnCours ? "node-92_53101" : isOuvrir ? "node-92_53092" : isMaJ ? "node-92_53083" : "node-92_53074"}>
      <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-0 right-0 top-1/2" id={isEnCours ? "node-92_53102" : isOuvrir ? "node-92_53093" : isMaJ ? "node-92_53084" : "node-92_53075"}>
        <div className="content-stretch flex gap-[7.14px] items-center relative shrink-0" id={isEnCours ? "node-92_53103" : isOuvrir ? "node-92_53094" : isMaJ ? "node-92_53085" : "node-92_53076"}>
          <div className="overflow-clip relative rounded-[9.995px] shrink-0 size-[45.693px]" id={isEnCours ? "node-92_53104" : isOuvrir ? "node-92_53095" : isMaJ ? "node-92_53086" : "node-92_53077"}>
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9.995px] size-full" src={imgIcone} loading="lazy" decoding="async"/>
            <div className="absolute left-0 rounded-[9.995px] size-[45.693px] top-0" id={isEnCours ? "node-92_53105" : isOuvrir ? "node-92_53096" : isMaJ ? "node-92_53087" : "node-92_53078"}>
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9.995px]">
                <img alt="" className="absolute left-[110.47%] max-w-none size-[85.92%] top-[-116.53%]" src={imgImage} loading="lazy" decoding="async"/>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[5.712px] items-start leading-[0] relative shrink-0 w-[133.509px]" id={isEnCours ? "node-92_53106" : isOuvrir ? "node-92_53097" : isMaJ ? "node-92_53088" : "node-92_53079"}>
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-[family-name:var(--font-project-roboto)] font-medium font-medium justify-center relative shrink-0 text-[12.851px] text-white whitespace-nowrap" id={isEnCours ? "node-92_53107" : isOuvrir ? "node-92_53098" : isMaJ ? "node-92_53089" : "node-92_53080"} style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Nom de l’App</p>
            </div>
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-[family-name:var(--font-project-roboto)] font-normal font-normal justify-center relative shrink-0 text-[8.567px] text-[color:#f5f5f5] w-[76.393px]" id={isEnCours ? "node-92_53108" : isOuvrir ? "node-92_53099" : isMaJ ? "node-92_53090" : "node-92_53081"} style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Type d’App</p>
            </div>
          </div>
        </div>
        <div className={`content-stretch flex h-[22.846px] items-center justify-center p-[7.14px] relative rounded-[35.698px] shrink-0 w-[57.116px] ${isEnCours ? "bg-[var(--bleu-clair,#cfe4ff)]" : isOuvrir ? "bg-[var(--vert,#01875f)]" : "bg-[var(--bleu,#0059d8)]"}`} id={isEnCours ? "node-92_53109" : isOuvrir ? "node-92_53100" : isMaJ ? "node-92_53091" : "node-92_53082"}>
          {["Installer", "MàJ", "Ouvrir"].includes(property1) && (<p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-semibold font-semibold leading-[normal] relative shrink-0 text-[8.57px] text-[color:white] text-center whitespace-nowrap" id={isOuvrir ? "node-I92_53100-1133_6000" : isMaJ ? "node-I92_53091-1133_5998" : "node-I92_53082-1133_5994"} style={{ color: "white", fontSize: "8.57px", fontWeight: 600, lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
              {isOuvrir ? "Ouvrir" : isMaJ ? "Mettre à jour" : "Installer"}
            </p>)}
        </div>
      </div>
    </div>);
}
type AppProps = {
    className?: string;
    property1?: "Installer" | "Ouvrir" | "MAJ En cours" | "Installation" | "MAJ";
};
function App({ className, property1 = "Installer" }: AppProps) {
    const isInstallation = property1 === "Installation";
    const isMaj = property1 === "MAJ";
    const isMajEnCours = property1 === "MAJ En cours";
    const isMajOrOuvrirOrMajEnCours = ["MAJ", "Ouvrir", "MAJ En cours"].includes(property1);
    const isOuvrir = property1 === "Ouvrir";
    return (<div className={className || "content-stretch flex flex-col gap-[9.572px] items-start relative w-[216.568px]"} id={isInstallation ? "node-92_53054" : isMajEnCours ? "node-92_53042" : isOuvrir ? "node-92_53030" : isMaj ? "node-92_53018" : "node-92_53007"}>
      <div className="content-stretch flex gap-[13.162px] items-center relative shrink-0 w-full" id={isInstallation ? "node-92_53055" : isMajEnCours ? "node-92_53043" : isOuvrir ? "node-92_53031" : isMaj ? "node-92_53019" : "node-92_53008"}>
        <div className="overflow-clip relative rounded-[8.376px] shrink-0 size-[43.074px]" id={isInstallation ? "node-92_53056" : isMajEnCours ? "node-92_53044" : isOuvrir ? "node-92_53032" : isMaj ? "node-92_53020" : "node-92_53009"}>
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8.376px] size-full" src={imgIcone} loading="lazy" decoding="async"/>
          <div className="absolute left-0 rounded-[8.376px] size-[43.074px] top-0" id={isInstallation ? "node-92_53057" : isMajEnCours ? "node-92_53045" : isOuvrir ? "node-92_53033" : isMaj ? "node-92_53021" : "node-92_53010"} data-name="Image"/>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[8.376px] items-start leading-[0] relative shrink-0 w-[153.153px]" id={isInstallation ? "node-92_53058" : isMajEnCours ? "node-92_53046" : isOuvrir ? "node-92_53034" : isMaj ? "node-92_53022" : "node-92_53011"}>
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-[family-name:var(--font-project-roboto)] font-medium font-medium justify-center min-w-full relative shrink-0 text-[14.358px] text-white w-[min-content]" id={isInstallation ? "node-92_53059" : isMajEnCours ? "node-92_53047" : isOuvrir ? "node-92_53035" : isMaj ? "node-92_53023" : "node-92_53012"} style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Nom de l’App</p>
          </div>
          <div className="content-stretch flex flex-col gap-[5.983px] items-start relative shrink-0 w-[113.668px]" id={isInstallation ? "node-92_53060" : isMajEnCours ? "node-92_53048" : isOuvrir ? "node-92_53036" : isMaj ? "node-92_53024" : "node-92_53013"}>
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-[family-name:var(--font-project-roboto)] font-medium font-medium justify-center relative shrink-0 text-[#cfe4ff] text-[8.376px] w-full" id={isInstallation ? "node-92_53061" : isMajEnCours ? "node-92_53049" : isOuvrir ? "node-92_53037" : isMaj ? "node-92_53025" : "node-92_53014"} style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Nom du développeur</p>
            </div>
            <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-[family-name:var(--font-project-roboto)] font-normal font-normal justify-center relative shrink-0 text-[7.179px] text-white w-full" id={isInstallation ? "node-92_53062" : isMajEnCours ? "node-92_53050" : isOuvrir ? "node-92_53038" : isMaj ? "node-92_53026" : "node-92_53015"} style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Type d’App</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`content-stretch flex items-center relative shrink-0 w-full ${isMajOrOuvrirOrMajEnCours ? "gap-[4.786px]" : ""}`} id={isInstallation ? "node-92_53063" : isMajEnCours ? "node-92_53051" : isOuvrir ? "node-92_53039" : isMaj ? "node-92_53027" : "node-92_53016"}>
        {isMajOrOuvrirOrMajEnCours && (<>
            <div className="bg-[#eff1f2] border-[0.598px] border-[#ddd] border-solid content-stretch flex h-[23.93px] items-center justify-center p-[5.983px] relative rounded-[59.825px] shrink-0 w-[68.799px]" id={isMajEnCours ? "node-92_53052" : isOuvrir ? "node-92_53040" : "node-92_53028"}>
              <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-semibold font-semibold leading-[normal] relative shrink-0 text-[#cfe4ff] text-[8.38px] text-center tracking-[0.0838px] whitespace-nowrap" id={isMajEnCours ? "node-I92_53052-1133_3975" : isOuvrir ? "node-I92_53040-1133_3975" : "node-I92_53028-1133_3975"} style={{ color: "#cfe4ff", fontSize: "8.38px", fontWeight: 600, lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                Désinstaller
              </p>
            </div>
            <div className={`content-stretch flex h-[23.93px] items-center justify-center p-[5.983px] relative rounded-[59.825px] shrink-0 w-[142.983px] ${isMajEnCours ? "bg-[var(--bleu-clair,#cfe4ff)]" : isOuvrir ? "bg-[var(--vert,#01875f)]" : "bg-[var(--bleu,#0059d8)]"}`} id={isMajEnCours ? "node-92_53053" : isOuvrir ? "node-92_53041" : "node-92_53029"}>
              {["MAJ", "Ouvrir"].includes(property1) && (<p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-semibold font-semibold leading-[normal] relative shrink-0 text-[8.38px] text-[color:white] text-center tracking-[0.0838px] whitespace-nowrap" id={isOuvrir ? "node-I92_53041-1133_3932" : "node-I92_53029-1133_3902"} style={{ color: "white", fontSize: "8.38px", fontWeight: 600, lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  {isOuvrir ? "Ouvrir" : isMaj ? "Mettre à jour" : ""}
                </p>)}
            </div>
          </>)}
        {["Installer", "Installation"].includes(property1) && (<div className={`content-stretch flex h-[23.93px] items-center justify-center p-[5.983px] relative rounded-[59.825px] shrink-0 w-[216.568px] ${isInstallation ? "bg-[var(--bleu-clair,#cfe4ff)]" : "bg-[var(--bleu,#0059d8)]"}`} id={isInstallation ? "node-92_53064" : "node-92_53017"}>
            {property1 === "Installer" && (<p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-[family-name:var(--font-project-roboto)] font-semibold font-semibold leading-[normal] relative shrink-0 text-[8.38px] text-[color:white] text-center tracking-[0.0838px] whitespace-nowrap" style={{ color: "white", fontSize: "8.38px", fontWeight: 600, lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                Installer
              </p>)}
          </div>)}
      </div>
    </div>);
}
type BarreSuperieureProps = {
    className?: string;
    property1?: "01" | "02" | "03" | "04" | "Bienvenue" | "Reglages";
};
function BarreSuperieure({ className, property1 = "01" }: BarreSuperieureProps) {
    const is01 = property1 === "01";
    const is02 = property1 === "02";
    const is02Or03Or04 = ["02", "03", "04"].includes(property1);
    const is03 = property1 === "03";
    const is04 = property1 === "04";
    const isBienvenue = property1 === "Bienvenue";
    const isReglages = property1 === "Reglages";
    return (<div className={className || "h-[20.855px] relative w-[235.925px]"} id={isBienvenue ? "node-92_52987" : is04 ? "node-92_52981" : is03 ? "node-92_52975" : is02 ? "node-92_52969" : isReglages ? "node-92_52964" : "node-92_52958"}>
      <div className={`absolute content-stretch flex items-center left-0 top-0 ${is02Or03Or04 ? "gap-[59.959px]" : "justify-between w-[235.925px]"}`} id={isBienvenue ? "node-92_52988" : is04 ? "node-92_52982" : is03 ? "node-92_52976" : is02 ? "node-92_52970" : isReglages ? "node-92_52965" : "node-92_52959"}>
        {["01", "Reglages", "02", "03"].includes(property1) && (<div className="relative shrink-0 size-[20.855px]" id={is03 ? "node-92_52977" : is02 ? "node-92_52971" : isReglages ? "node-92_52966" : "node-92_52960"}>
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={is03 ? imgFlecheBack1 : imgFlecheBack} loading="lazy" decoding="async"/>
          </div>)}
        {["01", "Reglages", "Bienvenue"].includes(property1) && (<div className={`flex relative shrink-0 ${isBienvenue ? '[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-col font-["Google_Sans_Flex:Medium"] font-medium justify-center leading-[0] not-italic text-[0px] text-[color:var(--bleu-foncé,#0043a6)] whitespace-nowrap' : isReglages ? "content-stretch items-center" : "content-stretch gap-[5.214px] items-center"}`} id={isBienvenue ? "node-92_52989" : isReglages ? "node-92_52967" : "node-92_52961"} style={isBienvenue ? { fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' } : undefined}>
            {is01 && (<>
                <div className="relative shrink-0 size-[20.855px]">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatars} loading="lazy" decoding="async"/>
                </div>
                <div className="relative shrink-0 size-[20.855px]">
                  <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgMoreVert}/>
                </div>
              </>)}
            {isReglages && (<div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center leading-[0] not-italic relative shrink-0 text-[15.641px] text-[color:#0043a6] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Compte</p>
              </div>)}
            {isBienvenue && (<p className="text-[15.641px]" style={{ color: "inherit", fontSize: "15.641px", fontWeight: "inherit", lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit" }}>
                <span className="font-[family-name:var(--font-display)] font-medium font-medium leading-[normal]" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>{`Bienvenue `}</span>
                <span className="font-[family-name:var(--font-display)] font-semibold font-semibold leading-[normal]" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                  Romain
                </span>
              </p>)}
          </div>)}
        {is02Or03Or04 && (<div className="h-[14.338px] relative shrink-0 w-[74.297px]" id={is04 ? "node-92_52983" : is03 ? "node-92_52978" : "node-92_52972"}>
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={is04 ? imgCapa3 : is03 ? imgCapa2 : imgCapa1} loading="lazy" decoding="async"/>
          </div>)}
        {["02", "03"].includes(property1) && (<div className="relative shrink-0 size-[20.855px]" id={is03 ? "node-92_52980" : "node-92_52974"}>
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatars} loading="lazy" decoding="async"/>
          </div>)}
        {is04 && (<>
            <div className="relative shrink-0 size-[20.855px]">
              <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgFlecheBack1}/>
            </div>
            <div className="relative shrink-0 size-[20.855px]">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatars} loading="lazy" decoding="async"/>
            </div>
          </>)}
        {isBienvenue && (<div className="content-stretch flex items-center relative shrink-0">
            <div className="relative shrink-0 size-[20.855px]">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatars} loading="lazy" decoding="async"/>
            </div>
          </div>)}
      </div>
    </div>);
}
type PopupProps = {
    className?: string;
    property1?: "Verte" | "Bleu";
};
function Popup({ className, property1 = "Verte" }: PopupProps) {
    const isBleu = property1 === "Bleu";
    return (<div className={className || "h-[292.316px] relative w-[280.686px]"} id={isBleu ? "node-92_52937" : "node-92_52925"}>
      <div className="absolute bg-white border-[1.551px] border-[var(--gris-très-clair,#eff1f2)] border-solid h-[292.316px] left-0 rounded-[12.406px] top-0 w-[280.686px]" id={isBleu ? "node-92_52938" : "node-92_52926"}/>
      <div className={`absolute h-[15.507px] left-[231.06px] rounded-[34.116px] w-[42.646px] ${isBleu ? "bg-[var(--bleu-clair-google,#cfe4ff)] top-[6.97px]" : "bg-[var(--vert-clair,#cfffd9)] top-[6.98px]"}`} id={isBleu ? "node-92_52939" : "node-92_52927"}/>
      <div className={`-translate-x-1/2 -translate-y-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute flex flex-col font-["Roboto:SemiBold"] font-semibold justify-center leading-[0] left-[252.76px] text-[6.203px] text-center top-[14.4px] w-[31.015px] ${isBleu ? "text-[color:var(--bleu,#0059d8)]" : "text-[color:var(--vert,#01875f)]"}`} id={isBleu ? "node-92_52940" : "node-92_52928"} style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>TEXTE</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-[family-name:var(--font-display)] font-medium font-medium leading-[normal] left-[14.73px] not-italic text-[13.957px] text-[color:#3f4946] top-[105.45px] tracking-[-0.3877px] w-[220.206px]" id={isBleu ? "node-92_52941" : "node-92_52929"} style={{ color: "#3f4946", fontSize: "13.957px", fontWeight: 500, lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `}</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-[family-name:var(--font-project-roboto)] font-normal font-normal leading-[100.08999633789062%] left-[14.73px] text-[10.855px] text-[color:#3f4946] top-[150.42px] w-[253.547px]" id={isBleu ? "node-92_52942" : "node-92_52930"} style={{ color: "#3f4946", fontSize: "10.855px", fontWeight: 400, lineHeight: "100.08999633789062%", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. `}</p>
      <p className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-["Roboto:Regular"] font-normal leading-[18.349px] left-[14.73px] text-[10.855px] top-[212.45px] w-[253.547px] ${isBleu ? "text-[color:var(--bleu,#0059d8)]" : "text-[color:var(--vert,#01875f)]"}`} id={isBleu ? "node-92_52943" : "node-92_52931"} style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
        Texte
      </p>
      <div className="absolute contents inset-[15.65%_29.29%_76.54%_29.28%]" id={isBleu ? "node-92_52944" : "node-92_52932"}>
        <div className="absolute inset-[15.65%_29.29%_76.54%_29.28%]" id={isBleu ? "node-92_52945" : "node-92_52933"}>
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={isBleu ? imgCapa5 : imgCapa4} loading="lazy" decoding="async"/>
        </div>
      </div>
      {property1 === "Verte" && (<div className="absolute bg-[#01875f] content-stretch flex h-[31.015px] items-center justify-center left-[14.73px] p-[7.754px] rounded-[15.507px] top-[247.34px] w-[251.221px]">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-project-roboto)] font-medium font-medium justify-center leading-[0] relative shrink-0 text-[11.631px] text-center text-white tracking-[-0.1163px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[100.08999633789062%]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "100.08999633789062%", fontFamily: "inherit", letterSpacing: "inherit" }}>Texte</p>
          </div>
        </div>)}
      {isBleu && (<button className="absolute bg-[#0059d8] content-stretch cursor-pointer flex h-[31.015px] items-center justify-center left-[14.73px] p-[7.754px] rounded-[15.507px] top-[247.34px] w-[251.221px]">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-project-roboto)] font-medium font-medium justify-center leading-[0] relative shrink-0 text-[11.631px] text-center text-white tracking-[-0.1163px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[100.08999633789062%]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "100.08999633789062%", fontFamily: "inherit", letterSpacing: "inherit" }}>Texte</p>
          </div>
        </button>)}
    </div>);
}
type Popup1Props = {
    className?: string;
    property1?: "Verte" | "Bleu";
};
function Popup1({ className, property1 = "Verte" }: Popup1Props) {
    const isBleu = property1 === "Bleu";
    return (<div className={className || "h-[292.316px] relative w-[280.686px]"} id={isBleu ? "node-92_52912" : "node-92_52900"}>
      <div className="absolute bg-white border-[1.551px] border-[var(--gris-très-clair,#eff1f2)] border-solid h-[292.316px] left-0 rounded-[12.406px] top-0 w-[280.686px]" id={isBleu ? "node-92_52913" : "node-92_52901"}/>
      <div className={`absolute h-[15.507px] left-[231.05px] rounded-[34.116px] w-[42.646px] ${isBleu ? "bg-[var(--bleu-clair-google,#cfe4ff)] top-[6.97px]" : "bg-[var(--vert-clair,#cfffd9)] top-[6.98px]"}`} id={isBleu ? "node-92_52914" : "node-92_52902"}/>
      <div className={`-translate-x-1/2 -translate-y-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute flex flex-col font-["Roboto:SemiBold"] font-semibold justify-center leading-[0] left-[252.76px] text-[6.203px] text-center top-[14.4px] w-[31.015px] ${isBleu ? "text-[color:var(--bleu,#0059d8)]" : "text-[color:var(--vert,#01875f)]"}`} id={isBleu ? "node-92_52915" : "node-92_52903"} style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>BETA</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-[family-name:var(--font-display)] font-medium font-medium leading-[0] left-[14.73px] not-italic text-[0px] text-[color:#3f4946] top-[105.45px] tracking-[-0.3877px] w-[220.206px]" id={isBleu ? "node-92_52916" : "node-92_52904"} style={{ color: "#3f4946", fontSize: "0px", fontWeight: 500, lineHeight: "0", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
        <span className="leading-[normal] text-[13.957px]" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>{`Ouvrez votre esprit et installez les quelques `}</span>
        <span className={`leading-[normal] text-[13.957px] ${isBleu ? "text-[#0059d8]" : "text-[#01875f]"}`} style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
          4 millions
        </span>
        <span className="leading-[normal] text-[13.957px]" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>{` d’Apps.`}</span>
      </p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-[family-name:var(--font-project-roboto)] font-normal font-normal leading-[0] left-[14.73px] text-[10.855px] text-[color:#3f4946] top-[150.42px] w-[253.547px] whitespace-pre-wrap" id={isBleu ? "node-92_52917" : "node-92_52905"} style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[100.08999633789062%] mb-0" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "100.08999633789062%", fontFamily: "inherit", letterSpacing: "inherit" }}>{`Lors de l’installation d’une App, votre iPhone vous demandera une validation de l’installation. `}</p>
        <p className="leading-[100.08999633789062%] mb-0" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "100.08999633789062%", fontFamily: "inherit", letterSpacing: "inherit" }}>Suivez les étapes et TA DA.</p>
        <p className="leading-[100.08999633789062%]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "100.08999633789062%", fontFamily: "inherit", letterSpacing: "inherit" }}>Google Play sur votre iPhone, c’est maintenant !</p>
      </div>
      <p className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-["Roboto:Regular"] font-normal leading-[18.349px] left-[14.73px] text-[10.855px] top-[212.45px] w-[253.547px] ${isBleu ? "text-[color:var(--bleu,#0059d8)]" : "text-[color:var(--vert,#01875f)]"}`} id={isBleu ? "node-92_52918" : "node-92_52906"} style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
        En savoir plus
      </p>
      <div className="absolute contents inset-[15.65%_29.28%_76.54%_29.28%]" id={isBleu ? "node-92_52919" : "node-92_52907"}>
        <div className="absolute inset-[15.65%_29.28%_76.54%_29.28%]" id={isBleu ? "node-92_52920" : "node-92_52908"}>
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={isBleu ? imgCapa7 : imgCapa6} loading="lazy" decoding="async"/>
        </div>
      </div>
      {property1 === "Verte" && (<div className="absolute bg-[#01875f] content-stretch flex h-[31.015px] items-center justify-center left-[14.73px] p-[7.754px] rounded-[15.507px] top-[247.34px] w-[251.221px]">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-project-roboto)] font-medium font-medium justify-center leading-[0] relative shrink-0 text-[11.631px] text-center text-white tracking-[-0.1163px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[100.08999633789062%]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "100.08999633789062%", fontFamily: "inherit", letterSpacing: "inherit" }}>Découvrir</p>
          </div>
        </div>)}
      {isBleu && (<button className="absolute bg-[#0059d8] content-stretch cursor-pointer flex h-[31.015px] items-center justify-center left-[14.73px] p-[7.754px] rounded-[15.507px] top-[247.34px] w-[251.221px]">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-project-roboto)] font-medium font-medium justify-center leading-[0] relative shrink-0 text-[11.631px] text-center text-white tracking-[-0.1163px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[100.08999633789062%]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "100.08999633789062%", fontFamily: "inherit", letterSpacing: "inherit" }}>Découvrir</p>
          </div>
        </button>)}
    </div>);
}
export default function Component10() {
    return (<div className="bg-[#1d1d1f] content-stretch flex flex-col items-center justify-center py-[146px] relative size-full">
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
        <div className="col-1 h-[1248.922px] ml-px mt-0 relative row-1 w-[1251px]">
          <div className="absolute h-[1248.922px] left-0 top-0 w-[1251px]">
            <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgBgBlur}/>
          </div>
          <div className="absolute bg-[#0043a6] content-stretch flex flex-col h-[232.744px] items-start left-[37.4px] px-[51.113px] py-[92.657px] rounded-[14px] top-[37.41px] w-[1176.189px]">
            <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-[1074.364px]">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center not-italic relative shrink-0 text-[#cfe4ff] text-[50.922px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                <p className="leading-[22.915px]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "22.915px", fontFamily: "inherit", letterSpacing: "inherit" }}>Size Guide</p>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="col-1 h-[47.652px] ml-0 mt-0 relative row-1 w-[242.811px]">
                  <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgCapa8}/>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute content-stretch flex gap-[64.42px] items-start left-[37.4px] top-[337.69px]">
            <div className="content-stretch flex flex-col gap-[64.42px] items-center relative shrink-0 w-[555.885px]">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-semibold font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[46.679px] text-center text-white w-full" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                <p className="leading-[10.977px]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "10.977px", fontFamily: "inherit", letterSpacing: "inherit" }}>Google Flex</p>
              </div>
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                <div className="[word-break:break-word] border-[1.039px] border-[#c7c7c7] border-solid content-stretch flex flex-col gap-[24.937px] items-start not-italic p-[24.937px] relative rounded-[16.625px] shrink-0 text-[color:#f5f5f5] w-full">
                  <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-[family-name:var(--font-display)] font-semibold font-semibold leading-[normal] relative shrink-0 text-[24.937px] w-[841.62px]" style={{ color: "inherit", fontSize: "24.937px", fontWeight: 600, lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                    Google Flex - Titre SemiBold - 24/Auto
                  </p>
                  <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-[family-name:var(--font-display)] font-medium font-medium leading-[normal] relative shrink-0 text-[24.937px] w-[793.824px]" style={{ color: "inherit", fontSize: "24.937px", fontWeight: 500, lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                    Google Flex - Titre Medium - 24/Auto
                  </p>
                  <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-[family-name:var(--font-display)] font-medium font-medium leading-[normal] relative shrink-0 text-[18.703px] tracking-[-0.5195px] w-[530.948px]" style={{ color: "inherit", fontSize: "18.703px", fontWeight: 500, lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                    Google Flex - Titre Medium - 18/Auto
                  </p>
                  <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-[family-name:var(--font-display)] font-bold font-bold leading-[24.588px] relative shrink-0 text-[14.547px] w-[530.948px]" style={{ color: "inherit", fontSize: "14.547px", fontWeight: 700, lineHeight: "24.588px", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                    Google Flex - Titre Bold - 14/23.7
                  </p>
                </div>
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[64.42px] items-center relative shrink-0 w-[555.885px]">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-[family-name:var(--font-project-roboto)] font-semibold font-semibold justify-center leading-[0] relative shrink-0 text-[46.679px] text-center text-white w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[10.977px]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "10.977px", fontFamily: "inherit", letterSpacing: "inherit" }}>Roboto</p>
              </div>
              <div className="border-[1.039px] border-[#c7c7c7] border-solid content-stretch flex flex-col font-[family-name:var(--font-project-roboto)] font-medium font-medium gap-[24.937px] items-start leading-[normal] p-[24.937px] relative rounded-[16.625px] shrink-0 text-[color:#f5f5f5] w-full whitespace-nowrap">
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-[24.937px]" style={{ color: "inherit", fontSize: "24.937px", fontWeight: "inherit", lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Roboto - Titre L - 24/Auto
                </p>
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-[18.703px]" style={{ color: "inherit", fontSize: "18.703px", fontWeight: "inherit", lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Roboto - Titre M - 18/Auto
                </p>
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-[10.39px]" style={{ color: "inherit", fontSize: "10.39px", fontWeight: "inherit", lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Roboto - Titre S - 10/Auto
                </p>
              </div>
              <div className="border-[1.039px] border-[#c7c7c7] border-solid content-stretch flex flex-col gap-[24.937px] items-start leading-[normal] p-[24.937px] relative rounded-[16.625px] shrink-0 text-[color:#f5f5f5] w-full">
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-[family-name:var(--font-project-roboto)] font-medium font-medium relative shrink-0 text-[14.547px] whitespace-nowrap" style={{ color: "inherit", fontSize: "14.547px", fontWeight: 500, lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Roboto - Sous-titre L - 14/Auto
                </p>
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-[family-name:var(--font-project-roboto)] font-normal font-normal relative shrink-0 text-[12.468px] whitespace-nowrap" style={{ color: "inherit", fontSize: "12.468px", fontWeight: 400, lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Roboto - Sous-titre M - 12/Auto
                </p>
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-[family-name:var(--font-project-roboto)] font-normal font-normal relative shrink-0 text-[6.234px] w-[93.513px]" style={{ color: "inherit", fontSize: "6.234px", fontWeight: 400, lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Roboto - Sous-titre S - 6/Auto
                </p>
              </div>
              <div className="border-[1.039px] border-[#c7c7c7] border-solid content-stretch flex flex-col font-[family-name:var(--font-project-roboto)] font-normal font-normal gap-[24.937px] items-start p-[24.937px] relative rounded-[16.625px] shrink-0 text-[color:#f5f5f5] w-full whitespace-nowrap">
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[24.588px] relative shrink-0 text-[14.547px]" style={{ color: "inherit", fontSize: "14.547px", fontWeight: "inherit", lineHeight: "24.588px", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Roboto - Texte Regular - 14/23.7
                </p>
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[100.08999633789062%] relative shrink-0 text-[14.547px]" style={{ color: "inherit", fontSize: "14.547px", fontWeight: "inherit", lineHeight: "100.08999633789062%", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Roboto - Texte Proche - 14/100.1
                </p>
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[0] relative shrink-0 text-[12.468px]" style={{ color: "inherit", fontSize: "12.468px", fontWeight: "inherit", lineHeight: "0", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  <span className="leading-[normal]">{`Roboto - `}</span>
                  <span className="leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>
                    Texte Regular
                  </span>
                  <span className="leading-[normal]">{` - 12/Auto`}</span>
                </p>
              </div>
              <div className="border-[1.039px] border-[#c7c7c7] border-solid content-stretch flex flex-col font-[family-name:var(--font-project-roboto)] font-semibold font-semibold gap-[24.937px] items-start leading-[normal] p-[24.937px] relative rounded-[16.625px] shrink-0 text-[color:#f5f5f5] w-full whitespace-nowrap">
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-[14.547px] tracking-[0.1455px]" style={{ color: "inherit", fontSize: "14.547px", fontWeight: "inherit", lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Bouton Texte L - 14/Auto
                </p>
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-[12.468px]" style={{ color: "inherit", fontSize: "12.468px", fontWeight: "inherit", lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Bouton Texte M - 12/Auto
                </p>
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-[8.312px]" style={{ color: "inherit", fontSize: "8.312px", fontWeight: "inherit", lineHeight: "inherit", fontFamily: "inherit", letterSpacing: "inherit", fontVariationSettings: '"wdth" 100' }}>
                  Bouton Texte S - 8/Auto
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 h-[932px] ml-[597.64px] mt-[1305px] relative row-1 w-[654.416px]">
          <div className="absolute h-[932px] left-0 top-0 w-[654.416px]">
            <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgBgBlur1}/>
          </div>
          <div className="absolute bg-[#0043a6] content-stretch flex flex-col h-[173.684px] items-start left-[27.9px] px-[38.143px] py-[69.145px] rounded-[14px] top-[27.92px] w-[598.589px]">
            <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-[522.602px]">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center not-italic relative shrink-0 text-[#cfe4ff] text-[38px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                <p className="leading-[17.1px]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "17.1px", fontFamily: "inherit", letterSpacing: "inherit" }}>Home Pop-up</p>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="col-1 h-[35.56px] ml-0 mt-0 relative row-1 w-[181.196px]">
                  <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgCapa9}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 h-[783.374px] ml-px mt-[1305px] relative row-1 w-[550.056px]">
          <div className="absolute h-[783.374px] left-0 top-0 w-[550.056px]">
            <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgBgBlur2}/>
          </div>
          <div className="absolute bg-[#0043a6] content-stretch flex flex-col h-[145.986px] items-start left-[23.46px] px-[32.06px] py-[58.118px] rounded-[14px] top-[23.46px] w-[503.132px]">
            <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-[439.263px]">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center not-italic relative shrink-0 text-[#cfe4ff] text-[31.94px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                <p className="leading-[14.373px]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "14.373px", fontFamily: "inherit", letterSpacing: "inherit" }}>Top Bar</p>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="col-1 h-[29.889px] ml-0 mt-0 relative row-1 w-[152.301px]">
                  <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgCapa10}/>
                </div>
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center leading-[0] left-[97px] not-italic text-[#cfe4ff] text-[11.731px] top-[467.62px] tracking-[-0.3259px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
            <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Pages</p>
          </div>
          <div className="-translate-y-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center leading-[0] left-[97px] not-italic text-[#cfe4ff] text-[11.731px] top-[505.41px] tracking-[-0.3259px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
            <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Home Page</p>
          </div>
          <div className="-translate-y-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center leading-[0] left-[97px] not-italic text-[#cfe4ff] text-[11.731px] top-[536.05px] tracking-[-0.3259px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
            <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Account Page</p>
          </div>
          <div className="-translate-y-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center leading-[0] left-[97px] not-italic text-[#cfe4ff] text-[11.731px] top-[434.38px] tracking-[-0.3259px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
            <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Pages</p>
          </div>
          <div className="-translate-y-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center leading-[0] left-[97px] not-italic text-[#cfe4ff] text-[11.731px] top-[401.14px] tracking-[-0.3259px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
            <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Search</p>
          </div>
          <div className="-translate-y-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center leading-[0] left-[97px] not-italic text-[#cfe4ff] text-[11.731px] top-[367.9px] tracking-[-0.3259px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
            <p className="leading-[normal]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "normal", fontFamily: "inherit", letterSpacing: "inherit" }}>Apps</p>
          </div>
        </div>
        <div className="col-1 h-[719.1px] ml-[3px] mt-[2144px] relative row-1 w-[548px]">
          <div className="absolute h-[719.1px] left-0 top-0 w-[548px]">
            <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgBgBlur3}/>
          </div>
          <div className="absolute bg-[#0043a6] content-stretch flex flex-col h-[134.009px] items-start left-[21.53px] px-[29.43px] py-[53.35px] rounded-[14px] top-[21.54px] w-[504.926px]">
            <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-[446.297px]">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center not-italic relative shrink-0 text-[#cfe4ff] text-[29.32px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                <p className="leading-[13.194px]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "13.194px", fontFamily: "inherit", letterSpacing: "inherit" }}>App States — L</p>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="col-1 h-[27.437px] ml-0 mt-0 relative row-1 w-[139.805px]">
                  <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgCapa11}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 h-[858.171px] ml-[598px] mt-[2293px] relative row-1 w-[653.98px]">
          <div className="absolute h-[858.171px] left-0 top-0 w-[653.98px]">
            <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgBgBlur4}/>
          </div>
          <div className="absolute bg-[#0043a6] content-stretch flex flex-col h-[159.925px] items-start left-[25.7px] px-[35.121px] py-[63.667px] rounded-[14px] top-[25.7px] w-[602.576px]">
            <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-[532.608px]">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center not-italic relative shrink-0 text-[#cfe4ff] text-[34.99px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                <p className="leading-[15.746px]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "15.746px", fontFamily: "inherit", letterSpacing: "inherit" }}>App States — M</p>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="col-1 h-[32.743px] ml-0 mt-0 relative row-1 w-[166.843px]">
                  <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgCapa12}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 h-[723.037px] ml-0 mt-[2919px] relative row-1 w-[551px]">
          <div className="absolute h-[723.037px] left-0 top-0 w-[551px]">
            <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgBgBlur5}/>
          </div>
          <div className="absolute bg-[#0043a6] content-stretch flex flex-col h-[134.742px] items-start left-[21.65px] px-[29.591px] py-[53.642px] rounded-[14px] top-[21.65px] w-[507.69px]">
            <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-[448.74px]">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center not-italic relative shrink-0 text-[#cfe4ff] text-[29.48px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                <p className="leading-[13.266px]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "13.266px", fontFamily: "inherit", letterSpacing: "inherit" }}>App States — S</p>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="col-1 h-[27.587px] ml-0 mt-0 relative row-1 w-[140.57px]">
                  <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgCapa13}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 h-[798.627px] ml-[598px] mt-[3207px] relative row-1 w-[654.194px]">
          <div className="absolute h-[798.627px] left-0 top-0 w-[654.194px]">
            <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgBgBlur6}/>
          </div>
          <div className="absolute bg-[#0043a6] content-stretch flex flex-col h-[158.592px] items-start left-[25.5px] px-[34.829px] py-[63.137px] rounded-[14px] top-[25.49px] w-[597.554px]">
            <div className="content-stretch flex items-start justify-between leading-[0] relative shrink-0 w-[528.17px]">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center not-italic relative shrink-0 text-[#cfe4ff] text-[34.699px] whitespace-nowrap" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                <p className="leading-[15.614px]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "15.614px", fontFamily: "inherit", letterSpacing: "inherit" }}>Activity</p>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="col-1 h-[32.47px] ml-0 mt-0 relative row-1 w-[165.452px]">
                  <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgCapa14}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 h-[307px] ml-0 mt-[3699px] relative row-1 w-[551px]">
          <div className="absolute h-[307px] left-0 top-0 w-[551px]">
            <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgBgBlur7}/>
          </div>
          <div className="absolute bg-[#0043a6] content-stretch flex flex-col h-[119px] items-start left-[22px] px-[26.128px] py-[47.365px] rounded-[14px] top-[21px] w-[507px]">
            <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-[447px]">
              <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-col font-[family-name:var(--font-display)] font-medium font-medium justify-center not-italic relative shrink-0 text-[#cfe4ff] text-[26.031px] w-[132px]" style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 100' }}>
                <p className="leading-[11.714px]" style={{ color: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "11.714px", fontFamily: "inherit", letterSpacing: "inherit" }}>Gradient</p>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="col-1 h-[24.359px] ml-0 mt-0 relative row-1 w-[124.122px]">
                  <SvgAsset alt="" className="absolute block inset-0 max-w-none size-full" src={imgCapa15}/>
                </div>
              </div>
            </div>
          </div>
          <Degrade className="absolute h-[70.111px] left-[170px] top-[188.03px] w-[213.519px]"/>
        </div>
      </div>
    </div>);
}
