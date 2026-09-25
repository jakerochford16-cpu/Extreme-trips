import type { NextConfig } from "next";

// Scoped to what this site actually loads: Clerk (auth UI + its API),
// Skimlinks (the affiliate script from AffiliateScript.tsx), Unsplash (the
// per-activity photo galleries — properly licensed for commercial use,
// hotlinked from their CDN rather than self-hosted so 1,000+ images don't
// bloat the repo/build), and OpenStreetMap tiles (the Leaflet map).
// 'unsafe-inline' stays on script-src because Next.js/Clerk can inject
// small inline bootstrap scripts and this app has no per-request nonce
// plumbing — narrowing further would need that infrastructure. Everything
// else here (frame-ancestors, base-uri, form-action) has no such trade-off
// and is fully locked down.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://s.skimresources.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://img.clerk.com https://images.clerk.dev https://*.skimresources.com http://*.skimresources.com https://images.unsplash.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://*.skimresources.com",
  "frame-src https://*.clerk.accounts.dev https://*.clerk.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
