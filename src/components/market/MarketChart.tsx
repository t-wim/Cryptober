"use client";

type Props = { className?: string };

function sanitize(url: string | undefined | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    // Nur https erlauben
    if (u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
}

export default function MarketChart({ className }: Props) {
  const raw = process.env.NEXT_PUBLIC_DEXSCREENER_URL;
  const src = sanitize(raw);

  if (!src) {
    return (
      <div className={["aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-sm opacity-80", className].filter(Boolean).join(" ")}>
        Live chart placeholder  set NEXT_PUBLIC_DEXSCREENER_URL
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <iframe
          title="Live Market Chart"
          src={src}
          className="h-full w-full"
          // Sandbox hart einschränken (Dexscreener-Embed funktioniert mit allow-scripts/allow-same-origin)
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
      <a
        href={src}
        target="_blank"
        rel="noopener"
        className="mt-2 inline-block text-sm text-white/70 hover:text-white"
      >
        Open on Dexscreener ↗
      </a>
    </div>
  );
}
