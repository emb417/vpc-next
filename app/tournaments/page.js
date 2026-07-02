import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import TournamentDashboard from "@/components/tournament/TournamentDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Tournaments",
  description:
    "Browse every Virtual Pinball Chat tournament, current and past. Search by name and open any tournament for its tables, standings, and points charts.",
  alternates: {
    canonical: "/tournaments",
  },
};

export default async function TournamentsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams?.searchTerm || "";
  return (
    <Suspense
      fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
    >
      <TournamentDashboard searchTerm={searchTerm} />
    </Suspense>
  );
}
