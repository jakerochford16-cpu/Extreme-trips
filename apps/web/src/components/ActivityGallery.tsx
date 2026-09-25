"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GalleryPhoto } from "@/lib/activityGallery";

export function ActivityGallery({
  photos,
  fallbackSrc,
  title,
}: {
  photos: GalleryPhoto[] | null;
  fallbackSrc: string;
  title: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="relative h-44 w-full">
        <Image src={fallbackSrc} alt={title} fill sizes="(min-width: 640px) 480px, 100vw" className="object-cover" />
      </div>
    );
  }

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, photos!.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    setActive(clamped);
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    setActive((prev) => (prev === i ? prev : i));
  }

  return (
    <div className="group/gallery relative h-44 w-full overflow-hidden bg-black/20">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="scrollbar-none flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {photos.map((photo, i) => (
          <div key={photo.url} className="relative h-full w-full shrink-0 snap-center">
            <Image
              src={photo.url}
              alt={`${title} — photo ${i + 1} of ${photos.length}`}
              fill
              sizes="(min-width: 640px) 480px, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/15 to-transparent" />

      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              scrollToIndex(active - 1);
            }}
            className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition hover:bg-black/70 group-hover/gallery:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              scrollToIndex(active + 1);
            }}
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition hover:bg-black/70 group-hover/gallery:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2 py-0.5 text-[10.5px] font-semibold tabular-nums text-white">
            {active + 1} / {photos.length}
          </span>

          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {photos.map((photo, i) => (
              <button
                key={photo.url}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-4 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {photos[active] && (
        <a
          href={photos[active].photoPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-2.5 left-3 text-[9.5px] font-medium text-white/60 opacity-0 transition hover:text-white/90 group-hover/gallery:opacity-100"
        >
          Photo: {photos[active].photographer} / Unsplash
        </a>
      )}
    </div>
  );
}
