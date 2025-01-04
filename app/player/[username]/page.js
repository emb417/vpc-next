import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import PlayerProfile from "@/components/player/PlayerProfile";

export async function generateMetadata({ params }) {
  const username = params.username;

  return {
    title: `VPC Player ${username}`,
    description: `Virtual Pinball Chat league's player ${username} ranking, rivals, stats, competition history, charts and more.`,
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
