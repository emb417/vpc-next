import { Suspense } from "react";
import PlayerProfile from "@/components/pinball/player/PlayerProfile";

export async function generateMetadata({ params }) {
  const username = params.username;

  return {
    title: "Player",
    description: `VPC Player ${username}`,
    alternates: {
      canonical: `/player/${username}`,
    },
  }
}

export default function PlayerProfilePage({ params }) {
  const username = params.username;
  return (
    <div className="flex flex-wrap w-full px-4 mb-14">
      <div className="flex w-full justify-center items-start">
        <Suspense
          fallback={
            <div className="w-full text-2xl text-stone-50 text-center flex justify-center items-center animate-pulse">
              Loading Player Profile for {username}...
            </div>
          }
        >
          <PlayerProfile username={username} />
        </Suspense>
      </div>
    </div>
  );
}
