"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Activity } from "@/lib/types";
import { ActivityCard } from "./ActivityCard";
import { ActivitySummaryCard } from "./ActivitySummaryCard";

export function ActivityCardWithModal({
  activity,
  countryName,
  countrySlug,
}: {
  activity: Activity;
  countryName: string;
  countrySlug: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.location.hash === `#${activity.id}`) {
      setOpen(true);
    }
  }, [activity.id]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <ActivitySummaryCard activity={activity} onOpen={() => setOpen(true)} />
      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/75 px-4 py-8 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={activity.title}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="fixed right-5 top-5 z-[110] flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-surface text-white/70 shadow-lg transition hover:border-white/30 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div
              className="relative mx-auto w-full max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ActivityCard activity={activity} countryName={countryName} countrySlug={countrySlug} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
