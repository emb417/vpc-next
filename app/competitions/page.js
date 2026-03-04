import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import CompetitionDashboard from "@/components/competition/CompetitionDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Competition Corner",
  description:
    "Weekly Competition Archive. Relive every past event with a searchable database of weekly tables. Simply search by Table Name to access dedicated historical leaderboards.",
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
