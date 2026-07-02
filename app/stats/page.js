import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import LeagueStatsDashboard from "@/components/stats/LeagueStatsDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "League Statistics",
  description:
    "League-wide analytics: weekly participation trends, all-time honors, top manufacturers, eras, and designers, plus sortable player rankings across 13-week, 52-week, and all-time windows.",
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
