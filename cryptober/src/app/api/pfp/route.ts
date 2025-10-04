import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { handle = '' } = await req.json().catch(() => ({}));
  return NextResponse.json({
    ok: true,
    handle,
    preview: `pfp://${handle || 'anon'}?overlay=pumpkin-glow`,
  });
}
