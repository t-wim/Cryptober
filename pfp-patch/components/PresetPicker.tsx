'use client';
import { cn } from '@/lib/utils';
import { ONECLICK_PRESETS } from '@/lib/promptBuilder';

type Props = {
  selectedId?: string;
  onSelectAction: (presetId: string) => void;
  onRandomAction?: () => void;
};

export default function PresetPicker({ selectedId, onSelectAction, onRandomAction }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {ONECLICK_PRESETS.map(p => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelectAction(p.id)}
          title={p.tooltip}
          className={cn(
            'card text-left transition border-white/15 hover:border-pumpkin hover:shadow-glow',
            selectedId === p.id && 'ring-2 ring-pumpkin shadow-glow'
          )}
        >
          <div className="text-base font-semibold">{p.label}</div>
          <div className="text-xs opacity-70 mt-1">{p.tooltip}</div>
        </button>
      ))}

      {/* Random */}
      <button
        type="button"
        onClick={onRandomAction}
        className="card border-dashed border-white/20 hover:border-pumpkin hover:shadow-glow"
        title="Randomized prompt based on the crypto/meme/Halloween matrix"
      >
        <div className="text-base font-semibold">Random 🎲</div>
        <div className="text-xs opacity-70 mt-1">Matrix remix</div>
      </button>
    </div>
  );
}