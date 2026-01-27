import LeaderboardStats from "@/lib/LeaderboardStats";
import RecentStats from "@/lib/RecentStats";
import WeeklyLeaderboard from "@/components/main/WeeklyLeaderboard";
import RankLeaderboard from "@/components/main/RankLeaderboard";

async function getData() {
  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_WEEKS}?limit=13`;
    console.log(`🚀 Req ${url}`);

    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    console.log(
      `${response.ok ? "✅" : "❌"} Resp ${response.status} ${response.headers.get("Date")} `,
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

    const vpsUrl = `${process.env.SSR_BASE_URL}${process.env.VPS_API_TABLES_PATH}/${positionWeeksData[0].vpsId}`;
    console.log(`🚀 Req ${vpsUrl}`);

    const vpsResponse = await fetch(vpsUrl, { next: { revalidate: 1800 } });

    console.log(
      `${vpsResponse.ok ? "✅" : "❌"} Resp ${vpsResponse.status} ${vpsResponse.headers.get("Date")} `,
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
    console.error("SSR getData error:", error);
    return {
      props: { recentPlayerStats: [], positionWeeksData: [], vpsData: null },
    };
  }
}

export default async function Leaderboards() {
  const { props } = await getData();
  const { recentPlayerStats, positionWeeksData, vpsData } = props;
  return (
    <div className="grid grid-cols-12 gap-8 mb-14 py-2 w-full max-w-5xl">
      <div className="col-span-12 sm:col-span-6">
        <WeeklyLeaderboard weekData={positionWeeksData[0]} vpsData={vpsData} />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <RankLeaderboard recentPlayerStats={recentPlayerStats} />
      </div>
    </div>
  );
}
