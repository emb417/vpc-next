import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import SeasonDashboard from "@/components/pinball/SeasonDashboard";

export const metadata = {
  title: "Season Leaderboard",
  description: "VPC Season Leaderboard",
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
