import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import PlayerProfile from "@/components/player/PlayerProfile";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const username = params.username;

  return {
    title: `VPC Player ${username}`,
    description: `Player Profile: ${username}. A complete career breakdown featuring personal power rankings, closest rivalries, competition history, and performance charts.`,
    alternates: {
      canonical: `/player/${username}`,
    },
  };
}

export default function PlayerProfilePage({ params }) {
  const username = params.username;
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
