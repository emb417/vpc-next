import LeaderboardStats from "@/lib/LeaderboardStats";
import HistoryLeaderboards from "@/components/pinball/HistoryLeaderboards";

async function getData() {
  try {
    const response = await fetch(`${process.env.VPC_BASE_URL}${process.env.VPC_API_PATH}`, {
      next: { revalidate: 300 },
    });
    const data = await response.json();

    const { positionWeeksData } = LeaderboardStats(data);

    const weeksData = await Promise.all(
      positionWeeksData.map(async (weekData) => {
        const vpsResponse = await fetch(`${process.env.VPC_BASE_URL}${process.env.VPS_API_PATH}/${weekData.vpsId}`, {
          next: { revalidate: 1800 },
        });
        let vpsData;
        try {
          vpsData = await vpsResponse.json();
        } catch (error) {
          console.error(error);
          vpsData = null;
        }
        const imageUrl = vpsData?.b2sFiles?.[0]?.imgUrl ?? null;
    
        return {
          ...weekData,
          imageUrl,
        };
      })
    );

    return { props: { weeksData } };
  } catch (error) {
    console.error(error);
    return { props: { message: "Server Error" } };
  }
}

export default async function HistoryDashboard() {
  const { props } = await getData();
  const { weeksData } = props;
  return <HistoryLeaderboards weeksData={weeksData} />;
}
