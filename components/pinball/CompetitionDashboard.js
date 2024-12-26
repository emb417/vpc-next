import LeaderboardStats from "@/lib/LeaderboardStats";
import CompetitionLeaderboards from "@/components/pinball/CompetitionLeaderboards";

async function getData() {
  try {
    const response = await fetch(`${process.env.VPC_BASE_URL}${process.env.VPC_API_PATH}`, {
      next: { revalidate: 300 },
    });
    const data = await response.json();

    const { positionWeeksData } = LeaderboardStats(data);

    return { props: { weeksData: positionWeeksData } };
  } catch (error) {
    console.error(error);
    return { props: { message: "Server Error" } };
  }
}

export default async function CompetitionDashboard() {
  const { props } = await getData();
  const { weeksData } = props;
  return <CompetitionLeaderboards weeksData={weeksData} tablesAPI={`${process.env.VPC_BASE_URL}${process.env.VPS_API_TABLES_PATH}`} />;
}
