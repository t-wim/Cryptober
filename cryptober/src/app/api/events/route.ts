import { NextResponse } from 'next/server';

type EventItem = { id: string; path: string; ts: number; meta?: Record<string, unknown> };

let store: EventItem[] = [];

export async function POST(req: Request) {
  const data = (await req.json().catch(() => ({}))) as Partial<EventItem>;
  if (!data || typeof data.id !== 'string') {
    return NextResponse.json({ ok: false, error: 'invalid_event' }, { status: 400 });
  }
  const item: EventItem = {
    id: data.id,
    path: typeof data.path === 'string' ? data.path : '/',
    ts: typeof data.ts === 'number' ? data.ts : Date.now(),
    meta: typeof data.meta === 'object' && data.meta ? data.meta : undefined,
  };
  store.unshift(item);
  if (store.length > 200) store = store.slice(0, 200);
  return NextResponse.json({ ok: true, count: store.length });
}

export async function GET() {
  return NextResponse.json({ ok: true, items: store.slice(0, 25) });
}
