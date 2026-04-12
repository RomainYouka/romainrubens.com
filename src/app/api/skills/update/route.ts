import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src/data/skills.json");

// ── Rate limiting (in-memory, 5 tentatives / 15 min par IP) ───────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_ATTEMPTS) return true;
  entry.count++;
  return false;
}

// ── Validation de la structure skills ─────────────────────────────────────
function isValidSkillsData(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  if (!Array.isArray(d.categories)) return false;
  for (const cat of d.categories as unknown[]) {
    if (!cat || typeof cat !== "object") return false;
    const c = cat as Record<string, unknown>;
    if (typeof c.id !== "string" || typeof c.order !== "number") return false;
    if (!Array.isArray(c.skills)) return false;
    for (const skill of c.skills as unknown[]) {
      if (!skill || typeof skill !== "object") return false;
      const s = skill as Record<string, unknown>;
      if (typeof s.id !== "string" || typeof s.rating !== "number") return false;
      if (s.rating < 0 || s.rating > 5) return false;
    }
  }
  return true;
}

export async function POST(request: NextRequest) {
  // Récupération de l'IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { password, data } = body;

    // Vérification du mot de passe via variable d'environnement
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validation stricte de la structure
    if (!isValidSkillsData(data)) {
      return NextResponse.json({ error: "Invalid data structure" }, { status: 400 });
    }

    // Écriture atomique (fichier temp → rename)
    const tempPath = dataPath + ".tmp";
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempPath, dataPath);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update skills data" }, { status: 500 });
  }
}
