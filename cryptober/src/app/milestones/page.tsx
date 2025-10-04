export default function MilestonesPage() {
  return (
    <div className="card">
      <h1 className="text-2xl font-semibold mb-2">MCAP Milestones</h1>
      <p className="muted text-sm">Editable steps coming soon. This is a placeholder.</p>
      <pre className="text-xs mt-3">{JSON.stringify([{ mcap: 50000, note: "Launch into Uptober" }], null, 2)}</pre>
    </div>
  );
}
