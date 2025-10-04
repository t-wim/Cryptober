// src/app/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '../lib/config/site';

export default function HomePage() {
  const [showSoon, setShowSoon] = useState<null | 'oracle' | 'pfp' | 'simulator'>(null);
  const [copied, setCopied] = useState(false);
  const [fade, setFade] = useState<'in' | 'out'>('in');

  const addr = site.contract || '8o4W7YWcQ26gQH7QjfMcLLGbSfjkbVD1nCoED8c7pump';

  function openSoon(which: 'oracle' | 'pfp' | 'simulator') {
    setFade('in');
    setShowSoon(which);
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(addr);
      setFade('in');
      setCopied(true);
      setTimeout(() => setFade('out'), 750);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      // no-op
    }
  }

  function closeSoon() {
    setFade('out');
    setTimeout(() => setShowSoon(null), 250);
  }

  return (
    <div className="space-y-8">
      <section className="card">
        <h1 className="text-3xl md:text-4xl font-bold">
          $Cryptober: Flip the Switch to Uptober Magic
        </h1>
        <p className="muted mt-2">
          October’s bullish momentum meets Halloween vibes—Cryptober turns crypto into seasonal hype
          with memes, quests, and community raids.
        </p>

        <div className="mt-3">
          <button
            onClick={copyAddress}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-sm tracking-tight bg-white/5 hover:bg-white/10 ring-1 ring-white/10"
            aria-label="Copy contract address"
          >
            {addr}
          </button>
        </div>

        <div className="mt-4 grid gap-3" id="cta-grid">
          <button
            className="btn-accent"
            data-event="_click_cta_oracle_"
            onClick={() => openSoon('oracle')}
          >
            Oracle Whisper
          </button>
          <button
            className="btn-accent"
            data-event="_click_cta_pfp_"
            onClick={() => openSoon('pfp')}
          >
            Degenerate Costume Generator
          </button>
          <button
            className="btn-accent"
            data-event="_click_cta_raid_"
            onClick={() => openSoon('simulator')}
          >
            Try the Trade Simulator 🕯️
          </button>
        </div>
      </section>

      <section className="card">
        <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
          <span className="rounded-xl px-3 py-1 bg-white/5 ring-1 ring-white/10">Since 2017</span>
          <span className="rounded-xl px-3 py-1 bg-white/5 ring-1 ring-white/10">
            Pumpkins + Green Candles
          </span>
          <span className="rounded-xl px-3 py-1 bg-white/5 ring-1 ring-white/10">
            Community-Powered
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="muted">MCAP · Holders · 24h Vol</div>
          <button className="btn-accent" data-event="_refresh_stats_">
            Refresh
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <iframe title="Dexscreener Live Chart" src="about:blank" className="h-full w-full" />
          </div>
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="mt-2 inline-block text-sm text-white/70 hover:text-white"
          >
            Open on Dexscreener
          </a>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">Market Metrics</h2>
          <ul className="text-sm space-y-1">
            <li>MCAP: —</li>
            <li>Holders: —</li>
            <li>24h Vol: —</li>
            <li>7d Vol: —</li>
            <li>Price: —</li>
          </ul>
          <button className="btn-accent mt-3" data-event="_refresh_stats_">
            Refresh
          </button>
        </div>
      </section>

      <section className="card">
        <h2 className="font-semibold mb-2">Origin & Idea</h2>
        <p className="muted text-sm">
          Cryptober sparked in 2017 when the Bad Crypto Podcast shouted “Bad Cryptober has arrived!”
          and paired it with token giveaways—fusing Halloween energy with the October market myth
          a.k.a. Uptober. From there, the meme matured: 2018 community challenges tied to BTC’s 10th
          birthday, 2019 project promos, and 2020 media campaigns (quests, dailies) turned it into a
          month-long rhythm. By 2023, exchanges like Gemini ran “Pick-a-Treat” rewards; in 2025,
          media groups relaunched full-month activities. Today, Cryptober is a seasonal ritual:
          pumpkins, green candles, raids—signal over noise, fun over fear. No promises, no price
          calls—just community momentum and tools to channel it.
        </p>
      </section>

      <section className="card">
        <h2 className="font-semibold mb-3">Milestone Stepper</h2>
        <div className="h-2 w-full rounded-full bg-white/10" />
        <ul className="mt-3 text-sm space-y-1">
          <li>Launch into Uptober</li>
          <li>2017 — Origin spark—podcast meme + giveaways set the tone.</li>
          <li>2018 — Hashtags & Halloween challenges amplify community.</li>
          <li>2019 — Project promos/raffles test exchange-style mechanics.</li>
          <li>2020 — Media quests + on-the-go events formalize the month.</li>
          <li>2021 — Reddit threads stoke meme energy.</li>
          <li>2022 — P2E fests add gaming/narrative loops.</li>
          <li>2023 — Exchange rewards peak late-October hype.</li>
          <li>2024 — Tech/security spin-offs broaden the theme.</li>
          <li>2025 — Full-month relaunch: giveaways, streams, activities.</li>
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="card">
          <h3 className="font-semibold">Oracle — Uptober Signal Filter</h3>
          <p className="muted text-sm mt-1">
            Cut noise, catch October momentum. Tracks seasonality cues + community heat. Crowd-voted
            hype alerts for fast degen reads.
          </p>
          <ul className="text-sm mt-2 list-disc pl-5">
            <li>Tracks seasonality cues + community heat.</li>
            <li>Crowd-voted hype alerts for fast degen reads.</li>
          </ul>
          <button
            className="btn-accent mt-3"
            onClick={() => openSoon('oracle')}
            data-event="_click_cta_oracle_"
          >
            Open Oracle
          </button>
        </article>

        <article className="card">
          <h3 className="font-semibold">Pumpkin Patch — PFP Creator</h3>
          <p className="muted text-sm mt-1">
            Carve a spooky, share-ready identity. One-click overlays (pumpkins, candles, scribbles).
            Auto-sized exports for raids & profiles.
          </p>
          <ul className="text-sm mt-2 list-disc pl-5">
            <li>One-click overlays (pumpkins, candles, scribbles).</li>
            <li>Auto-sized exports for raids & profiles.</li>
          </ul>
          <button
            className="btn-accent mt-3"
            onClick={() => openSoon('pfp')}
            data-event="_click_cta_pfp_"
          >
            Open Pumpkin Patch
          </button>
        </article>

        <article className="card">
          <h3 className="font-semibold">Candle Carver — MCAP Simulator</h3>
          <p className="muted text-sm mt-1">
            Practice the flow before the glow. Visual “green-candle” scenarios, adjustable
            guardrails. Meme-export for instant thread flex.
          </p>
          <ul className="text-sm mt-2 list-disc pl-5">
            <li>Visual scenarios with adjustable guardrails.</li>
            <li>Meme-export for instant thread flex.</li>
          </ul>
          <button
            className="btn-accent mt-3"
            onClick={() => openSoon('simulator')}
            data-event="_click_cta_raid_"
          >
            Open Candle Carver
          </button>
        </article>
      </section>

      {(showSoon || copied) && (
        <div
          className={`fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            fade === 'in' ? 'opacity-100' : 'opacity-0'
          }`}
          aria-modal="true"
          role="dialog"
        >
          <div className="rounded-2xl border border-accent/40 bg-accent/10 px-6 py-4 text-accent shadow-[0_0_60px_rgba(34,197,94,.35)] animate-pulse">
            <div className="text-center">
              <p className="text-lg font-semibold">
                {copied ? 'Keyphrase copied' : '$cryptober has just begun — we keep cookin → soon'}
              </p>
              {!copied && (
                <button className="btn-accent mt-3" onClick={closeSoon} aria-label="Close">
                  Got it
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
