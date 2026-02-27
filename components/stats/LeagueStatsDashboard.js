import LeagueStats from "@/lib/LeagueStats";
import LeagueStatsTable from "@/components/stats/LeagueStatsTable";
import LeagueSummaryStats from "@/components/stats/LeagueSummaryStats";

async function getData() {
  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_WEEKS}?limit=9999`;
    console.log(`🚀 Req ${url}`);

    const response = await fetch(url, { cache: "no-store" });

    console.log(
      `${response.ok ? "✅" : "❌"} Resp ${response.status} ${response.headers.get("Date")} `,
    );

    const data = await response.json();
    const { playerStats, rankKeyMap, leagueStats } = LeagueStats(data);

    return { props: { playerStats, rankKeyMap, leagueStats } };
  } catch (error) {
    console.error("SSR getData error:", error);
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
