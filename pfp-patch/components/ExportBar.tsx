'use client';
type Props = { canExport: boolean; onExportAction: () => void; };
// … onClick={onExportAction} …

export default function ExportBar({ canExport, onExportAction }: Props) {
  return (
    <div className="flex items-center gap-2 justify-end">
      <button
        disabled={!canExport}
        onClick={onExportAction}
        className="px-4 py-2 rounded-xl bg-pumpkin text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Export PNG
      </button>
    </div>
  );
}
