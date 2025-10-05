export default function LorePage() {
  return (
    <div className="grid gap-6">
      {/* Altar Top (Intro) */}
      <section className="card pixel-grain">
        <h1 className="font-hero text-2xl md:text-3xl mb-2">Pixel Harvest Altar — The Lore</h1>
        <div className="crt term card">
          <div className="font-mono text-sm">
            <span className="opacity-70">Terminal:</span> Harvest the Flame<span className="blink">▋</span>
          </div>
          <p className="opacity-70 text-sm mt-2">The Awakening (2009–2013)</p>
        </div>
      </section>

      {/* Harvest Rows (Acts I–II) */}
      <section aria-label="Harvest Rows" className="grid gap-4 sm:grid-cols-2">
        {/* Act I */}
        <article className="card hover:glow-pumpkin transition">
          <h2 className="font-semibold">Act I — The Spark (2009)</h2>
          <p className="opacity-70 text-sm mt-1">
            The birth… cypherpunk whispers, pixel embers, a ledger lit at midnight.
          </p>
          <div className="text-xs opacity-60 mt-3 font-mono">ASCII: ~~~~ ~~~ ~</div>
          <div className="mt-3 h-16 grid place-items-center bg-white/5 rounded scanlines">GIF flame (hover)</div>
        </article>

        {/* Act II */}
        <article className="card hover:glow-phantom transition">
          <h2 className="font-semibold">Act II — The Flame (2013)</h2>
          <div className="mt-2 h-28 rounded bg-white/5 grid place-items-center">Chart mock: green candles</div>
          <div className="mt-2 h-10 rounded bg-white/5 grid place-items-center marquee">Meme banner (cyber-cyan glow)</div>
          <p className="opacity-70 text-sm mt-2">Scanlines on hover; VHS vibe.</p>
        </article>

        {/* Act II Extension */}
        <article className="card hover:glow-phantom transition">
          <h3 className="font-semibold">Act II — Visuals</h3>
          <div className="mt-2 h-24 rounded bg-white/5"></div>
          <p className="opacity-70 text-sm mt-2">Expandable tile for auxiliary visuals.</p>
        </article>

        {/* Meme Teaser */}
        <article className="card hover:glow-pumpkin transition">
          <h3 className="font-semibold">Meme Teaser Tile</h3>
          <div className="mt-2 h-24 rounded bg-white/5"></div>
          <p className="opacity-70 text-sm mt-2">Pumpkins that glitch-pop on hover.</p>
        </article>
      </section>

      {/* Echo Grid (Act III) */}
      <section aria-label="Echo Grid" className="card pixel-grain">
        <div className="marquee text-sm">Ritual Echoes 2017–2025 — Ritual Echoes 2017–2025 — Ritual Echoes 2017–2025</div>
        <div className="mt-3 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="card h-24 parallax">
              <div className="text-xs opacity-70">Timeline/Meme #{i + 1}</div>
              <div className="mt-2 h-10 rounded bg-white/5"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Sacred Footer (CTA) */}
      <section className="card text-center">
        <h3 className="font-semibold mb-1">Join the Ritual</h3>
        <p className="opacity-70 text-sm">Harvest your moons—follow the altar lights.</p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <a href="https://x.com/i/communities/1973298666317509005" target="_blank" rel="noopener" className="btn btn-accent">X-Community ↗</a>
          <a href="/" className="btn">Back to Home</a>
        </div>
      </section>
    </div>
  );
}