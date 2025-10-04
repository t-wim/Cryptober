"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="card text-center">
      <Image
        src="/errors/500.svg"
        alt="App error"
        width={400}
        height={300}
        className="mx-auto mb-4 max-w-xs h-auto"
        priority
      />
      <h1 className="text-xl font-semibold mb-1">Something spooky happened</h1>
      <p className="muted mb-4">An unexpected error occurred. Try again or head back home.</p>
      <div className="flex items-center justify-center gap-3">
        <button className="btn-accent" onClick={() => reset()}>Try again</button>
        <Link href="/" className="btn-accent">Back to Home</Link>
      </div>
    </div>
  );
}
