"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <div className="card text-center">
      <h1 className="text-xl font-semibold mb-1">Something spooky happened</h1>
      <p className="opacity-70 mb-3">An unexpected error occurred.</p>
      <button className="btn btn-accent" onClick={() => reset()}>Try again</button>
    </div>
  );
}
