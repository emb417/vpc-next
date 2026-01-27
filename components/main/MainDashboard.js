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
