async function fetchDaily(): Promise<{ date: string; memes: string[]; posts: string[] }> {
  const res = await fetch('/api/oracle/daily', { cache: 'no-store' });
  return res.json();
}

export default async function OraclePage() {
  const data = await fetchDaily();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Uptober Oracle</h1>
      <p className="muted">Signals & meme trends (mock)</p>
      <div className="card" role="region" aria-labelledby="oracle-brief">
        <div id="oracle-brief" className="muted text-xs mb-2">
          Daily brief: {data.date}
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-1">Memes</h3>
            <ul className="list-disc pl-5 text-sm">
              {data.memes.map((m) => (
                <li key={m} data-event="_view_memes_">
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-1">Post suggestions</h3>
            <ul className="list-disc pl-5 text-sm">
              {data.posts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
