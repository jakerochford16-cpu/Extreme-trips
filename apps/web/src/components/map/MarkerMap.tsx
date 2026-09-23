"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { Activity, ActivityWithCountry } from "@/lib/types";
import { colorForGroup } from "@/lib/categoryColors";
import { labelForGroup } from "@/lib/categoryGroups";

type MapActivity = Activity | ActivityWithCountry;

function hasCountry(a: MapActivity): a is ActivityWithCountry {
  return "country" in a;
}

function dotIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<span style="
      display:block;
      width:16px;
      height:16px;
      border-radius:9999px;
      background:${color};
      border:2px solid rgba(10,10,15,0.9);
      box-shadow:0 0 0 2px ${color}55;
    "></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
}

function FitBounds({ activities }: { activities: MapActivity[] }) {
  const map = useMap();
  useMemo(() => {
    const points = activities
      .filter((a) => a.latitude != null && a.longitude != null)
      .map((a) => [a.latitude as number, a.longitude as number] as [number, number]);
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 8);
      return;
    }
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 9 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities.length]);
  return null;
}

export function MarkerMap({
  activities,
  heightClassName = "h-[70vh]",
}: {
  activities: MapActivity[];
  heightClassName?: string;
}) {
  const withCoords = activities.filter((a) => a.latitude != null && a.longitude != null);

  return (
    <div className={`${heightClassName} w-full overflow-hidden rounded-2xl border border-white/10`}>
      <MapContainer
        center={[10, 20]}
        zoom={2}
        scrollWheelZoom
        className="map-dark-tiles h-full w-full bg-[#0b0a08]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds activities={withCoords} />
        {withCoords.map((activity) => {
          const href = hasCountry(activity)
            ? `/countries/${activity.country.slug}#${activity.id}`
            : `#${activity.id}`;
          return (
            <Marker
              key={activity.id}
              position={[activity.latitude as number, activity.longitude as number]}
              icon={dotIcon(colorForGroup(activity.categoryGroup))}
            >
              <Popup>
                <div className="min-w-[200px] text-sm">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent-dark">
                    {hasCountry(activity) ? activity.country.name + " · " : ""}
                    {labelForGroup(activity.categoryGroup)}
                  </p>
                  <p className="mb-1 font-bold text-neutral-900">{activity.title}</p>
                  <p className="mb-2 text-xs text-neutral-600">{activity.region}</p>
                  <a
                    href={href}
                    className="text-xs font-semibold text-accent-dark underline underline-offset-2"
                  >
                    View details &rarr;
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
