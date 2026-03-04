import HighScoresLeaderboards from "@/components/highscores/HighScoresLeaderboards";
import { fetchWithLogging } from "@/lib/fetchWithLogging";
import { logEvent } from "@/lib/logger";

async function getData() {
  const overallStart = Date.now();

  logEvent({ type: "highscores_dashboard_start" });

  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_TABLES}?limit=4&offset=0`;

    const response = await fetchWithLogging(
      url,
      { next: { revalidate: 300 } },
      "getRecentTables",
    );

    if (!response.ok) {
      throw new Error(`Upstream error ${response.status}`);
    }

    const raw = await response.json();

    let scoresData = [];
    let totalCount = 0;

    if (Array.isArray(raw) && raw.length > 0) {
      scoresData = raw[0].results;
      totalCount = Number(raw[0].totalCount ?? scoresData.length);
    } else {
      logEvent({
        type: "highscores_dashboard_unexpected_shape",
        raw,
      });
    }

    logEvent({
      type: "highscores_dashboard_complete",
      durationMs: Date.now() - overallStart,
    });

    return { props: { scoresData, totalCount } };
  } catch (error) {
    logEvent({
      type: "highscores_dashboard_error",
      error: error.message,
    });
    return { props: { scoresData: [], totalCount: 0 } };
  }
}

export default async function HighScoresDashboard() {
  const { props } = await getData();
  const { scoresData, totalCount } = props;

  return (
    <HighScoresLeaderboards
      scoresData={scoresData}
      totalCount={totalCount}
      tablesPageAPI={`${process.env.CSR_BASE_URL}${process.env.VPC_API_RECENT_TABLES}`}
      tableImagesAPI={`${process.env.CSR_BASE_URL}${process.env.VPS_API_TABLES_PATH}`}
    />
  );
}
