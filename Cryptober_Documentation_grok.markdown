# $Cryptober Hub Dokumentation

## 1. Website-Design: Visuelle & Funktionale Erweiterungen

### Überblick
- **Thema:** Variante B (Pumpkin Mechanics) als Haupt-Site. Halloween-getriebene Ästhetik mit Uptober-Bullishness, inspiriert von X-Memecoins wie "Pumpkin House" und AI-Layouts (fractal Pumpkins, ghost trails).<grok:render type="render_inline_citation"><argument name="citation_id">3</argument></grok:render><grok:render type="render_inline_citation"><argument name="citation_id">2</argument></grok:render>
- **Struktur:** Single-Page-Layout mit Hero, Chips, Live-Chart, Origin, Stepper, Tools-Teaser, Footer. Tools in Floating Overlays (Mobile: Full-Sheet, Desktop: Centered Dialog). Sitemap: `/`, `/milestones`, `/tools/[pfp,oracle,carver]`, `404`, `error`.
- **Trends 2025:** Mobile-First (Tap-Targets ≥48px), Darkmode-Neumorphism (subtile Shadows), Micro-Interactions (0.2s Bounce), AI-Intent (Voice-Query), 3D-Interactivity (Parallax ≤6px), Biometric-Toggle (Mock), Reduced-Motion.<grok:render type="render_inline_citation"><argument name="citation_id">16</argument></grok:render><grok:render type="render_inline_citation"><argument name="citation_id">14</argument></grok:render>

### Visuelle Erweiterungen
- **Farben (Tokens):**  
  - `--ink: #0A0A0A` (Void-BG)  
  - `--panel: #111318` (Cards/Overlays)  
  - `--txt: #EAECEF` (Text, Kontrast ≥4.5:1)  
  - `--muted: #8A9099` (Sekundär)  
  - `--pumpkin: #FF4500` (Halloween-Accents)  
  - `--neonGreen: #22C55E` (Uptober-Bullish)  
  - `--phantom: #8B00FF` (Glows, Shadows: `0 0 12px rgba(128,0,255,0.5)`)  
- **Typografie:**  
  - **Bricolage Grotesque** (700 Hero, 600 Buttons): Bold Claims, Max-Ch 70.  
  - **Inter** (400-700 UI): Clean Inputs, Labels.  
  - **IBM Plex Mono** (500 Stats): Charts, Badges. Line-Height: 1.6.  
- **Textures:** Grain-Overlay (`repeating-linear-gradient(45deg, transparent 0 4px, rgba(255,69,0,0.03) 4px 8px)`) für Halloween-Mechanics. Stitching-Lines (SVG: `stroke-dasharray: 2 2`) für Cards.<grok:render type="render_inline_citation"><argument name="citation_id">6</argument></grok:render>
- **Glows/Motion:** Neumorphic Shadows (`inset 0 2px 4px rgba(0,0,0,0.5)`), Phantom-Glow (`0 0 12px rgba(255,69,0,0.5)`). Animations: 0.2-0.3s ease-out (Hover: `scale(1.05)`), Parallax ≤6px (Stepper), Flicker-Text (`@keyframes flicker` für Overlays).<grok:render type="render_inline_citation"><argument name="citation_id">2</argument></grok:render> Reduced-Motion: Static via `@media (prefers-reduced-motion: reduce)`.
- **3D-Interactivity:** Cards mit `perspective: 1000px; transform: rotateY(5deg)` on Hover. Charts mit WebGL-Mock (candle flicker). Parallax: `data-depth="0.2"` für Subtle Scroll.<grok:render type="render_inline_citation"><argument name="citation_id">14</argument></grok:render>

### Funktionale Erweiterungen
- **Overlay-System:** Floating Dialog (`role="dialog" aria-modal="true"`). Mobile: Full-Sheet (bottom-0), Desktop: Centered (max-w-2xl). Fokus-Trap (useEffect), ESC-Close, `aria-live="polite"` für Updates. Tools lazy-loaded via `dynamic`.<grok:render type="render_inline_citation"><argument name="citation_id">16</argument></grok:render>
- **Gamification:** Cross-Tool Badges (LocalStorage, NFT-Roadmap): "CT Mystic" (10 Uses), "Signal Sorcerer" (5 Oracle-Copies), "Carve Legend" (10 Sims). Toast: Top-Right, 3s Auto-Hide, Confetti (`@keyframes scale`).<grok:render type="render_inline_citation"><argument name="citation_id">1</argument></grok:render>
- **AI-Intent:** Voice-Input Mock (Placeholder: "Finde Uptober Signals"). Auto-Suggest aus X-Trends (z. B. "Pumpkin House", "HALLOWIN").<grok:render type="render_inline_citation"><argument name="citation_id">3</argument></grok:render><grok:render type="render_inline_citation"><argument name="citation_id">0</argument></grok:render>
- **Virality Hooks:** Meme-Shares (Clipboard: "🚀 Bullish Signal! #Cryptober"), GIF-Export (Carver), Community-Vote-Board (Mock). Share-Rate Ziel: >20%.
- **Telemetry:** Events (`_pfp_generate`, `_oracle_copy`, `_carver_simulate`) via `/api/events` (In-Memory, KV-Roadmap). KPIs: Time-to-Output <3s, Copy-Rate >40%, Error-Quote <3%.
- **Security:** CSP (`default-src 'self'`), X-Frame-Options: DENY, Rate-Limit (100/15min per IP), Sanitized Inputs (DOMPurify Mock). A11y: Focus-Rings (`ring-pumpkin`), Skip-Link, ARIA-Labels.

### Architektur
- **Tech-Stack:** Next.js 14 (App Router, SSR), React 18, TypeScript, Tailwind v4, PostCSS, pnpm, ESLint 8, Vercel (Node 22).
- **Routing:** `/` (Home), `/milestones` (Stepper), `/tools/[tool]` (Overlay), `error.tsx`, `not-found.tsx`.
- **APIs:** `/api/oracle` (Mock Signals), `/api/events` (Telemetry). Cache: Vercel Edge. Rate-Limit: In-Memory `Map`.
- **Assets:** `public/tools/pumpkin-patch/overlays` (SVGs: pumpkin, ghost, zombie).<grok:render type="render_inline_citation"><argument name="citation_id">6</argument></grok:render><grok:render type="render_inline_citation"><argument name="citation_id">7</argument></grok:render>

## 2. Moodboard: Stilreferenz

### Farben
| Name | Hex | Verwendung | Kontrast |
|------|-----|------------|----------|
| Ink | #0A0A0A | Background (Void) | ≥4.5:1 vs txt |
| Panel | #111318 | Cards, Overlays | Subtile Tiefe |
| Text | #EAECEF | Primary Text | ≥4.5:1 vs ink |
| Muted | #8A9099 | Sekundär, Subtext | ≥3:1 vs panel |
| Pumpkin | #FF4500 | Halloween-Accents, CTAs | Glows, Focus |
| NeonGreen | #22C55E | Uptober-Bullish, Charts | Success States |
| Phantom | #8B00FF | Glows, 3D-Shadows | Mystic Effects |

### Typografie
- **Bricolage Grotesque (Google Fonts):**  
  - Weights: 600 (Buttons), 700 (Hero).  
  - Use: Bold Claims, Taglines ("Flip the Switch").  
  - Size: 4xl (36px) Hero Mobile, 6xl (64px) Desktop. Line-Height: 1.2.  
- **Inter:**  
  - Weights: 400 (Body), 600 (Labels), 700 (Headings).  
  - Use: Inputs, Descriptions, Clean UI.  
  - Size: 16px (Body), 18px (Subheadings). Line-Height: 1.6.  
- **IBM Plex Mono:**  
  - Weight: 500.  
  - Use: Stats, Badges, Charts.  
  - Size: 12px (Badges), 14px (Charts). Line-Height: 1.4.

### Bildsprache
- **Inspiration:** Fractal Pumpkins (AI-generated, X-Trends), Wojak/Pepe Memes, Ghost Trails, Stitched Textures.<grok:render type="render_inline_citation"><argument name="citation_id">3</argument></grok:render><grok:render type="render_inline_citation"><argument name="citation_id">6</argument></grok:render>
- **Assets:** SVG Overlays (`public/tools/pumpkin-patch/overlays`): Pumpkin, Ghost, Wojak Witch, Pepe Lantern, HALLOWIN Zombie. 400x400px, Scalable.<grok:render type="render_inline_citation"><argument name="citation_id">0</argument></grok:render>
- **Textures:** Grain (CSS Gradient), Stitching (SVG `stroke-dasharray: 2 2`). Wet Cobblestone für Charts.<grok:render type="render_inline_citation"><argument name="citation_id">8</argument></grok:render>
- **Meme-Layer:** Emojis (🚀 Bullish, 🐸 Neutral, 👻 Spooky) als React-Buttons. Wojak/Pepe Overlays für Virality.

### Motion
- **Micro-Interactions:**  
  - Buttons: `scale(1.05)` Hover, `ring-2 ring-pumpkin` Focus, 0.2s ease-out.  
  - Cards: `rotateY(5deg)` Hover, Parallax `data-depth="0.2"`, 0.3s ease.  
  - Overlays: Fade-In (`opacity: 0 → 1`, 0.3s), Flicker-Text (`@keyframes flicker: opacity 0.6 ↔ 1`).  
- **Loaders:** Glitch-Spinner (Oracle), Melt-Animation (Carver), Pumpkin-Pulse (PFP).  
- **Confetti:** Badge Unlock (`@keyframes scale 0 → 1`, 0.5s).  
- **Fallbacks:** `@media (prefers-reduced-motion: reduce)` → Static, No Transforms.

### Komponenten
- **Button (Primary):** `bg-pumpkin text-ink px-4 py-2 rounded-soft shadow-pumpkin-glow`. States: Hover (`scale-105`), Focus (`ring-2`), Disabled (`opacity-50`).  
- **Card:** `bg-panel p-4 rounded-soft shadow-neumorphic border-muted/50`. Hover: `translate-y-[-2px]` + Stitching SVG.  
- **Input:** `bg-panel border-pumpkin/50 px-3 py-2 rounded-soft`. Focus: `border-pumpkin ring-1`. Slider: Tailwind Range.  
- **Overlay:** `bg-panel max-w-2xl max-h-[90vh] p-6 rounded-soft`. Mobile: Full-Sheet (`bottom-0`).  
- **Toast:** `top-4 right-4 bg-pumpkin text-ink p-4 rounded-soft`. Auto-Hide: 3s.  
- **Badge:** `bg-pumpkin/20 text-pumpkin px-2 py-1 rounded-full text-xs font-mono`.

## 3. Tools: Final mit GPT-Erweiterungen

### 3.1 PFP-Creator (Pumpkin Patch)
- **Zweck:** Generiere degen Halloween-PFPs mit Meme-Overlays.  
- **Inputs:** Manual (Handle → Text-to-Image Mock), Upload (Face Detect Mock), One-Click (5 Presets + Random Matrix).  
- **Outputs:** 400x400 PNG (Gallery, ZIP Export). Share: Meme-Text + Image.  
- **States:** Idle → Masked (Upload) → Generating (Spinner) → Gallery (Swipe) → Exported/Shared → Error (Retry-Meme).  
- **UI/UX:**  
  - Mobile: Stacked (Controls unter Preview). Desktop: Grid (Presets Left, Canvas Right).  
  - Presets: Pumpkin Raid, Ghost Pump, Wojak Witch, Pepe Lantern, HALLOWIN Zombie.<grok:render type="render_inline_citation"><argument name="citation_id">0</argument></grok:render>  
  - Random: Emoji-Seed Matrix (🎃🚀).  
  - Live-Preview: Canvas 400px, Mask-Safety (Center Crop Mock).  
  - Export: Download ZIP (400/1024px). Share: "My $Cryptober PFP! 🎃 #PumpkinPatch".  
- **GPT-Erweiterungen:**  
  - **AI-Meme-Generator:** Wojak/Pepe Overlays (Auto-generated aus Handle, z. B. "Wojak in Pumpkin").<grok:render type="render_inline_citation"><argument name="citation_id">6</argument></grok:render>  
  - **NFT-Badge:** Mintable "PFP Sorcerer" (LocalStorage → Wallet-Connect Roadmap).  
  - **Virality:** Auto-Share mit Emoji-Text ("🚀 My Spooky PFP!").  
  - **Delta-Refine:** Re-generate Button (Randomize Traits).  
- **Telemetry:** `_pfp_input_handle`, `_generate_pfp`, `_share_pfp`. KPIs: Time-to-Gallery <5s, Export-Rate >30%.  
- **Fallbacks:** "No Face? Default Wojak 👻" + Retry.  

### 3.2 Oracle (Signal Brief)
- **Zweck:** Daily Uptober Signals aus X, read-only, Meme-Copy-fähig.<grok:render type="render_inline_citation"><argument name="citation_id">0</argument></grok:render>  
- **Inputs:** Auto-Query ("Uptober Halloween"), Voice-Intent Mock ("Finde spooky Pumps").  
- **Outputs:** Cards (Author, Content, Likes, Sentiment: 🚀 Bullish). Copy: Meme-Text + Link.  
- **States:** Idle (Auto-Trend) → Loading (Glitch) → Brief-Ready (Swipe) → Copied (Confetti) → Error ("Pepe Nap 🐸").  
- **UI/UX:**  
  - Mobile: Swipe-Cards (300x200px). Desktop: Grid (3x2).  
  - Cards: `bg-panel p-4 rounded-soft shadow-pumpkin-glow`. Hover: 3D `rotateY(5deg)`.  
  - Copy-Button: `Copy as Meme` → Clipboard: "Bullish Signal! 🚀 #Cryptober".  
- **GPT-Erweiterungen:**  
  - **AI-Sentiment:** Bullish/Neutral Tags (Mock: Likes-Based). 3D-Bubble-Overlay (Grün/Orange).<grok:render type="render_inline_citation"><argument name="citation_id">3</argument></grok:render>  
  - **Viral Hook:** Auto-Meme-Text (z. B. "This Signal PUMPS! 👻").  
  - **Gamification:** Badge "Signal Sorcerer" (5 Copies).  
  - **A/B Slots:** Test Emoji vs. Plain Copy (Track: `_oracle_copy_post`).  
- **Telemetry:** `_fetch_brief`, `_copy_post`. KPIs: Copy-Rate >40%, Error-Quote <3%.  
- **Fallbacks:** "No Signals? Pepe Nap 🐸" + Retry.  

### 3.3 Candle Carver (MCAP Simulator)
- **Zweck:** Simuliere MCAP mit Monte Carlo (1000 Runs, Volatility 0.5).<grok:render type="render_inline_citation"><argument name="citation_id">17</argument></grok:render>  
- **Inputs:** Presets (Solana Pump, ETH Surge, Meme Moon), Supply (Slider 1e8-1e10), Price (0.0001-1).  
- **Outputs:** Chart (Mean/Min/Max MCAP), Heatmap (Green/Red), Meme-Overlay (💎 >50% Growth).  
- **States:** Idle (Presets) → Ready (Inputs) → Simulating (Melt) → Card-Ready (Chart) → Shared (GIF) → Error.  
- **UI/UX:**  
  - Mobile: Stacked Presets + Slider. Desktop: Split (Inputs Left, Chart Right).  
  - Chart: 200px Mobile, 400px Desktop. `bg-panel border-pumpkin/50 rounded-soft`.  
  - Export: GIF-Permalink ("Projected: $15M 🚀 #Carver").  
- **GPT-Erweiterungen:**  
  - **Risk-Heatmap:** Red/Green Overlay (High/Low Volatility), Ghost-Trail Animation.<grok:render type="render_inline_citation"><argument name="citation_id">8</argument></grok:render>  
  - **Community-Board:** Vote Sims with Memes (Mock: Upvote 👻).  
  - **Confetti:** >50% Growth → Particle Effect.  
  - **NFT-Badge:** "Carve Legend" (10 Sims).  
- **Telemetry:** `_set_params`, `_simulate`, `_share_card`. KPIs: View-Rate >50%, Time-to-Output <3s.  
- **Fallbacks:** "Simulation Burned? Retry with Pepe 🔥".  

## 4. Implementierung (Vollständig)

### Projektstruktur
```
cryptober-hub/
├── src/
│   ├── app/
│   │   ├── (main)/
│   │   │   ├── page.tsx          # Home
│   │   │   ├── milestones/page.tsx # Stepper
│   │   │   ├── tools/[tool]/page.tsx # Dynamic Tool Route
│   │   ├── api/
│   │   │   ├── events/route.ts   # Telemetry
│   │   │   └── oracle/route.ts   # Signals Mock
│   │   ├── globals.css           # Tailwind + Grain
│   │   ├── layout.tsx            # Root
│   │   ├── loading.tsx           # Skeleton
│   │   ├── error.tsx             # Error
│   │   └── not-found.tsx         # 404
│   ├── components/
│   │   ├── ui/                   # Button.tsx, Card.tsx, Overlay.tsx
│   │   ├── tools/                # PfpCanvas.tsx, OracleCards.tsx, CarverChart.tsx
│   │   ├── shared/               # Header.tsx, Footer.tsx
│   │   └── AchievementBadge.tsx  # Badges
│   ├── lib/
│   │   ├── utils.ts             # cn()
│   │   └── telemetry.ts         # EventWire
├── public/
│   ├── tools/pumpkin-patch/overlays/ # SVGs
│   └── og-hero.png
├── tailwind.config.js
├── next.config.mjs
├── middleware.ts
├── package.json
└── README.md
```

### Beispiel-Code: Tailwind Config
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#0A0A0A', panel: '#111318', txt: '#EAECEF', muted: '#8A9099', pumpkin: '#FF4500', neonGreen: '#22C55E', phantom: '#8B00FF' },
      boxShadow: { 'pumpkin-glow': '0 0 12px rgba(255,69,0,0.5)', 'neumorphic': 'inset 0 2px 4px rgba(0,0,0,0.5)' },
      animation: { 'bounce-subtle': 'scale 0.2s ease-out', 'grain-fade': 'fadeIn 0.3s ease-out' },
      borderRadius: { 'soft': '8px' },
      spacing: { 'rhythm': '40px' }, // Desktop: 56px
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

### Deploy: Vercel
- **Setup:** `pnpm install`, `vercel --prod` (Node 22).  
- **ENV:** `PUBLIC_API_URL` (X API), `PRIVATE_DB_URL` (KV Roadmap).  
- **CI/CD:** GitHub → Vercel (Preview/Prod). Build: `next build`.  

## 5. Abnahme-Kriterien
- **UI/UX:** 2-Klick-Output, Overlay Trap/ESC, A11y (Lighthouse 100%), Reduced-Motion.  
- **Funktion:** PFP (All Modi, Export), Oracle (Copy-Meme), Carver (GIF-Permalink).  
- **Technik:** Lint/Build Green, CSP/Rate-Limit Active, Telemetry Logs.  
- **Doku:** README, How-To, Sitemap, Moodboard Complete.  

**Handover:** Deploy-Ready, 1:1 übernehmbar. Fork, Deploy, Pump! 🎃🚀