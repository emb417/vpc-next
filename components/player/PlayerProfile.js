import { redirect } from "next/navigation";
import PlayerSummaryData from "@/lib/PlayerStats";
import PlayerBio from "@/components/player/PlayerBio";
import PlayerRivals from "@/components/player/PlayerRivals";
import PlayerCompetitions from "@/components/player/PlayerCompetitions";
import PlayerInsights from "@/components/player/PlayerInsights";
import PlayerCharts from "@/components/player/PlayerCharts";

async function getPlayerSummaryData(username) {
  try {
    const response = await fetch(
      `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_WEEKS}?limit=52`,
      {
        next: { revalidate: 300 },
      },
    );
    const data = await response.json();

    return PlayerSummaryData(data, username);
  } catch (error) {
    console.error(error);
    throw new Error("Server Error");
  }
}

export default async function PlayerProfile({ username }) {
  const { playerStats, playerRivals, user, userPositionData } =
    await getPlayerSummaryData(username);

  if (!user || !playerStats) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-12 2xl:grid-cols-12 w-full gap-4 py-2">
      <div className="flex flex-col lg:col-span-5 xl:col-span-7 2xl:col-span-6 gap-4">
        <div className="flex grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
          <PlayerBio user={playerStats} />
          {playerRivals.some((rival) => rival !== undefined) && (
            <PlayerRivals playerRivals={playerRivals} />
          )}
        </div>
        <PlayerCompetitions weeksData={userPositionData} />
      </div>
      <div className="flex flex-col lg:col-span-6 xl:col-span-5 2xl:col-span-6 items-center gap-4">
        <PlayerInsights user={user} />
        <PlayerCharts weeksData={userPositionData} username={user.username} />
      </div>
    </div>
  );
}
