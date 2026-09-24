"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent, CONSENT_EVENT } from "@/lib/cookieConsent";

// Auto-affiliate networks (Skimlinks, VigLink/Sovrn Commerce, etc.) work by
// rewriting eligible outbound links in the browser via a single site-wide
// script — no per-link setup needed, which fits this site well since guide
// links point to a search, not one fixed merchant. Off by default; set
// NEXT_PUBLIC_AFFILIATE_SCRIPT_SRC once you have a publisher script URL
// from one of these services and it turns on with no other code changes.
// Also gated on cookie consent (see CookieConsent.tsx) — it's the one
// non-essential, tracking script on this site.
export function AffiliateScript() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const sync = () => setConsented(getConsent() === "accepted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const src = process.env.NEXT_PUBLIC_AFFILIATE_SCRIPT_SRC;
  if (!src || !consented) return null;
  return <Script src={src} strategy="afterInteractive" />;
}
