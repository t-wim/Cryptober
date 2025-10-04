import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/config/site";
import EventWire from "../components/event-wire";
import SkipLink from "../components/skip-link";

export const metadata: Metadata = {
  metadataBase: site.url,
  title: {
    default: `${site.name} — Uptober 2025`,
    template: `%s | ${site.name}`
  },
  description: "Pumpkins, memes & MCAP milestones → ride the rally as BTC holds at 115K.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} — Uptober 2025`,
    description: "Pumpkins, memes & MCAP milestones → ride the rally as BTC holds at 115K.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"]
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <SkipLink />
        <header className="border-b border-white/10" role="banner">
          <nav className="container flex h-14 items-center justify-between" aria-label="Primary">
            <Link href="/" className="font-semibold" aria-label={`${site.name} home`}>{site.name}</Link>
            <div className="flex items-center gap-4 text-sm" role="navigation">
              <Link href="/milestones">Milestones</Link>
              <Link href="/tools/oracle">Oracle</Link>
              <Link href="/tools/pumpkin-patch">Pumpkin Patch</Link>
              <Link href="/tools/candle-carver">Candle Carver</Link>
            </div>
          </nav>
        </header>
        <main id="content" className="container py-8" role="main" aria-live="polite">{children}</main>
        <footer className="mt-16 border-t border-white/10 py-8 text-sm" role="contentinfo">
          <div className="container flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span className="muted">Uptober is short. {site.name} is forever.</span>
            <div className="muted">CA: <code>{site.contract || "N/A"}</code></div>
          </div>
        </footer>
        <div id="a11y-status" className="sr-only" aria-live="polite" />
        <EventWire />
      </body>
    </html>
  );
}
