import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import MainDashboard from "@/components/pinball/main/MainDashboard";

export const metadata = {
  title: "Virtual Pinball Chat",
  description: "Virtual Pinball Chat league's main dashboard for weekly competition and power ranking leaderboards, plus pages for high score leaderboards, player profiles, statistics, and more.",
  alternates: {
    canonical: "/",
  },
};

export default function PinballPage() {
  return (
    <div className="flex w-full justify-center items-start">
      <Suspense
        fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
      >
        <MainDashboard />
      </Suspense>
    </div>
  );
}
