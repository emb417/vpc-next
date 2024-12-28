import { redirect } from "next/navigation";
import PlayerSummaryData from "@/lib/PlayerStats";
import PlayerBio from "@/components/pinball/player/PlayerBio";
import PlayerRivals from "@/components/pinball/player/PlayerRivals";
import PlayerHistory from "@/components/pinball/player/PlayerHistory";
import PlayerAnnualInsights from "@/components/pinball/player/PlayerAnnualInsights";
import PlayerCharts from "@/components/pinball/player/PlayerCharts";

async function getPlayerSummaryData(username) {
  try {
    const response = await fetch(`${process.env.VPC_BASE_URL}${process.env.VPC_API_PATH}`, {
      next: { revalidate: 0 },
    });
    const data = await response.json();

    return PlayerSummaryData(data, username);
  } catch (error) {
    console.error(error);
    throw new Error("Server Error");
  }
}

export default async function PlayerProfile({ username }) {
  const {
    playerRivals,
    user,
    userPositionData,
    userSeasonSummary,
  } = await getPlayerSummaryData(username);

  if (!user) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-12 2xl:grid-cols-12 w-full gap-4 py-2">
      <div className="flex flex-col lg:col-span-5 xl:col-span-7 2xl:col-span-6 gap-4">
        <div className="flex grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
          <PlayerBio user={user} userSeasonSummary={userSeasonSummary} />
          {playerRivals.some((rival) => rival !== undefined) && (
            <PlayerRivals playerRivals={playerRivals} />
          )}
        </div>
        <PlayerHistory weeksData={userPositionData} />
      </div>
      <div className="flex flex-col lg:col-span-6 xl:col-span-5 2xl:col-span-6 items-center gap-4">
        <PlayerAnnualInsights user={user} />
        <PlayerCharts weeksData={userPositionData} username={user.username} />
      </div>
    </div>
  );
}
