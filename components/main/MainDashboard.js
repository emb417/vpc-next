import LeaderboardStats from "@/lib/LeaderboardStats";
import RecentStats from "@/lib/RecentStats";
import WeeklyLeaderboard from "@/components/main/WeeklyLeaderboard";
import RankLeaderboard from "@/components/main/RankLeaderboard";

async function getData() {
  try {
    const response = await fetch(
      `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_WEEKS}?limit=13`,
      {
        next: { revalidate: 300 },
      },
    );

    const data = await response.json();

    const positionWeeksData = LeaderboardStats(data);
    const recentPlayerStats = RecentStats(data);

    if (!positionWeeksData || positionWeeksData.length === 0) {
      return {
        props: {
          recentPlayerStats,
          positionWeeksData: [],
          vpsData: null,
        },
      };
    }

    const vpsResponse = await fetch(
      `${process.env.SSR_BASE_URL}${process.env.VPS_API_TABLES_PATH}/${positionWeeksData[0].vpsId}`,
      { next: { revalidate: 1800 } },
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
    <div className="flex flex-col w-full max-h-dvh items-center justify-center gap-1 pb-2">
      <div className="flex flex-row w-full md:justify-center gap-4 py-2 overflow-auto border-b-2 border-orange-950">
        <div className="flex min-w-[320px] max-w-[320px] lg:min-w-[420px] lg:max-w-[420px]">
          <WeeklyLeaderboard
            weekData={positionWeeksData[0]}
            vpsData={vpsData}
          />
        </div>
        <div className="flex min-w-[320px] max-w-[320px] lg:min-w-[420px] lg:max-w-[420px]">
          <RankLeaderboard recentPlayerStats={recentPlayerStats} />
        </div>
      </div>
    </div>
  );
}
