import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import TournamentDetail from "@/components/tournament/TournamentDetail";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Tournament",
  description:
    "Tournament leaderboards — per-table standings and points for a Virtual Pinball Chat tournament.",
};

export default async function TournamentDetailPage({ params }) {
  const { id } = await params;
  return (
    <Suspense fallback={<LoadingMessage message="Loading tournament..." />}>
      <TournamentDetail id={id} />
    </Suspense>
  );
}
