"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ChevronDown, Trash2, Plus, Check, X, Lock, ArrowLeft, Save } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  rating: number;
}

interface Category {
  id: string;
  names: { FR: string; EN: string; ՀԱՅ: string };
  order: number;
  skills: Skill[];
}

interface SkillsData {
  lastUpdated: string;
  categories: Category[];
}

const generateId = () => Math.random().toString(36).slice(2, 10);

const StarEditor = ({ rating, onChange }: { rating: number; onChange: (r: number) => void }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const displayed = hovered ?? rating;
  const clamped = Math.min(5, Math.max(0, Math.round(displayed)));

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange(star)}
          className="w-5 h-5 flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
          aria-label={`Set rating to ${star}`}
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill={star <= clamped ? "#1d1d1f" : "none"} stroke="#1d1d1f" strokeWidth="1.5">
            <path d="M10 1.5l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.77l-4.77 2.44.91-5.32L2.27 7.12l5.34-.78L10 1.5z" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
      <span className="ml-1 text-xs text-[#999999] w-5 text-right">{rating}/5</span>
    </div>
  );
};

const StarPreview = ({ rating }: { rating: number }) => {
  const clamped = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="relative w-20 h-5 flex-shrink-0">
      <Image src={`/skills/stars-${clamped}.png`} alt={`${clamped} stars`} fill sizes="80px" className="object-contain" />
    </div>
  );
};

function AuthGate({ onAuth }: { onAuth: (pwd: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || checking) return;
    setChecking(true);

    const res = await fetch("/api/skills/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, data: null }),
    });

    setChecking(false);

    if (res.status === 400) {
      onAuth(password);
    } else {
      setError(true);
      setShake(true);
      setPassword("");
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4" style={{ fontFamily: "var(--font-body)" }}>
      <div className="w-full max-w-sm">
        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 md:p-10 shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center mb-4">
              <Lock size={20} className="text-[#1d1d1f]" />
            </div>
            <h1 className="text-xl font-bold text-[#1d1d1f] mb-1">Administration</h1>
            <p className="text-sm text-[#999999] text-center">Accès restreint — Compétences</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div
              style={{
                animation: shake ? "adminShake 0.5s ease-in-out" : "none",
              }}
            >
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Mot de passe"
                className={`w-full px-4 py-3 rounded-lg border text-sm text-[#1d1d1f] bg-[#F5F5F5] outline-none transition-colors placeholder:text-[#C0C0C0] ${
                  error ? "border-red-400 bg-red-50" : "border-[#E5E5E5] focus:border-[#1d1d1f]"
                }`}
                autoComplete="current-password"
              />
              {error && <p className="text-xs text-red-500 mt-1.5 pl-1">Mot de passe incorrect.</p>}
            </div>
            <button
              type="submit"
              disabled={!password || checking}
              className="w-full py-3 rounded-lg bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#333] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {checking && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              Entrer
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/skills" className="text-xs text-[#999999] hover:text-[#1d1d1f] transition-colors">
              ← Retour aux compétences
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes adminShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-7px); }
          40% { transform: translateX(7px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </main>
  );
}

function AdminPanel({ initialData, password }: { initialData: SkillsData; password: string }) {
  const [data, setData] = useState<SkillsData>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingCatValues, setEditingCatValues] = useState<{ FR: string; EN: string; ՀԱՅ: string }>({ FR: "", EN: "", ՀԱՅ: "" });

  const [editingSkill, setEditingSkill] = useState<{ catId: string; skillId: string } | null>(null);
  const [editingSkillName, setEditingSkillName] = useState("");

  const [addingSkillCatId, setAddingSkillCatId] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState("");

  const [addingCategory, setAddingCategory] = useState(false);
  const [newCatNames, setNewCatNames] = useState({ FR: "", EN: "", ՀԱՅ: "" });

  const sorted = [...data.categories].sort((a, b) => a.order - b.order);

  const save = async () => {
    setSaving(true);
    setSaveError(false);
    try {
      const res = await fetch("/api/skills/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        setSaveError(true);
      }
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  const moveCat = (id: string, dir: "up" | "down") => {
    const cats = [...data.categories].sort((a, b) => a.order - b.order);
    const idx = cats.findIndex((c) => c.id === id);
    const swapIdx = dir === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= cats.length) return;
    const newCats = cats.map((c, i) => {
      if (i === idx) return { ...c, order: cats[swapIdx].order };
      if (i === swapIdx) return { ...c, order: cats[idx].order };
      return c;
    });
    setData({ ...data, categories: newCats });
  };

  const deleteCat = (id: string) => {
    setData({ ...data, categories: data.categories.filter((c) => c.id !== id) });
  };

  const startEditCat = (cat: Category) => {
    setEditingCatId(cat.id);
    setEditingCatValues({ ...cat.names });
  };

  const confirmEditCat = () => {
    if (!editingCatId) return;
    setData({
      ...data,
      categories: data.categories.map((c) =>
        c.id === editingCatId ? { ...c, names: { ...editingCatValues } } : c
      ),
    });
    setEditingCatId(null);
  };

  const addCategory = () => {
    if (!newCatNames.FR.trim()) return;
    const newCat: Category = {
      id: generateId(),
      names: { ...newCatNames },
      order: data.categories.length,
      skills: [],
    };
    setData({ ...data, categories: [...data.categories, newCat] });
    setNewCatNames({ FR: "", EN: "", ՀԱՅ: "" });
    setAddingCategory(false);
  };

  const deleteSkill = (catId: string, skillId: string) => {
    setData({
      ...data,
      categories: data.categories.map((c) =>
        c.id === catId ? { ...c, skills: c.skills.filter((s) => s.id !== skillId) } : c
      ),
    });
  };

  const updateSkillRating = (catId: string, skillId: string, rating: number) => {
    setData({
      ...data,
      categories: data.categories.map((c) =>
        c.id === catId
          ? { ...c, skills: c.skills.map((s) => (s.id === skillId ? { ...s, rating } : s)) }
          : c
      ),
    });
  };

  const startEditSkill = (catId: string, skill: Skill) => {
    setEditingSkill({ catId, skillId: skill.id });
    setEditingSkillName(skill.name);
  };

  const confirmEditSkill = () => {
    if (!editingSkill) return;
    const { catId, skillId } = editingSkill;
    setData({
      ...data,
      categories: data.categories.map((c) =>
        c.id === catId
          ? { ...c, skills: c.skills.map((s) => (s.id === skillId ? { ...s, name: editingSkillName.trim() || s.name } : s)) }
          : c
      ),
    });
    setEditingSkill(null);
  };

  const moveSkill = (catId: string, skillId: string, dir: "up" | "down") => {
    setData({
      ...data,
      categories: data.categories.map((c) => {
        if (c.id !== catId) return c;
        const skills = [...c.skills];
        const idx = skills.findIndex((s) => s.id === skillId);
        const swapIdx = dir === "up" ? idx - 1 : idx + 1;
        if (swapIdx < 0 || swapIdx >= skills.length) return c;
        [skills[idx], skills[swapIdx]] = [skills[swapIdx], skills[idx]];
        return { ...c, skills };
      }),
    });
  };

  const addSkill = (catId: string) => {
    if (!newSkillName.trim()) return;
    const newSkill: Skill = { id: generateId(), name: newSkillName.trim(), rating: 3 };
    setData({
      ...data,
      categories: data.categories.map((c) =>
        c.id === catId ? { ...c, skills: [...c.skills, newSkill] } : c
      ),
    });
    setNewSkillName("");
    setAddingSkillCatId(null);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] w-full" style={{ fontFamily: "var(--font-body)" }}>
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-20 md:py-28">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
          <div>
            <Link href="/skills" className="inline-flex items-center gap-1.5 text-sm text-[#999999] hover:text-[#1d1d1f] transition-colors mb-3">
              <ArrowLeft size={14} />
              Retour aux compétences
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f]">Administration</h1>
            <p className="text-sm text-[#999999] mt-1">Gérez les catégories et compétences affichées sur la page publique.</p>
          </div>
          <div className="flex flex-col items-end gap-2 mt-auto">
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#333] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : saved ? (
                <Check size={15} />
              ) : (
                <Save size={15} />
              )}
              {saving ? "Sauvegarde…" : saved ? "Sauvegardé !" : "Sauvegarder"}
            </button>
            {saveError && <p className="text-xs text-red-500">Erreur lors de la sauvegarde.</p>}
          </div>
        </div>

        {/* Last Updated */}
        <div className="mb-8 p-4 bg-white border border-[#E5E5E5] rounded-xl flex items-center gap-3">
          <span className="text-sm text-[#666666] shrink-0">Dernière mise à jour :</span>
          <input
            type="text"
            value={data.lastUpdated}
            onChange={(e) => setData({ ...data, lastUpdated: e.target.value })}
            className="flex-1 text-sm text-[#1d1d1f] bg-transparent border-b border-transparent focus:border-[#1d1d1f] outline-none py-0.5 transition-colors"
            placeholder="ex: 23 Mars 2026"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-5">
          {sorted.map((cat, catIdx) => (
            <div key={cat.id} className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">

              {/* Category header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F2F2F2]">
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => moveCat(cat.id, "up")}
                    disabled={catIdx === 0}
                    className="p-0.5 text-[#C0C0C0] hover:text-[#1d1d1f] disabled:opacity-20 transition-colors"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    onClick={() => moveCat(cat.id, "down")}
                    disabled={catIdx === sorted.length - 1}
                    className="p-0.5 text-[#C0C0C0] hover:text-[#1d1d1f] disabled:opacity-20 transition-colors"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>

                {editingCatId === cat.id ? (
                  <div className="flex-1 flex flex-col gap-2">
                    {(["FR", "EN", "ՀԱՅ"] as const).map((lang) => (
                      <div key={lang} className="flex items-center gap-2">
                        <span className="text-xs text-[#999999] w-7 shrink-0 font-mono">{lang}</span>
                        <input
                          type="text"
                          value={editingCatValues[lang]}
                          onChange={(e) => setEditingCatValues({ ...editingCatValues, [lang]: e.target.value })}
                          className="flex-1 text-sm border-b border-[#E5E5E5] focus:border-[#1d1d1f] outline-none py-0.5 bg-transparent transition-colors"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") confirmEditCat();
                            if (e.key === "Escape") setEditingCatId(null);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <button onClick={() => startEditCat(cat)} className="flex-1 text-left group">
                    <p className="font-semibold text-[#1d1d1f] text-sm group-hover:underline underline-offset-2">{cat.names.FR}</p>
                    <p className="text-xs text-[#999999] mt-0.5">{cat.names.EN} · {cat.names["ՀԱՅ"]}</p>
                  </button>
                )}

                <div className="flex items-center gap-1 ml-2">
                  {editingCatId === cat.id ? (
                    <>
                      <button onClick={confirmEditCat} className="p-1.5 text-[#1d1d1f] hover:bg-[#F0F0F0] rounded-lg transition-colors">
                        <Check size={14} />
                      </button>
                      <button onClick={() => setEditingCatId(null)} className="p-1.5 text-[#999999] hover:bg-[#F0F0F0] rounded-lg transition-colors">
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => deleteCat(cat.id)}
                      className="p-1.5 text-[#C0C0C0] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <span className="text-xs text-[#C0C0C0] bg-[#F5F5F5] px-2 py-0.5 rounded-full shrink-0">
                  {cat.skills.length}
                </span>
              </div>

              {/* Skills */}
              <div className="divide-y divide-[#F5F5F5]">
                {cat.skills.map((skill, skillIdx) => (
                  <div key={skill.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button
                        onClick={() => moveSkill(cat.id, skill.id, "up")}
                        disabled={skillIdx === 0}
                        className="p-0.5 text-[#D0D0D0] hover:text-[#1d1d1f] disabled:opacity-20 transition-colors"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        onClick={() => moveSkill(cat.id, skill.id, "down")}
                        disabled={skillIdx === cat.skills.length - 1}
                        className="p-0.5 text-[#D0D0D0] hover:text-[#1d1d1f] disabled:opacity-20 transition-colors"
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>

                    {editingSkill?.catId === cat.id && editingSkill?.skillId === skill.id ? (
                      <input
                        type="text"
                        value={editingSkillName}
                        autoFocus
                        onChange={(e) => setEditingSkillName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") confirmEditSkill();
                          if (e.key === "Escape") setEditingSkill(null);
                        }}
                        onBlur={confirmEditSkill}
                        className="flex-1 min-w-0 text-sm border-b border-[#1d1d1f] outline-none py-0.5 bg-transparent"
                      />
                    ) : (
                      <button
                        onClick={() => startEditSkill(cat.id, skill)}
                        className="flex-1 min-w-0 text-left text-sm text-[#1d1d1f] hover:underline underline-offset-2 py-0.5 truncate"
                      >
                        {skill.name}
                      </button>
                    )}

                    <div className="flex items-center gap-3 shrink-0">
                      <StarEditor rating={skill.rating} onChange={(r) => updateSkillRating(cat.id, skill.id, r)} />
                      <StarPreview rating={skill.rating} />
                    </div>

                    <button
                      onClick={() => deleteSkill(cat.id, skill.id)}
                      className="p-1.5 text-[#D0D0D0] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}

                {/* Add skill */}
                {addingSkillCatId === cat.id ? (
                  <div className="flex items-center gap-3 px-5 py-3 bg-[#FAFAFA]">
                    <div className="w-5 shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addSkill(cat.id);
                        if (e.key === "Escape") { setAddingSkillCatId(null); setNewSkillName(""); }
                      }}
                      placeholder="Nom de la compétence…"
                      className="flex-1 text-sm border-b border-[#1d1d1f] outline-none py-0.5 bg-transparent placeholder:text-[#C0C0C0]"
                    />
                    <button onClick={() => addSkill(cat.id)} className="p-1.5 text-[#1d1d1f] hover:bg-[#F0F0F0] rounded-lg transition-colors">
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => { setAddingSkillCatId(null); setNewSkillName(""); }}
                      className="p-1.5 text-[#999999] hover:bg-[#F0F0F0] rounded-lg transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setAddingSkillCatId(cat.id); setNewSkillName(""); }}
                    className="flex items-center gap-2 w-full px-5 py-3 text-sm text-[#999999] hover:text-[#1d1d1f] hover:bg-[#FAFAFA] transition-colors text-left"
                  >
                    <Plus size={13} />
                    Ajouter une compétence
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add category */}
          {addingCategory ? (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
              <p className="text-sm font-semibold text-[#1d1d1f] mb-4">Nouvelle catégorie</p>
              <div className="flex flex-col gap-3 mb-5">
                {(["FR", "EN", "ՀԱՅ"] as const).map((lang) => (
                  <div key={lang} className="flex items-center gap-3">
                    <span className="text-xs text-[#999999] font-mono w-7 shrink-0">{lang}</span>
                    <input
                      type="text"
                      value={newCatNames[lang]}
                      onChange={(e) => setNewCatNames({ ...newCatNames, [lang]: e.target.value })}
                      placeholder={lang === "FR" ? "Nom en français" : lang === "EN" ? "Name in English" : "Անuñ հayereñ"}
                      className="flex-1 text-sm border-b border-[#E5E5E5] focus:border-[#1d1d1f] outline-none py-0.5 bg-transparent transition-colors placeholder:text-[#C0C0C0]"
                      onKeyDown={(e) => { if (e.key === "Enter") addCategory(); }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addCategory}
                  disabled={!newCatNames.FR.trim()}
                  className="px-4 py-2 rounded-lg bg-[#1d1d1f] text-white text-sm hover:bg-[#333] transition-colors disabled:opacity-40"
                >
                  Créer la catégorie
                </button>
                <button
                  onClick={() => { setAddingCategory(false); setNewCatNames({ FR: "", EN: "", ՀԱՅ: "" }); }}
                  className="px-4 py-2 rounded-lg border border-[#E5E5E5] text-sm text-[#666666] hover:bg-[#F5F5F5] transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAddingCategory(true)}
              className="flex items-center gap-2 w-full px-5 py-4 bg-white border border-dashed border-[#D0D0D0] rounded-xl text-sm text-[#999999] hover:text-[#1d1d1f] hover:border-[#1d1d1f] hover:bg-[#FAFAFA] transition-all"
            >
              <Plus size={15} />
              Ajouter une catégorie
            </button>
          )}
        </div>

        {/* Bottom save */}
        <div className="mt-10 pt-6 border-t border-[#E5E5E5] flex justify-end">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#333] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : saved ? <Check size={15} /> : <Save size={15} />}
            {saving ? "Sauvegarde…" : saved ? "Sauvegardé !" : "Sauvegarder les modifications"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<SkillsData | null>(null);
  const [loadError, setLoadError] = useState(false);

  const handleAuth = (pwd: string) => {
    setPassword(pwd);
    setAuthenticated(true);
    fetch("/api/skills")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setLoadError(true));
  };

  if (!authenticated) {
    return <AuthGate onAuth={handleAuth} />;
  }

  if (loadError) {
    return (
      <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[#999999]">Erreur de chargement des données.</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[#999999]">Chargement…</p>
      </main>
    );
  }

  return <AdminPanel initialData={data} password={password} />;
}
