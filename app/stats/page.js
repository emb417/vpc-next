import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import StatsDashboard from "@/components/stats/AnnualStatsDashboard";

export const metadata = {
  title: "Annual Statistics",
  description: "Virtual Pinball Chat league's statistics for the past year.",
  alternates: {
    canonical: "/stats",
  },
};

export default function StatsPage() {
  return (
    <Suspense
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <StatsDashboard />
    </Suspense>
  );
}
