import LeaderboardStats from "@/lib/LeaderboardStats";
import RecentStats from "@/lib/RecentStats";
import WeeklyLeaderboard from "@/components/pinball/WeeklyLeaderboard";
import RankLeaderboard from "@/components/pinball/RankLeaderboard";

async function getData() {
  try {
    const response = await fetch(
      `${process.env.VPC_BASE_URL}${process.env.VPC_API_PATH}`,
      {
        next: { revalidate: 300 },
      }
    );

    const data = await response.json();

    const positionWeeksData = LeaderboardStats(data);

    const recentPlayerStats = RecentStats(data);

    const vpsResponse = await fetch(
      `${process.env.VPC_BASE_URL}${process.env.VPS_API_TABLES_PATH}/${positionWeeksData[0].vpsId}`,
      {
        next: { revalidate: 1800 },
      }
    );
    const vpsData = await vpsResponse.json();

    return {
      props: {
        recentPlayerStats,
        positionWeeksData,
        vpsData,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: { message: "Server Error" } };
  }
}

export default async function Leaderboards() {
  const { props } = await getData();
  const { recentPlayerStats, positionWeeksData, vpsData } = props;
  return (
    <div className="grid grid-cols-12 gap-8 mb-14 py-2 max-w-5xl">
      <div className="col-span-12 sm:col-span-6">
        <WeeklyLeaderboard weekData={positionWeeksData[0]} vpsData={vpsData} />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <RankLeaderboard recentPlayerStats={recentPlayerStats} />
      </div>
    </div>
  );
}
