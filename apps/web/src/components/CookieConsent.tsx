"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, type ConsentChoice } from "@/lib/cookieConsent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  function choose(choice: ConsentChoice) {
    setConsent(choice);
    setVisible(false);
  }

  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-white/70">
          This site uses essential cookies to keep you signed in, and optional cookies for
          affiliate link tracking that helps fund it — see the{" "}
          <Link href="/privacy" className="text-accent hover:text-accent-light">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("essential-only")}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:bg-accent-light"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
