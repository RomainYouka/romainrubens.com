import { NextRequest, NextResponse } from "next/server";

// Supabase — créer la table via le dashboard :
// CREATE TABLE lab_waitlist (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   email text NOT NULL UNIQUE,
//   language text DEFAULT 'FR',
//   created_at timestamptz DEFAULT now()
// );
// Activer les notifications email depuis Supabase > Database > Webhooks
// ou consulter les inscriptions dans Table Editor > lab_waitlist

export async function POST(req: NextRequest) {
  try {
    const { email, language } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://slelguoygbfzlpylpxfs.supabase.co";
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseKey) {
      console.error("SUPABASE_SERVICE_KEY not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/lab_waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ email: email.trim().toLowerCase(), language: language ?? "FR" }),
    });

    if (!res.ok) {
      const body = await res.text();
      // Email already registered — treat as success (no duplicate error shown to user)
      if (res.status === 409 || body.includes("duplicate")) {
        return NextResponse.json({ ok: true });
      }
      console.error("Supabase error:", res.status, body);
      return NextResponse.json({ error: "Storage error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lab-signup error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
