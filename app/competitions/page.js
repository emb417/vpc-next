import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
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
    <Suspense
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <CompetitionDashboard />
    </Suspense>
  );
}
