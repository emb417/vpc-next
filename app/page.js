import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import MainDashboard from "@/components/main/MainDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Virtual Pinball Chat",
  description:
    "The home of the Virtual Pinball Chat league. See this week's Competition Corner table and every active tournament at a glance, and jump into leaderboards, high scores, and player stats.",
  alternates: {
    canonical: "/",
  },
};

export default function PinballPage() {
  return (
    <Suspense
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <MainDashboard />
    </Suspense>
  );
}
