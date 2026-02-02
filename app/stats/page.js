import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import LeagueStatsDashboard from "@/components/stats/LeagueStatsDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "League Statistics",
  description:
    "Comprehensive performance analytics. Analyze league trends and player momentum with detailed statistical breakdowns covering the past 13 and 52 weeks.",
  alternates: {
    canonical: "/stats",
  },
};

export default function StatsPage() {
  return (
    <Suspense
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <LeagueStatsDashboard />
    </Suspense>
  );
}
