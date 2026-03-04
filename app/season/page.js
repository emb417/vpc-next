import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import SeasonDashboard from "@/components/season/SeasonDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Season Leaderboard",
  description:
    "Live Season Tracking. Access the current season’s definitive leaderboard and performance charts to see exactly where the field stands in the race for the title.",
  alternates: {
    canonical: "/season",
  },
};

export default async function SeasonPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const season = resolvedSearchParams?.season || "5";
  return (
    <Suspense
      key={season}
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <SeasonDashboard season={season} />
    </Suspense>
  );
}
