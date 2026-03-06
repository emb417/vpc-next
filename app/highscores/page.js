import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import HighScoresDashboard from "@/components/highscores/HighScoresDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "High Score Corner",
  description:
    "High Score Corner. Master the machines with a searchable database of tables. Search by Table Name to see the most recent high scores posted.",
  alternates: {
    canonical: "/highscores",
  },
};

export default async function HighScoreCornerPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams?.searchTerm || "";
  const vpsId = resolvedSearchParams?.vpsId || "";
  return (
    <Suspense
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <HighScoresDashboard searchTerm={searchTerm} vpsId={vpsId} />
    </Suspense>
  );
}
