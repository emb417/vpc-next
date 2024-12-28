import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import HighScoresDashboard from "@/components/pinball/HighScoresDashboard";

export const metadata = {
  title: "High Score Corner",
  description: "VPC High Score Corner",
  alternates: {
    canonical: "/highscores",
  },
};

export default function HighScoreCornerPage() {
  return (
    <Suspense
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <HighScoresDashboard />
    </Suspense>
  );
}
