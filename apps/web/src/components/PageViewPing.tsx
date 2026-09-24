"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageViewPing() {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastSent.current === pathname) return;
    lastSent.current = pathname;

    const payload = JSON.stringify({ path: pathname });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/hit", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/hit", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
