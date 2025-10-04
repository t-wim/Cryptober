'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  KEYWORD_MATRIX,
  NEGATIVE_DEFAULTS,
  buildManualPrompt,
  buildNegative,
  type Intensity,
  type SizeOpt
} from '@/lib/promptBuilder';

type ManualOut = { prompt: string; negative: string; n: number; size: SizeOpt };
type Props = { onChangeAction: (out: ManualOut) => void };

export default function ManualPromptForm({ onChangeAction }: Props) {
  const [intensity, setIntensity] = useState<Intensity>('medium');
  const [size, setSize] = useState<SizeOpt>('1024');
  const [n, setN] = useState<number>(3);

  // selections per category
  const [sel, setSel] = useState<Record<keyof typeof KEYWORD_MATRIX, string[]>>({
    scene: [], lighting: [], style: [], accents: [], palette: [], camera: [], memeCrypto: [],
  });

  // negatives (toggle)
  const [negatives, setNegatives] = useState<string[]>(NEGATIVE_DEFAULTS);

  const prompt = useMemo(
    () => buildManualPrompt(sel, intensity),
    [sel, intensity]
  );
  const negative = useMemo(
    () => buildNegative(negatives.filter(n => !NEGATIVE_DEFAULTS.includes(n))), // allow custom additions later
    [negatives]
  );

  useEffect(() => { onChangeAction({ prompt, negative, n, size }); }, [prompt, negative, n, size, onChangeAction]);

  function toggle(cat: keyof typeof KEYWORD_MATRIX, token: string) {
    setSel(prev => {
      const current = new Set(prev[cat] || []);
      current.has(token) ? current.delete(token) : current.add(token);
      return { ...prev, [cat]: Array.from(current) };
    });
  }

  function toggleNeg(token: string) {
    setNegatives(prev => {
      const s = new Set(prev);
      s.has(token) ? s.delete(token) : s.add(token);
      return Array.from(s);
    });
  }

  return (
    <div className="card space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <label className="text-sm">Intensity:</label>
        {(['soft','medium','strong'] as Intensity[]).map(v => (
          <button key={v}
            type="button"
            onClick={() => setIntensity(v)}
            className={`px-3 py-1 rounded-full border ${intensity===v?'border-pumpkin bg-pumpkin text-black':'border-white/20'}`}>
            {v}
          </button>
        ))}

        <label className="text-sm ml-4">n</label>
        <select value={n} onChange={e => setN(Number(e.target.value))}
          className="px-2 py-1 rounded border border-white/20 bg-transparent">
          {[3,4,6].map(x => <option key={x} value={x}>{x}</option>)}
        </select>

        <label className="text-sm ml-4">Size</label>
        <select value={size} onChange={e => setSize(e.target.value as SizeOpt)}
          className="px-2 py-1 rounded border border-white/20 bg-transparent">
          <option value="512">512</option>
          <option value="1024">1024</option>
        </select>
      </div>

      {(
        Object.keys(KEYWORD_MATRIX) as (keyof typeof KEYWORD_MATRIX)[]
      ).map(cat => (
        <div key={cat}>
          <div className="text-sm font-semibold mb-2">{cat}</div>
          <div className="flex flex-wrap gap-2">
            {KEYWORD_MATRIX[cat].map(token => {
              const active = sel[cat]?.includes(token);
              return (
                <button key={token} type="button"
                  onClick={() => toggle(cat, token)}
                  className={`px-2 py-1 text-xs rounded-full border ${active?'border-pumpkin bg-pumpkin text-black':'border-white/20'}`}>
                  {token}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div>
        <div className="text-sm font-semibold mb-2">negatives</div>
        <div className="flex flex-wrap gap-2">
          {NEGATIVE_DEFAULTS.map(token => {
            const active = negatives.includes(token);
            return (
              <button key={token} type="button"
                onClick={() => toggleNeg(token)}
                className={`px-2 py-1 text-xs rounded-full border ${active?'border-white/50':'border-white/20 opacity-60'}`}>
                {token}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-xs opacity-80">
        <div className="font-semibold mb-1">Prompt Preview</div>
        <pre className="whitespace-pre-wrap">{prompt}</pre>
        <div className="font-semibold mt-2 mb-1">Negative</div>
        <pre className="whitespace-pre-wrap">{negative}</pre>
      </div>
    </div>
  );
}