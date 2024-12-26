import HighScoresLeaderboards from "@/components/pinball/HighScoresLeaderboards";

async function getData() {
  try {
    const response = await fetch(`${process.env.VPC_BASE_URL}${process.env.VPS_API_SCORES_PATH}`, {
      cache: "no-store",
    });
    const data = await response.json();

    return { props: { data } };
  } catch (error) {
    console.error(error);
    return { props: { message: "Server Error" } };
  }
}

export default async function HistoryDashboard() {
  const { props } = await getData();
  const { data } = props;
  return <HighScoresLeaderboards scoresData={data} tablesAPI={`${process.env.VPC_BASE_URL}${process.env.VPS_API_TABLES_PATH}`} />;
}
