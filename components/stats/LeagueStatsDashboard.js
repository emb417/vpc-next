import LeagueStats from "@/lib/LeagueStats";
import LeagueStatsTable from "@/components/stats/LeagueStatsTable";

async function getData() {
  try {
    const response = await fetch(
      `${process.env.VPC_BASE_URL}${process.env.VPC_API_PATH}`,
      {
        next: { revalidate: 1800 },
      }
    );
    const data = await response.json();

    const { playerStats, rankKeyMap } = LeagueStats(data);

    return { props: { playerStats, rankKeyMap } };
  } catch (error) {
    console.error(error);
    return { props: { message: "Server Error" } };
  }
}

export default async function StatsDashboard() {
  const { props } = await getData();
  const { playerStats, rankKeyMap } = props;
  return <LeagueStatsTable playerStats={playerStats} rankKeyMap={rankKeyMap} />;
}
