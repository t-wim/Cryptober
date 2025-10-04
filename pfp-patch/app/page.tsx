'use client';
import { useState } from 'react';
import Uploader from '@/components/Uploader';
import PresetPicker from '@/components/PresetPicker';
import Gallery from '@/components/Gallery';
import ExportBar from '@/components/ExportBar';
import MaskTool from '@/components/MaskTool';
import ManualPromptForm from '@/components/tools/ManualPromptForm';
import { buildRandomPrompt, ONECLICK_PRESETS } from '@/lib/promptBuilder';

type Mode = 'manual' | 'oneclick';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [maskFile, setMaskFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>('oneclick');

  // one-click
  const [presetId, setPresetId] = useState<string | undefined>(ONECLICK_PRESETS[0]?.id);

  // manual
  const [manualOut, setManualOut] = useState<{ prompt: string; negative: string; n: number; size: '512'|'1024' } | null>(null);

  // results
  const [generating, setGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [picked, setPicked] = useState<number | null>(null);

  async function transformAction() {
    if (!file) return;
    setGenerating(true);
    setPicked(null);
    setImages([]);

   const fd = new FormData();
fd.append('image', file);

// ---- Mode korrekt setzen (nur EINMAL) ----
if (mode === 'manual') {
  fd.set('mode', 'manual');
  if (!manualOut) { setGenerating(false); return; }
  fd.append('prompt', manualOut.prompt);
  fd.append('negative', manualOut.negative);
  fd.append('n', String(manualOut.n));
  fd.append('size', manualOut.size);
} else {
  // one-click
  if (presetId && presetId !== 'random') {
    fd.set('mode', 'oneclick');
    fd.append('presetId', presetId);
  } else {
    // RANDOM → als MANUAL senden (kein zweites append von 'mode'!)
    const { prompt, negative } = buildRandomPrompt();
    fd.set('mode', 'manual');
    fd.append('prompt', prompt);
    fd.append('negative', negative);
    fd.append('n', '4');
    fd.append('size', '1024');
  }
}

if (maskFile) fd.append('mask', maskFile, 'mask.png');


    try {
      const res = await fetch('/api/edit', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setImages(data.images || []);
    } catch (e: any) {
      alert(e?.message || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  }

  function exportPickedAction() {
    if (picked == null) return;
    const img = images[picked];
    const a = document.createElement('a');
    a.href = img; a.download = 'pumpkin-patch.png'; a.click();
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pumpkin Patch</h1>
        <div className="opacity-75">PFP Generator</div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Uploader onFileAction={setFile}/>
        <div className="space-y-3">
          {/* Mode Switch */}
          <div className="flex gap-2">
            {(['oneclick','manual'] as Mode[]).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-full border ${mode===m?'border-pumpkin bg-pumpkin text-black':'border-white/20'}`}
              >
                {m === 'oneclick' ? 'One-Click' : 'Manual'}
              </button>
            ))}
          </div>

          {/* Mode Content */}
          {mode === 'oneclick' ? (
            <PresetPicker
              selectedId={presetId}
              onSelectAction={(id) => setPresetId(id)}
              onRandomAction={() => setPresetId('random')}
            />
          ) : (
            <ManualPromptForm onChangeAction={setManualOut}/>
          )}

          <button
            onClick={transformAction}
            disabled={!file || generating || (mode==='oneclick' && !presetId && !manualOut)}
            className="mt-3 px-4 py-2 rounded-xl bg-neonPurple text-white disabled:opacity-50 disabled:cursor-not-allowed"
          > 
            {generating ? 'Transforming…' : 'Transform!'}
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <MaskTool imageFile={file} onMaskFileAction={setMaskFile}/>
      </section>

      <section className="space-y-3">
        <div className="text-sm opacity-80">Results:</div>
        <Gallery images={images} picked={picked} onPickAction={setPicked}/>
        <ExportBar canExport={picked != null} onExportAction={exportPickedAction}/>
      </section>
    </main>
  );
}