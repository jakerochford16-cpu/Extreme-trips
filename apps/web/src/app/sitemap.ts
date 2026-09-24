import type { MetadataRoute } from "next";
import { getCountries } from "@/lib/api";

const BASE_URL = "https://extreme-trips-web.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const countries = await getCountries();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/activities`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/extreme`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/map`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/plan`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/insurance`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/partner`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const countryRoutes: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${BASE_URL}/countries/${country.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...countryRoutes];
}
