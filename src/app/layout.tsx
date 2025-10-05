import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { fontHero, fontUI, fontMono } from "./fonts";
import SkipLink from "@/components/ui/SkipLink";

export const metadata: Metadata = {
  title: "Cryptober — Uptober Hype & Crypto Halloween",
  description: "Pumpkins, memes & MCAP milestones → ride the rally.",
  openGraph: { title: "Cryptober: Flip to Uptober Magic", description: "Join the raid—signals, PFPs, simulators.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontHero.variable} ${fontUI.variable} ${fontMono.variable} dark`}>
      <body className="font-ui bg-grain">
         <SkipLink />
        <header className="border-b border-white/10 bg-[color:var(--color-ink)]/80 backdrop-blur" role="banner">
          <nav className="container flex h-14 items-center justify-between" aria-label="Primary">
            <Link href="/" className="font-semibold">$cryptober</Link>
           <div className="flex items-center gap-4 text-sm" role="navigation" aria-label="Primary">
             <Link ref="/milestones" href={"/"}>Milestones</Link>
             <Link href="/tools/oracle">Oracle</Link>
             <Link href="/tools/pumpkin-patch">Pumpkin Patch</Link>
             <Link href="/tools/candle-carver">Candle Carver</Link>
             <Link ref="/lore" href={"/"}>Lore</Link>
          </div>
          </nav>
        </header>
        <main id="content" role="main" className="container py-8" aria-live="polite">{children}</main>
        <footer className="mt-16 border-t border-white/10 py-8 text-sm" role="contentinfo">
          <div className="container flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span className="opacity-80">Light the Candle. Ride the Uptober.</span>
            <div className="opacity-80">CA: <code className="font-mono">8o4W7YWcQ26gQH7QjfMcLLGbSfjkbVD1nCoED8c7pump</code></div>
          </div>
        </footer>
      </body>
    </html>
  );
}