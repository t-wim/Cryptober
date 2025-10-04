async function ping(path: string) {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    return { path, ok: res.ok, status: res.status };
  } catch {
    return { path, ok: false, status: 0 };
  }
}

export default async function SmokePage() {
  const endpoints = [
    '/',
    '/milestones',
    '/tools/oracle',
    '/tools/pumpkin-patch',
    '/tools/candle-carver',
    '/api/oracle/daily',
    '/api/milestones',
    '/api/simulate',
    '/api/pfp',
    '/api/events',
  ];
  const results = await Promise.all(endpoints.map(ping));
  const events = await fetch('/api/events', { cache: 'no-store' })
    .then((r) => r.json())
    .catch(() => ({ items: [] as any[] }));
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Smoke Test</h1>
      <div className="card">
        <h2 className="font-medium mb-2">Routes</h2>
        <ul className="text-sm space-y-1">
          {results.map((r) => (
            <li key={r.path}>
              <code>{r.path}</code> {r.ok ? 'OK' : 'FAIL'} ({r.status})
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h2 className="font-medium mb-2">Recent Events</h2>
        <pre className="text-xs overflow-auto">{JSON.stringify(events.items ?? [], null, 2)}</pre>
      </div>
    </div>
  );
}
