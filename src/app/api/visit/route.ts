import { NextResponse } from "next/server";
import { logVisit } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { path } = await req.json();

    const userAgent = req.headers.get("user-agent");
    const referer = req.headers.get("referer");

    await logVisit(path, userAgent, referer);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to log visit:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
