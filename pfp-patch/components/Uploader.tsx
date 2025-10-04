'use client';
import { useRef, useState, DragEvent } from 'react';

type Props = { onFileAction: (file: File) => void; };

export default function Uploader({ onFileAction }: Props) {
  // … unverändert …

  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (!/^image\/(png|jpe?g|webp)$/.test(f.type)) {
      alert('Please upload a PNG/JPG/WebP image.');
      return;
    }
    if (f.size > 50 * 1024 * 1024) {
      alert('Max file size is 50MB.');
      return;
    }
    onFileAction(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className={
      `card border-dashed ${dragOver ? 'border-pumpkin shadow-glow' : 'border-white/20'} cursor-pointer`
    }
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      aria-label="Upload avatar image"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
          {preview ? <img src={preview} alt="preview" className="object-cover w-full h-full"/> : <span>Drop / Click</span>}
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold">Upload your PFP</div>
          <div className="text-sm opacity-70">PNG/JPG/WebP • up to 50MB</div>
        </div>
      </div>
    </div>
  );
}
function onFileAction(f: File) {
  throw new Error('Function not implemented.');
}

