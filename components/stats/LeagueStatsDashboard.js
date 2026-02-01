import LeagueStats from "@/lib/LeagueStats";
import LeagueStatsTable from "@/components/stats/LeagueStatsTable";

async function getData() {
  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_WEEKS}?limit=52`;
    console.log(`🚀 Req ${url}`);

    const response = await fetch(url, {
      next: { revalidate: 1800 },
    });

    console.log(
      `${response.ok ? "✅" : "❌"} Resp ${response.status} ${response.headers.get("Date")} `,
    );

    const data = await response.json();

    const { playerStats, rankKeyMap } = LeagueStats(data);

    return { props: { playerStats, rankKeyMap } };
  } catch (error) {
    console.error("SSR getData error:", error);
    return { props: { playerStats: [], rankKeyMap: {} } };
  }
}

export default async function StatsDashboard() {
  const { props } = await getData();
  const { playerStats, rankKeyMap } = props;
  return <LeagueStatsTable playerStats={playerStats} rankKeyMap={rankKeyMap} />;
}
