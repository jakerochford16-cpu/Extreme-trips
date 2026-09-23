"use client";

import { useState } from "react";
import { packingListForGroup } from "@/lib/packingLists";

export function PackingList({ categoryGroup }: { categoryGroup: string }) {
  const [open, setOpen] = useState(false);
  const items = packingListForGroup(categoryGroup);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        What to pack
      </button>
      {open && (
        <ul className="mt-3 space-y-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-white/70">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
