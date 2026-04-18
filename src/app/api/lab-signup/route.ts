import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variables are missing");
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
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });

    if (!res.ok) {
      const body = await res.text();
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
