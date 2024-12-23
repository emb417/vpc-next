import { Suspense } from "react";
import HistoryDashboard from "@/components/pinball/HistoryDashboard";

export const metadata = {
  title: "Weekly History",
  description: "VPC Weekly History",
  alternates: {
    canonical: "/history",
  },
};

export default function HistoryPage() {
  return (
    <div className="flex flex-col flex-grow w-full px-4 max-h-screen">
      <Suspense
        fallback={
          <div className="w-full text-2xl text-stone-50 text-center flex justify-center items-center animate-pulse">
            Loading {metadata.title}...
          </div>
        }
      >
        <HistoryDashboard />
      </Suspense>
    </div>
  );
}
