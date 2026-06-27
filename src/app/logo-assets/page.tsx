"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

export default function LogoAssetsPage() {
  const [copied, setCopied] = useState(false);
  const logoPath = "/icons/logo-romain-rubens.svg";
  const logoUrl = typeof window !== "undefined" ? `${window.location.origin}${logoPath}` : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(logoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main id="main-content" className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-[#1d1d1f]">Logo Romain Rubens</h1>
          <p className="text-sm text-[#666666]">Lien direct vers le logo principal utilisé par le site.</p>
        </div>

        <div className="bg-[#f5f5f7] rounded-2xl p-8 flex items-center justify-center border border-[#d2d2d7]">
          <img src={logoPath} alt="Logo Romain Rubens" className="h-12 w-auto max-w-full" width="699" height="76" />
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              readOnly
              value={logoUrl}
              className="w-full bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl px-4 py-3 text-sm font-mono text-[#1d1d1f] focus:outline-none"
            />
            <button
              onClick={handleCopy}
              type="button"
              aria-label="Copier le lien du logo"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-[#e8e8ed] rounded-lg transition-colors"
            >
              {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} className="text-[#3C3C3C]" />}
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              type="button"
              className="flex-1 bg-[#3C3C3C] text-white rounded-xl py-3 text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {copied ? "Copié !" : "Copier le lien"}
            </button>
            <a
              href={logoPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white border border-[#d2d2d7] text-[#1d1d1f] rounded-xl py-3 text-sm font-medium hover:bg-[#f5f5f7] transition-colors flex items-center justify-center gap-2"
            >
              Ouvrir l'image <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <p className="text-xs text-[#86868b]">
          Note : Ce lien est public et permanent, idéal pour une intégration dans Outlook, Gmail ou Apple Mail.
        </p>
      </div>
    </main>
  );
}
