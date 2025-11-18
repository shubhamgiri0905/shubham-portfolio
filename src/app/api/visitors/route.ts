import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const result = await sql`SELECT COUNT(*)::int AS count FROM visits;`;
    return NextResponse.json({ visitors: result.rows[0].count });
  } catch (error) {
    console.error("Visitor count error:", error);
    return NextResponse.json({ visitors: 0 });
  }
}
