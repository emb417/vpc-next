import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import TournamentDashboard from "@/components/tournament/TournamentDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Tournaments",
  description:
    "Tournament Archive. Browse every Virtual Pinball Chat tournament — current and past — with full standings and per-tournament points charts.",
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
