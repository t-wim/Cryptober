/** @type {import("next").NextConfig} */
const isProd = process.env.VERCEL_ENV === "production";

// Optionaler Embed-Host (z. B. Dexscreener)
const EMBED_URL = process.env.NEXT_PUBLIC_DEXSCREENER_URL || "";
let EMBED_ORIGIN = "";
try { if (EMBED_URL) EMBED_ORIGIN = new URL(EMBED_URL).origin; } catch {}

function buildCSP() {
  const base = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-src 'self'"
  ];

  if (EMBED_ORIGIN) {
    // Nur wenn gesetzt: Embed-Quelle erlauben
    base[base.findIndex(s => s.startsWith("connect-src"))] += ` ${EMBED_ORIGIN}`;
    base[base.findIndex(s => s.startsWith("frame-src"))] += ` ${EMBED_ORIGIN}`;
  }

  return base.join("; ");
}

const nextConfig = {
  experimental: { typedRoutes: true },
  async headers() {
    const headers = [
      { key: "Content-Security-Policy", value: buildCSP() },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
    ];
    if (isProd) {
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload"
      });
    }
    return [{ source: "/:path*", headers }];
  }
};

export default nextConfig;
