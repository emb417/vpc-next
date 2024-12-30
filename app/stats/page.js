import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import StatsDashboard from "@/components/pinball/AnnualStatsDashboard";

export const metadata = {
  title: "Annual Statistics",
  description: "VPC Annual Statistics",
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
