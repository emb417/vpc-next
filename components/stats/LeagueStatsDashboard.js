import LeagueStats from "@/lib/LeagueStats";
import LeagueStatsTable from "@/components/stats/LeagueStatsTable";
import LeagueSummaryStats from "@/components/stats/LeagueSummaryStats";
import { fetchWithLogging } from "@/lib/fetchWithLogging";
import { logEvent } from "@/lib/logger";

async function getData() {
  const overallStart = Date.now();
  logEvent({ type: "league_stats_dashboard_start" });

  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_WEEKS}?limit=9999`;
    const response = await fetchWithLogging(
      url,
      { cache: "no-store" },
      "getRecentWeeksForLeagueStats",
    );

    if (!response.ok) throw new Error(`Upstream error ${response.status}`);

    const data = await response.json();

    const vpsResponse = await fetchWithLogging(
      `${process.env.SSR_BASE_URL}${process.env.VPS_API_GAMES_PATH}`,
      { cache: "no-store" },
      "getVpsGames",
    );

    if (!vpsResponse.ok) throw new Error(`VPS API error ${vpsResponse.status}`);

    const vpsGames = await vpsResponse.json();

    // Build lookup map: vpsId -> { maker, year, designer }
    const vpsLookup = Object.fromEntries(
      vpsGames
        .flatMap((g) =>
          (g.tableFiles ?? []).map((t) => [
            t.id,
            {
              maker: g.manufacturer,
              year: g.year,
              designer: g.designers?.[0] ?? null,
            },
          ]),
        )
        .filter(([id]) => id),
    );

    const { playerStats, rankKeyMap, leagueStats } = LeagueStats(
      data,
      vpsLookup,
    );

    logEvent({
      type: "league_stats_dashboard_complete",
      durationMs: Date.now() - overallStart,
    });

    return { props: { playerStats, rankKeyMap, leagueStats } };
  } catch (error) {
    logEvent({
      type: "league_stats_dashboard_error",
      error: error.message,
    });
    return { props: { playerStats: [], rankKeyMap: {}, leagueStats: null } };
  }
}

export default async function StatsDashboard() {
  const { props } = await getData();
  const { playerStats, rankKeyMap, leagueStats } = props;

  return (
    <div className="flex flex-col w-full gap-2 py-2 text-stone-200">
      {leagueStats && <LeagueSummaryStats leagueStats={leagueStats} />}
      <LeagueStatsTable playerStats={playerStats} rankKeyMap={rankKeyMap} />
    </div>
  );
}
