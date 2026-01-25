import HighScoresLeaderboards from "@/components/highscores/HighScoresLeaderboards";
import { console } from "inspector";

async function getData() {
  try {
    const vpsResponse = await fetch(
      `${process.env.SSR_BASE_URL}${process.env.VPC_API_SCORES_PATH}`,
      {
        next: { revalidate: 300 },
      },
    );
    const data = await vpsResponse.json();

    const vpcResponse = await fetch(
      `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_WEEKS}`,
      {
        next: { revalidate: 3600 },
      },
    );
    const vpcData = await vpcResponse.json();

    const vpsIdsByRecency = vpcData.map((item) => item.vpsId);

    return { props: { data, vpsIdsByRecency } };
  } catch (error) {
    console.error(error);
    return { props: { message: "Server Error" } };
  }
}

export default async function HistoryDashboard() {
  const { props } = await getData();
  const { data, vpsIdsByRecency } = props;

  return (
    <HighScoresLeaderboards
      scoresData={data}
      vpsIdsByRecency={vpsIdsByRecency}
      tablesAPI={`${process.env.CSR_BASE_URL}${process.env.VPS_API_TABLES_PATH}`}
    />
  );
}
