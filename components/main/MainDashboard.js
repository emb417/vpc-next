import LeaderboardStats from "@/lib/LeaderboardStats";
import RecentStats from "@/lib/RecentStats";
import WeeklyLeaderboard from "@/components/main/WeeklyLeaderboard";
import RankLeaderboard from "@/components/main/RankLeaderboard";
import { fetchWithLogging } from "@/lib/fetchWithLogging";
import { logEvent } from "@/lib/logger";

async function getData() {
  const overallStart = Date.now();

  logEvent({ type: "main_dashboard_start" });

  try {
    const recentUrl = `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_WEEKS}?limit=13`;

    const recentResponse = await fetchWithLogging(
      recentUrl,
      { cache: "no-store" },
      "getRecentWeeks",
    );

    const data = await recentResponse.json();

    const positionWeeksData = LeaderboardStats(data);
    const recentPlayerStats = RecentStats(data);

    let vpsData = null;

    if (positionWeeksData?.length) {
      const vpsUrl = `${process.env.SSR_BASE_URL}${process.env.VPS_API_TABLES_PATH}/${positionWeeksData[0].vpsId}`;

      const vpsResponse = await fetchWithLogging(
        vpsUrl,
        { next: { revalidate: 1800 } },
        "getVpsTable",
      );

      vpsData = await vpsResponse.json();
    }

    logEvent({
      type: "main_dashboard_complete",
      durationMs: Date.now() - overallStart,
    });

    return {
      props: { recentPlayerStats, positionWeeksData, vpsData },
    };
  } catch (error) {
    logEvent({
      type: "main_dashboard_error",
      error: error.message,
    });

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
