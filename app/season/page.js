import { Suspense } from "react";
import SeasonDashboard from "@/components/pinball/SeasonDashboard";

export const metadata = {
  title: "Season Leaderboard",
  description: "VPC Season Leaderboard",
  alternates: {
    canonical: "/season",
  }
};

export default function SeasonPage() {
  return (
    <div className="flex flex-wrap w-full px-4">
      <Suspense
        fallback={
          <div className="w-full text-2xl text-stone-50 text-center flex justify-center items-center animate-pulse">
            Loading {metadata.title}...
          </div>
        }
      >
        <SeasonDashboard />
      </Suspense>
    </div>
  );
}
