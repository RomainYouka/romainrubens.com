import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PASSWORD = "IfYouEnTrYhErE!PlZdoNOTmoDIfy:";
const dataPath = path.join(process.cwd(), "src/data/skills.json");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, data } = body;

    if (password !== PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!data || !data.categories) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update skills data" }, { status: 500 });
  }
}
