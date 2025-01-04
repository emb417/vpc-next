import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import SeasonDashboard from "@/components/pinball/season/SeasonDashboard";

export const metadata = {
  title: "Season Leaderboard",
  description: "Virtaul Pinball Chat league's season leaderboard and chart, only for the current or most recent season.",
  alternates: {
    canonical: "/season",
  },
};

export default function SeasonPage() {
  return (
    <Suspense
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <SeasonDashboard />
    </Suspense>
  );
}
