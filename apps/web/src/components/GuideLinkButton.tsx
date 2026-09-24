"use client";

export function GuideLinkButton({ activityId, href }: { activityId: string; href: string }) {
  function trackClick() {
    const payload = JSON.stringify({ activityId });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track-click", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track-click", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-light"
    >
      Find a guide / operator
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
      </svg>
    </a>
  );
}
