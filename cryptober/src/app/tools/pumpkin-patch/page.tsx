'use client';
import { useState } from 'react';

export default function PumpkinPatchPage() {
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  async function generate() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/pfp', {
        method: 'POST',
        body: JSON.stringify({ handle }),
      });
      const data = await res.json();
      setResult(data.preview);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Pumpkin Patch PFP Studio</h1>
      <div className="card" role="form" aria-labelledby="pp-label">
        <label id="pp-label" className="block text-sm mb-2">
          Handle
        </label>
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="w-full rounded-xl bg-white/5 px-3 py-2"
          placeholder="@degen"
          inputMode="text"
          aria-label="Handle"
          data-event="_input_handle_"
        />
        <button
          className="btn-accent mt-3"
          onClick={generate}
          data-event="_generate_pfp_"
          aria-busy={loading}
          disabled={loading || !handle}
        >
          {loading ? 'Generating' : 'Generate'}
        </button>
        {result && <p className="muted mt-3 text-sm">Preview: {result}</p>}
        {!result && !loading && <p className="muted mt-3 text-sm">No preview yet.</p>}
      </div>
    </div>
  );
}
