"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { GlobeInstance } from "globe.gl";
import type { Activity } from "@/lib/types";
import { colorForGroup } from "@/lib/categoryColors";
import { labelForGroup } from "@/lib/categoryGroups";
import { getWorldBorders } from "@/lib/worldBorders";

type GlobePoint = {
  id: string;
  lat: number;
  lng: number;
  label: string;
  color: string;
  href: string;
};

type BorderPath = {
  points: [number, number][];
  isCurrentCountry: boolean;
};

// world-atlas's country names are the English short form and occasionally
// diverge from ours (mostly US) — extend this if another mismatch shows up.
const BORDER_NAME_OVERRIDES: Record<string, string> = {
  "united states": "united states of america",
};

function namesMatch(a: string, b: string): boolean {
  const na = a.trim().toLowerCase();
  const nb = b.trim().toLowerCase();
  return na === nb || BORDER_NAME_OVERRIDES[na] === nb || BORDER_NAME_OVERRIDES[nb] === na;
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

// Picks a close-in camera altitude from how spread out the country's
// activities are, so a small country fills the view and a huge one (US,
// Canada, Brazil) still fits without needing a bounding-box fit like
// Leaflet's — globe.gl has no such helper, so this is a hand-rolled
// approximation from the lat/lng span.
function altitudeForSpread(points: { lat: number; lng: number }[]): number {
  if (points.length === 0) return 1.2;
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const span = Math.max(Math.max(...lats) - Math.min(...lats), Math.max(...lngs) - Math.min(...lngs));
  return Math.min(1.8, Math.max(0.26, span / 32 + 0.18));
}

function TapToActivate({ active, onActivate }: { active: boolean; onActivate: () => void }) {
  if (!active) return null;
  return (
    <div
      className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/20 backdrop-blur-[1px]"
      onClick={onActivate}
    >
      <span className="rounded-full border border-white/25 bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/90">
        Tap to spin the globe
      </span>
    </div>
  );
}

export function CountryGlobe({
  activities,
  countryName,
  heightClassName = "h-[420px]",
}: {
  activities: Activity[];
  countryName: string;
  heightClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [gateActive, setGateActive] = useState(() => isTouchDevice());

  const points: GlobePoint[] = activities
    .filter((a) => a.latitude != null && a.longitude != null)
    .map((a) => ({
      id: a.id,
      lat: a.latitude as number,
      lng: a.longitude as number,
      label: `${a.title} — ${labelForGroup(a.categoryGroup)}`,
      color: colorForGroup(a.categoryGroup),
      href: `#${a.id}`,
    }));

  useEffect(() => {
    let destroyed = false;

    import("globe.gl").then(({ default: Globe }) => {
      if (destroyed || !containerRef.current) return;

      const globe = new Globe(containerRef.current)
        .backgroundColor("rgba(0,0,0,0)")
        .showAtmosphere(true)
        .atmosphereColor("#3fe0ff")
        .atmosphereAltitude(0.2)
        .showGraticules(true)
        .globeMaterial(
          new THREE.MeshPhongMaterial({
            color: new THREE.Color("#0a0f1a"),
            emissive: new THREE.Color("#04222b"),
            emissiveIntensity: 0.22,
            shininess: 4,
            transparent: true,
            opacity: 0.94,
          })
        )
        .pointsData(points)
        .pointAltitude(0.015)
        .pointRadius(0.38)
        .pointColor((d) => (d as GlobePoint).color)
        .pointLabel((d) => (d as GlobePoint).label)
        .pointResolution(16)
        .onPointClick((d) => {
          const href = (d as GlobePoint).href;
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
          window.history.replaceState(null, "", href);
        })
        .pathPoints((d) => (d as BorderPath).points)
        .pathPointLat((p) => (p as [number, number])[1])
        .pathPointLng((p) => (p as [number, number])[0])
        .pathColor((d: object) => ((d as BorderPath).isCurrentCountry ? "#ffcf6b" : "rgba(63, 224, 255, 0.4)"))
        .pathStroke((d) => ((d as BorderPath).isCurrentCountry ? 0.9 : 0.32))
        .pathTransitionDuration(0);

      // World country borders load separately from the rest of the globe
      // (a ~100KB fetch, cached across every globe on the page) — the globe
      // renders immediately with its points and fills in outlines once they
      // arrive, rather than blocking first paint on them.
      getWorldBorders().then((borders) => {
        if (destroyed) return;
        const paths: BorderPath[] = borders.flatMap((b) =>
          b.rings.map((ring) => ({ points: ring, isCurrentCountry: namesMatch(b.name, countryName) }))
        );
        globe.pathsData(paths);
      });

      const scene = globe.scene();
      const graticuleMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color("#3fe0ff"),
        transparent: true,
        opacity: 0.06,
      });
      scene.traverse((obj) => {
        const line = obj as unknown as { isLine?: boolean; material?: THREE.Material };
        if (line.isLine) line.material = graticuleMaterial;
      });

      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = false;
      // Set directly from the same check that seeded `gateActive`'s initial
      // state, rather than relying on the other effect below — that effect
      // only re-fires when `gateActive` changes, which on a touch device
      // won't happen until the first tap, so the globe would otherwise be
      // created with dragging still enabled for that first moment.
      controls.enabled = !isTouchDevice();

      const centerLat = points.reduce((s, p) => s + p.lat, 0) / (points.length || 1);
      const centerLng = points.reduce((s, p) => s + p.lng, 0) / (points.length || 1);
      globe.pointOfView({ lat: centerLat || 0, lng: centerLng || 0, altitude: altitudeForSpread(points) });

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      globe.width(width).height(height);

      globeRef.current = globe;

      const ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        globe.width(entry.contentRect.width).height(entry.contentRect.height);
      });
      ro.observe(containerRef.current);
      roRef.current = ro;
    });

    return () => {
      destroyed = true;
      roRef.current?.disconnect();
      if (globeRef.current) {
        (globeRef.current as unknown as { _destructor?: () => void })._destructor?.();
      }
    };
    // Points/height are derived once from the activities this component was
    // mounted with — a country page doesn't swap activities under a mounted
    // globe, so there's no need to re-seed on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Touch devices start with drag-to-rotate disabled so a swipe over the
  // globe doesn't trap page scroll (same fix as the Leaflet map) — the
  // globe still spins on its own via autoRotate the whole time, so it never
  // looks inert, it just doesn't hijack the page until you deliberately tap
  // it.
  useEffect(() => {
    const controls = globeRef.current?.controls();
    if (!controls) return;
    controls.enabled = !gateActive;
  }, [gateActive]);

  return (
    <div
      className={`relative ${heightClassName} w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050810]`}
    >
      <div ref={containerRef} className="h-full w-full" />
      <TapToActivate active={gateActive} onActivate={() => setGateActive(false)} />
    </div>
  );
}
