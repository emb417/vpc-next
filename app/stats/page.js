import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import LeagueStatsDashboard from "@/components/stats/LeagueStatsDashboard";

export const metadata = {
  title: "League Statistics",
  description: "Virtual Pinball Chat league's statistics for the past 52 weeks and 13 weeks.",
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
