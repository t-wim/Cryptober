import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json().catch(()=>({}));
  const path = Array.from({length:16},(_,i)=>Math.max(0, Math.round(100 + Math.sin(i/2)*20 + Math.random()*10)));
  return NextResponse.json({ ok: true, params: body, path });
}
