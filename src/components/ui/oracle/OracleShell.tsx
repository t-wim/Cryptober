"use client";

export default function OracleShell() {
  return (
    <div className="grid gap-3">
      <h3 className="text-lg font-semibold">Oracle — Uptober Signal Brief</h3>
      <p className="opacity-70 text-sm">Swipe cards, copy meme text (soon).</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card h-28" />
        ))}
      </div>
    </div>
  );
}