import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import HighScoresDashboard from "@/components/highscores/HighScoresDashboard";

export const metadata = {
  title: "High Score Corner",
  description: "Virtual Pinball Chat high score corner leaderboards. Filter by table name, VPS ID, and sort by name or recently played in competition.",
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
