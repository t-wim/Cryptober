'use client';
type Props = { images: string[]; onPickAction: (idx: number) => void; picked?: number | null; };
// … onClick={() => onPickAction(i)} …


export default function Gallery({ images, picked, onPickAction }: Props) {
  if (images.length === 0) {
    return <div className="opacity-60 text-sm">Generated images will appear here.</div>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((src, i) => (
        <button key={i} className={`card overflow-hidden border-white/15 ${picked === i ? 'ring-2 ring-neonPurple' : ''}`}
          onClick={() => onPickAction(i)}
        >
          <img src={src} alt={`result-${i}`} className="w-full h-48 object-cover rounded-xl"/>
        </button>
      ))}
    </div>
  );
}
