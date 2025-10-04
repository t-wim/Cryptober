import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { sl = 5, target = 1500000 } = await req.json().catch(() => ({}));
  return NextResponse.json({ sl, target, path: [100000, 250000, 600000, target] });
}
