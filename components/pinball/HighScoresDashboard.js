import HighScoresLeaderboards from "@/components/pinball/HighScoresLeaderboards";
import { console } from "inspector";

async function getData() {
  try {
    const vpsResponse = await fetch(
      `${process.env.VPC_BASE_URL}${process.env.VPC_API_SCORES_PATH}`,
      {
        cache: "no-store",
      }
    );
    const data = await vpsResponse.json();

    const vpcResponse = await fetch(
      `${process.env.VPC_BASE_URL}${process.env.VPC_API_PATH}`,
      {
        next: { revalidate: 3600 },
      }
    );
    const vpcData = await vpcResponse.json();

    const vpsIdsByRecency = Array.from(
      new Set(
        vpcData
          .find((obj) => obj.channelName === "competition-corner")
          .weeks.filter((week) => !isNaN(parseInt(week.weekNumber)))
      )
    )
      .sort((a, b) => b.weekNumber - a.weekNumber)
      .map((item) => item.vpsId);

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
      tablesAPI={`${process.env.VPC_BASE_URL}${process.env.VPS_API_TABLES_PATH}`}
    />
  );
}
