import { redirect } from "next/navigation";
import { getActivities } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function SurprisePage() {
  const activities = await getActivities();
  const pick = activities[Math.floor(Math.random() * activities.length)];
  redirect(`/countries/${pick.country.slug}#${pick.id}`);
}
