import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import PlayerProfile from "@/components/player/PlayerProfile";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const username = resolvedParams.username;

  return {
    title: `VPC Player ${username}`,
    description: `Player Profile: ${username}. A complete career breakdown featuring personal power rankings, closest rivalries, competition history, and performance charts.`,
    alternates: {
      canonical: `/player/${username}`,
    },
  };
}

export default async function PlayerProfilePage({ params }) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  return (
    <Suspense
      fallback={
        <LoadingMessage message={`Loading Player Profile for ${username}...`} />
      }
    >
      <PlayerProfile username={username} />
    </Suspense>
  );
}
