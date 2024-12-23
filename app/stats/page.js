import { Suspense } from "react";
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
    <div className="flex flex-wrap w-full px-4">
      <Suspense
        fallback={
          <div className="w-full text-2xl text-stone-50 text-center flex justify-center items-center animate-pulse">
            Loading {metadata.title}...
          </div>
        }
      >
        <StatsDashboard />
      </Suspense>
    </div>
  );
}
