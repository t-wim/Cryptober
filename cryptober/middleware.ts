import { NextResponse, type NextRequest } from 'next/server';

const WINDOW_MS = 60_000;
const MAX_REQ = 60;
const bucket = new Map<string, { count: number; reset: number }>();

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/api/')) return NextResponse.next();

  const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anon';

  const now = Date.now();
  const item = bucket.get(ip);
  if (!item || item.reset < now) {
    bucket.set(ip, { count: 1, reset: now + WINDOW_MS });
    return NextResponse.next();
  }

  if (item.count >= MAX_REQ) {
    const res = NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
    res.headers.set('Retry-After', String(Math.ceil((item.reset - now) / 1000)));
    return res;
  }

  item.count++;
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
