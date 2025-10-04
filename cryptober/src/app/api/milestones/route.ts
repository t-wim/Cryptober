import { NextResponse } from 'next/server';
let store = [{ mcap: 50000, note: 'Kickoff' }];
export async function GET() {
  return NextResponse.json(store);
}
export async function POST(req: Request) {
  const data = await req.json().catch(() => store);
  if (Array.isArray(data)) store = data;
  return NextResponse.json({ ok: true, count: store.length });
}
