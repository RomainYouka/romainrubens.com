import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src/data/skills.json");

export async function GET() {
  try {
    const raw = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read skills data" }, { status: 500 });
  }
}
