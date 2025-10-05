# CODEX INSTRUKTIONEN — Landing Page + Lore Page (+ Meme Gallery)

> Ziel: Eine Next.js‑App (App Router) mit Tailwind v4 erstellen, die **Landing Page** (`/`) und **Lore Page** (`/lore`) umfasst. In `/lore` ist eine **Meme‑Gallery** als einfaches Grid integriert. Bereitstellung über **Vercel** inkl. minimaler CI, Smoke‑Checks & Go‑Live.

---

## 1) Mission & Output
- **Mission:** Prod‑ready Skeleton + 2 Seiten + Gallery, vercel‑deploybar.
- **Output:** Code (Next.js + TS + Tailwind v4), CI‑Workflow, `.env.example`, kurze Runbooks.

---

## 2) Rollen ➜ Instruktionen (für Codex)

### Rolle: **Researcher**
**Instruktion:** Verifiziere Framework‑/Lib‑Versionen & Breaking Changes (Next.js ≥15 App Router, React 19.x, Tailwind v4). Notiere besondere Syntax (z. B. `@import "tailwindcss";` & `@theme`).

### Rolle: **Coding Assistant**
**Instruktion:** Erzeuge das folgende Projekt‑Skeleton (Dateien & Inhalte siehe unten) und beachte die Annahmen/Constraints.

### Rolle: **QA & Compliance**
**Instruktion:** Führe die Smoke‑Checks, A11y‑Minimum und CWV‑Budget‑Spot‑Check aus (lokal und auf der Vercel‑Preview‑URL). Dokumentiere Abnahme.

### Rolle: **Release Manager (Vercel)**
**Instruktion:** Richte Vercel‑Projekt ein (Preview per PR), setze Env‑Variablen, führe den Promote‑Flow durch (Preview ➜ Production) und dokumentiere Deployment‑ID/URL.

---

## 3) Annahmen & Constraints
- **Stack:** Next.js (App Router, TypeScript), **React 19.x**, **Tailwind v4** (CSS‑first config), pnpm.
- **Designziele:** Schlanke, schnelle Landing‑Section (Hero + CTA), Lore mit Text + Gallery Grid; mobil‑first.
- **A11y:** Fokusreihenfolge, sinnvolle `alt`‑Texte, Kontrast ≥ 4.5:1.
- **Perf:** LCP < 2.5s (mobil), CLS < 0.1; keine unnötigen Blocker.

---

## 4) Projekt‑Skeleton (Dateien & Inhalte)
> **Hinweis:** Pfade relativ zum Repo‑Root. Ersetze `my‑app` bei Bedarf. Nutze `pnpm`.

### 4.1 Commands (Einrichtung)
```bash
pnpm dlx create-next-app@latest my-app --ts --eslint --app --src-dir --use-pnpm
cd my-app
pnpm add tailwindcss postcss autoprefixer
# Tailwind v4 (CSS-first): keine tailwind.config.js nötig
```

### 4.2 `package.json` (Scripts – ergänzen/prüfen)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "preview": "next build && next start",
    "e2e": "playwright test || echo 'no e2e'",
    "a11y": "echo 'axe-ci placeholder'",
    "perf": "echo 'lhci placeholder'"
  },
  "engines": { "node": ">=18.17 <23" },
  "packageManager": "pnpm@9"
}
```

### 4.3 `postcss.config.js` (falls benötigt)
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 4.4 `src/app/globals.css` (Tailwind v4, CSS‑first)
```css
/* Tailwind v4 CSS-first configuration */
@import "tailwindcss";

/* Design Tokens via @theme */
@theme {
  --font-sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
  --color-brand: oklch(65% 0.17 270);
  --color-brand-ink: oklch(25% 0.06 270);
  --radius-2xl: 1.25rem;
}

/* Base layer overrides */
:root { color-scheme: light; }
html, body { height: 100%; }
body { font-family: var(--font-sans); }

/* Utilities (optional) */
.container { max-width: 1200px; margin-inline: auto; padding-inline: 1rem; }
```

### 4.5 `next.config.ts`
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
}

export default nextConfig
```

### 4.6 `src/app/layout.tsx`
```tsx
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project — Landing & Lore',
  description: 'A fast Next.js app with Tailwind v4 and a meme gallery.',
  openGraph: {
    title: 'Project — Landing & Lore',
    description: 'Meme-powered lore \u0026 a slick landing page',
    type: 'website'
  }
}

export const viewport: Viewport = { themeColor: '#4f46e5' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-900 antialiased">
        <div className="min-h-dvh flex flex-col">
          <header className="border-b border-zinc-200">
            <nav className="container flex h-14 items-center justify-between">
              <a href="/" className="font-semibold tracking-tight">Brand</a>
              <div className="flex gap-6 text-sm">
                <a href="/lore" className="hover:underline">Lore</a>
                <a href="#cta" className="rounded-full px-3 py-1 bg-[--color-brand] text-white">Get started</a>
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-200 py-8 text-sm">
            <div className="container text-zinc-600">© {new Date().getFullYear()} Brand</div>
          </footer>
        </div>
      </body>
    </html>
  )
}
```

### 4.7 `src/app/page.tsx` (Landing)
```tsx
export default function Page() {
  return (
    <section className="container py-20 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Ship faster. Look better. Meme harder.
          </h1>
          <p className="mt-4 text-lg text-zinc-600 max-w-prose">
            A minimal Next.js + Tailwind v4 starter with a lore page and a meme gallery you can grow over time.
          </p>
          <div className="mt-6 flex gap-3" id="cta">
            <a href="/lore" className="rounded-xl px-5 py-3 bg-[--color-brand] text-white font-medium">Explore Lore</a>
            <a href="#" className="rounded-xl px-5 py-3 border border-zinc-300">Docs</a>
          </div>
        </div>
        <div className="relative isolate">
          <div className="aspect-[4/3] rounded-[--radius-2xl] bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/15 ring-1 ring-inset ring-black/5" />
        </div>
      </div>
    </section>
  )
}
```

### 4.8 `src/components/MemeCard.tsx`
```tsx
import Image from 'next/image'

type Meme = { src: string; alt: string; width?: number; height?: number }

export function MemeCard({ src, alt, width = 600, height = 600 }: Meme) {
  return (
    <figure className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full object-cover" />
      <figcaption className="p-2 text-xs text-zinc-600">{alt}</figcaption>
    </figure>
  )
}
```

### 4.9 `src/app/lore/page.tsx` (Lore + Meme‑Gallery Grid)
```tsx
import { MemeCard } from '@/components/MemeCard'

const MEMES = [
  { src: 'https://placehold.co/800x800/png?text=Meme+1', alt: 'First meme placeholder' },
  { src: 'https://placehold.co/800x800/png?text=Meme+2', alt: 'Second meme placeholder' },
  { src: 'https://placehold.co/800x800/png?text=Meme+3', alt: 'Third meme placeholder' },
  { src: 'https://placehold.co/800x800/png?text=Meme+4', alt: 'Fourth meme placeholder' },
  { src: 'https://placehold.co/800x800/png?text=Meme+5', alt: 'Fifth meme placeholder' }
]

export default function LorePage() {
  return (
    <div className="container py-12 md:py-16">
      <article className="prose prose-zinc">
        <h1>The Lore</h1>
        <p>
          This is where the origin story lives. Keep it short at first; expand later and link tools when they are ready.
        </p>
      </article>

      <section className="mt-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold">Meme Gallery</h2>
          <span className="text-sm text-zinc-500">v0 — simple grid</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MEMES.map((meme, i) => (
            <MemeCard key={i} {...meme} />
          ))}
        </div>
      </section>
    </div>
  )
}
```

### 4.10 `src/app/(legal)/imprint/page.tsx` (Stub, optional)
```tsx
export default function Imprint() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-semibold">Imprint</h1>
      <p className="mt-4 text-zinc-600">Add your legal notice here.</p>
    </div>
  )
}
```

### 4.11 `.env.example`
```dotenv
# Example envs (duplicate & set in Vercel per env)
NEXT_PUBLIC_SITE_NAME=Project
SENTRY_DSN=
```

---

## 5) CI (minimal, optional)
`.github/workflows/ci.yml`
```yaml
name: CI
on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'pnpm' }
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm run typecheck
      - run: pnpm run lint
      - run: pnpm run build
```

---

## 6) Vercel — Deploy & Promote (Kurz)
1) Repo auf GitHub, Vercel Projekt verbinden (Production‑Branch `main`).
2) Env‑Variablen in **Preview** und **Production** getrennt setzen.
3) PR öffnen → Preview entsteht automatisch.
4) Smoke‑Checks ausführen (siehe unten).
5) **Promote**: Preview ➜ Production (Dashboard oder CLI `vercel promote <id> --yes`).

---

## 7) Abnahmecheck (DoD)
- [ ] Landing & Lore erreichbar (`/`, `/lore`) ohne 404/500.
- [ ] Meme‑Grid rendert 6–12 Karten, Bilder mit `alt`.
- [ ] LCP < 2.5s (mobil, Throttling), keine großen CLS‑Sprünge.
- [ ] A11y‑Smoke: Tab‑Flow sinnvoll, Links beschriftet, Kontrast okay.
- [ ] Preview‑URL grün; Promote auf Production dokumentiert.

---

## 8) Nächste Iterationen (Backlog)
- Upload‑Pipeline für Memes (drag‑and‑drop), Kategorien/Tags, Lightbox.
- Tool‑Integrationen auf Lore verlinken (sobald fertig).
- Observability: Sentry, Web Vitals Reporting, 404 Tracking.
- SEO: Sitemap, robots, Canonicals, OG‑Images pro Seite.

---

## 9) Codex Prompt (direkt verwendbar)
```markdown
/** Implement FEATURE: Landing + Lore (+ Meme Gallery) **/
KONTEXT:
- Target: src/app
- Dependencies: next/image, Tailwind v4 (CSS-first), TypeScript
- Build/Test: next@latest (app router), ts strict, pnpm
AUFGABE:
- Erzeuge Dateien gemäß Abschnitt 4 (inkl. CSS-first Tailwind, Layout, Landing, Lore, MemeCard, next.config.ts)
- Fülle Meme‑Array mit 6–12 Platzhalter‑Bildern (remotePatterns konfiguriert)
- Stelle sicher: A11y‑Basics, schnelle LCP, responsive Grid
AKZEPTANZ:
- `pnpm run build` grün, `/` und `/lore` rendern lokal und im Preview
- Keine ESLint/TS Errors, minimale Lighthouse‑Warnungen
OUTPUT: code
```

