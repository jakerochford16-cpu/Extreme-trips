"use client";

import { useState } from "react";

export function ShareButton({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}${path}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the share sheet — no-op
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing we can do without a fallback UI
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share this activity"
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/50 transition hover:border-white/30 hover:text-white/80"
    >
      {copied ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.68 13.34a3 3 0 100-2.68m0 2.68a3 3 0 110-2.68m0 2.68l6.64 3.83m-6.64-6.51l6.64-3.83m0 0a3 3 0 105.66-1.98 3 3 0 00-5.66 1.98zm0 10.66a3 3 0 105.66 1.98 3 3 0 00-5.66-1.98z"
          />
        </svg>
      )}
    </button>
  );
}
