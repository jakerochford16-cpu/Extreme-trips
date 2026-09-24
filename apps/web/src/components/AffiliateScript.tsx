import Script from "next/script";

// Auto-affiliate networks (Skimlinks, VigLink/Sovrn Commerce, etc.) work by
// rewriting eligible outbound links in the browser via a single site-wide
// script — no per-link setup needed, which fits this site well since guide
// links point to a search, not one fixed merchant. Off by default; set
// NEXT_PUBLIC_AFFILIATE_SCRIPT_SRC once you have a publisher script URL
// from one of these services and it turns on with no other code changes.
export function AffiliateScript() {
  const src = process.env.NEXT_PUBLIC_AFFILIATE_SCRIPT_SRC;
  if (!src) return null;
  return <Script src={src} strategy="afterInteractive" />;
}
