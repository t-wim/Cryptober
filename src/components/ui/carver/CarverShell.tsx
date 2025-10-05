"use client";

export default function CarverShell() {
  return (
    <div className="grid gap-3">
      <h3 className="text-lg font-semibold">Candle Carver — MCAP Simulator</h3>
      <p className="opacity-70 text-sm">Inputs, simulate, share card (soon).</p>
      <div className="grid sm:grid-cols-[240px_1fr] gap-3">
        <div className="card h-40" />
        <div className="card h-40" />
      </div>
    </div>
  );
}
