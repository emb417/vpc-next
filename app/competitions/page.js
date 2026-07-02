import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import CompetitionDashboard from "@/components/competition/CompetitionDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Competition Corner",
  description:
    "Browse the complete Competition Corner archive. Search past weekly tables by name to see each week's table details, download link, and final leaderboard.",
  alternates: {
    canonical: "/competitions",
  },
};

export default async function CompetitionCornerPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams?.searchTerm || "";
  const week = resolvedSearchParams?.week || "";
  return (
    <Suspense
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <CompetitionDashboard searchTerm={searchTerm} week={week} />
    </Suspense>
  );
}
