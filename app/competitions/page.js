import { Suspense } from "react";
import CompetitionDashboard from "@/components/pinball/CompetitionDashboard";

export const metadata = {
  title: "Competition Corner",
  description: "VPC Competition Corner",
  alternates: {
    canonical: "/competitions",
  },
};

export default function CompetitionCornerPage() {
  return (
    <div className="flex flex-col flex-grow w-full px-4 max-h-screen">
      <Suspense
        fallback={
          <div className="w-full text-2xl text-stone-50 text-center flex justify-center items-center animate-pulse">
            Loading {metadata.title}...
          </div>
        }
      >
        <CompetitionDashboard />
      </Suspense>
    </div>
  );
}
