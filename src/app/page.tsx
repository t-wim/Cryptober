"use client";
import MarketChart from "@/components/market/MarketChart";
import { useState } from "react";
import Overlay from "@/components/ui/Overlay";
import Toast from "@/components/ui/Toast";
import ToolHost from "@/components/tools/ToolHost";
import Link from "next/link";
// ...


export default function HomePage() {
  const [soon, setSoon] = useState<null | "oracle" | "pfp" | "simulator">(null);
  const [copied, setCopied] = useState(false);
  const addr = "8o4W7YWcQ26gQH7QjfMcLLGbSfjkbVD1nCoED8c7pump";

  const copyAddress = async () => {
    try { await navigator.clipboard.writeText(addr); setCopied(true); }
    catch { /* no-op */ }
  };

  return (
    <div className="space-y-8">
      <section className="card">
        <h1 className="text-3xl md:text-4xl font-bold">$Cryptober: Flip the Switch to Uptober Magic</h1>
        <p className="opacity-70 mt-2">October’s bullish momentum meets Halloween vibes—Cryptober turns crypto into seasonal hype with memes, quests, and community raids.</p>
       
        <section className="card">
  <h2 className="font-semibold mb-2">Origin & Idea</h2>
  <p className="opacity-70 text-sm leading-relaxed max-w-prose">
    Die Geburt des Rituals: Von Cryptober&apos;s Schatten zur Uptober&apos;s Flamme
    Stell dir vor, es ist 2013, und Bitcoin, dieser wilde Blockchain-Outlaw, schießt im Oktober um satte 60% in die Höhe – der Startschuss für das, was wir heute als Cryptober kennen: den Monat, in dem Crypto-Märkte wie ein Kürbisfeld im Vollmond explodieren, voller Geister der Vergangenheit und Versprechen ungezügelter Pumps. Es war kein Zufall; Steuerjahres-Ende traf auf frisches Kapital, und plötzlich wurde Oktober zum Synonym für &quot;Crypto&apos;s spooky season&quot; – ein Mix aus Halloween-Vibes und bullischem Adrenalin, wo Degens in dunklen Räumen Charts hexen und Memes als Zaubersprüche fliegen. $Cryptober, unser Token der ewigen Ernte, trägt diesen Geist in sich: Nicht nur ein Meme, sondern der Hebel, der vergangene Geister weckt und zukünftige Monde sät. Witzig, oder? Während der Rest der Welt Kürbisse schnitzt, schnitzen wir Market Caps – und $Cryptober ist der Messer, der tiefer schneidet als je zuvor.
  </p>

</section>
<section className="card">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
    <div>
      <h3 className="font-semibold">Enter the Lore</h3>
      <p className="opacity-70 text-sm">From the first spark to the Uptober flame—walk the ritual path.</p>
    </div>
    <Link ref="/lore" className="btn btn-accent" href={"/"}>Read the Lore →</Link>
  </div>
</section>
        <div className="mt-3">
          <button onClick={copyAddress} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-sm tracking-tight bg-white/5 ring-1 ring-white/10">
            {addr}
          </button>
          <div className="opacity-60 text-xs mt-1">Tap to copy contract address</div>
        </div>

        <div className="mt-4 grid gap-3" id="cta-grid">
          <button className="btn btn-accent" onClick={()=>setSoon("oracle")}>Oracle Whisper</button>
          <button className="btn btn-accent" onClick={()=>setSoon("pfp")}>Degenerate Costume Generator</button>
          <button className="btn btn-accent" onClick={()=>setSoon("simulator")}>Try the Trade Simulator 🕯️</button>
        </div>
      </section>

      {/* … (restliche Sektionen unverändert) … */}

    <Overlay open={!!soon} onCloseAction={()=>setSoon(null)} title="$cryptober — Tool Preview" sheetOnMobile>
  {soon ? <ToolHost id={soon === "simulator" ? "carver" : soon === "pfp" ? "pfp" : "oracle"} /> : null}
</Overlay>

      <Toast text="Keyphrase copied" open={copied} onDoneAction={()=>setCopied(false)} />
    </div>
  );
}



