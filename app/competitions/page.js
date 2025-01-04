import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import CompetitionDashboard from "@/components/pinball/CompetitionDashboard";

export const metadata = {
  title: "Competition Corner",
  description: "Virtual Pinball Chat league's weekly competitions. Filter by table name, VPS ID, and sort by name or recently played in competition.",
  alternates: {
    canonical: "/competitions",
  },
};

export default function CompetitionCornerPage() {
  return (
    <Suspense
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <CompetitionDashboard />
    </Suspense>
  );
}
