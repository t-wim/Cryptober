'use client';
import { useState } from 'react';

export default function CandleCarverPage() {
  const [sl, setSl] = useState(5);
  const [target, setTarget] = useState(1500000);
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<any>(null);

  async function simulate() {
    setLoading(true);
    setOut(null);
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        body: JSON.stringify({ sl, target }),
      });
      setOut(await res.json());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Candle Carver MCAP Simulator</h1>
      <div className="card space-y-2" role="form" aria-labelledby="cc-label">
        <span id="cc-label" className="text-sm">
          Simulation parameters
        </span>
        <label className="text-sm">Stop Loss (%)</label>
        <input
          type="number"
          className="w-full rounded-xl bg-white/5 px-3 py-2"
          value={sl}
          onChange={(e) => setSl(Number(e.target.value))}
          aria-label="Stop Loss percent"
          min={0}
          max={100}
        />
        <label className="text-sm">Target MCAP</label>
        <input
          type="number"
          className="w-full rounded-xl bg-white/5 px-3 py-2"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          aria-label="Target market cap"
          min={0}
        />
        <button
          className="btn-accent"
          onClick={simulate}
          data-event="_simulate_"
          aria-busy={loading}
          disabled={loading}
        >
          {loading ? 'Simulating' : 'Simulate'}
        </button>
        {out ? (
          <pre className="text-xs mt-3" aria-live="polite">
            {JSON.stringify(out, null, 2)}
          </pre>
        ) : (
          <p className="muted text-sm">No result yet.</p>
        )}
      </div>
    </div>
  );
}
