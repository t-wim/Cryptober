"use client";

export default function PfpShell() {
  return (
    <div className="grid gap-3">
      <h3 className="text-lg font-semibold">Pumpkin Patch — PFP Creator</h3>
      <p className="opacity-70 text-sm">Handle input, presets & export (soon).</p>
      <div className="grid sm:grid-cols-[240px_1fr] gap-3">
        <div className="card h-48" />
        <div className="card h-48" />
      </div>
    </div>
  );
}