"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { GlobeInstance } from "globe.gl";

// A click-bearing activity: brighter, weighted by click volume, individually
// labeled.
export type ActivityGlobePoint = {
  kind: "activity";
  id: string;
  lat: number;
  lng: number;
  label: string;
  weight: number;
  sponsored: boolean;
};

// A dim, low-altitude "presence" marker at a country's centroid — one per
// country, shown regardless of click activity, so the globe always looks
// populated. Rendered beneath the brighter activity points.
export type CountryGlobePoint = {
  kind: "country";
  id: string;
  lat: number;
  lng: number;
  label: string;
};

export type GlobePoint = ActivityGlobePoint | CountryGlobePoint;

export type GlobePulse = {
  id: string;
  lat: number;
  lng: number;
};

const HUD_CYAN = "#3fe0ff";
const SPONSORED_GOLD = "#ffcf6b";
const COUNTRY_DIM_CYAN = "rgba(63, 224, 255, 0.35)";
const COUNTRY_POINT_RADIUS = 0.16;
const COUNTRY_POINT_ALTITUDE = 0.002;

export function ClicksGlobe({ points, pulses }: { points: GlobePoint[]; pulses: GlobePulse[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const pointsRef = useRef(points);
  const pulsesRef = useRef(pulses);

  // Kept in sync on every render via effects (not during render itself) so
  // the async globe.gl import below — which resolves after this mount
  // commit — always seeds the globe with whatever points/pulses were
  // current at mount, not a stale empty array.
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  useEffect(() => {
    pulsesRef.current = pulses;
  }, [pulses]);

  useEffect(() => {
    let destroyed = false;

    import("globe.gl").then(({ default: Globe }) => {
      if (destroyed || !containerRef.current) return;

      const globe = new Globe(containerRef.current)
        .backgroundColor("rgba(0,0,0,0)")
        .showAtmosphere(true)
        .atmosphereColor(HUD_CYAN)
        .atmosphereAltitude(0.22)
        .showGraticules(true)
        .globeMaterial(
          new THREE.MeshPhongMaterial({
            color: new THREE.Color("#050912"),
            emissive: new THREE.Color("#03323d"),
            emissiveIntensity: 0.25,
            shininess: 4,
            transparent: true,
            opacity: 0.92,
          })
        )
        .pointsData(pointsRef.current)
        .pointAltitude((d) => {
          const p = d as GlobePoint;
          return p.kind === "country" ? COUNTRY_POINT_ALTITUDE : 0.012 + Math.min(p.weight, 1) * 0.09;
        })
        .pointRadius((d) => {
          const p = d as GlobePoint;
          return p.kind === "country" ? COUNTRY_POINT_RADIUS : 0.35 + Math.min(p.weight, 1) * 0.55;
        })
        .pointColor((d) => {
          const p = d as GlobePoint;
          if (p.kind === "country") return COUNTRY_DIM_CYAN;
          return p.sponsored ? SPONSORED_GOLD : HUD_CYAN;
        })
        .pointLabel((d) => {
          const p = d as GlobePoint;
          if (p.kind === "country") return p.label;
          return `${p.label}${p.sponsored ? " · Featured" : ""}`;
        })
        .pointResolution(12)
        .ringsData(pulsesRef.current)
        .ringColor(() => (t: number) => `rgba(63, 224, 255, ${1 - t})`)
        .ringMaxRadius(3.2)
        .ringPropagationSpeed(4.5)
        .ringRepeatPeriod(1600)
        .ringAltitude(0.012);

      const scene = globe.scene();
      const graticuleMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(HUD_CYAN),
        transparent: true,
        opacity: 0.12,
      });
      scene.traverse((obj) => {
        const line = obj as unknown as { isLine?: boolean; material?: THREE.Material };
        if (line.isLine) line.material = graticuleMaterial;
      });

      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.55;
      controls.enableZoom = false;

      globe.pointOfView({ lat: 18, lng: 10, altitude: 2.3 });

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
  }, []);

  useEffect(() => {
    globeRef.current?.pointsData(points);
  }, [points]);

  useEffect(() => {
    globeRef.current?.ringsData(pulses);
  }, [pulses]);

  return <div ref={containerRef} className="h-full w-full" />;
}
