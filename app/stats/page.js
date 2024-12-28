import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import StatsDashboard from "@/components/pinball/AnnualStatsDashboard";

export const metadata = {
  title: "Annual Stats",
  description: "VPC Annual Stats",
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
