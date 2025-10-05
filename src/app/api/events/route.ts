// src/app/api/events/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    // Hier nur loggen; später: KV/DB oder Analytics-Forwarder
    console.log("[telemetry]", JSON.stringify(data));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "bad_payload" }, { status: 400 });
  }
}
