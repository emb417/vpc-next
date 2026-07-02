import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import HighScoresDashboard from "@/components/highscores/HighScoresDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "High Score Corner",
  description:
    "The community high score database. Search any virtual pinball table by name or VPS ID to see its latest high scores, table details, and download link.",
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
