import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import PlayerProfile from "@/components/pinball/player/PlayerProfile";

export async function generateMetadata({ params }) {
  const username = params.username;

  return {
    title: "Player",
    description: `VPC Player ${username}`,
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
