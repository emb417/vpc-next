import CompetitionLeaderboards from "@/components/competition/CompetitionLeaderboards";
import { fetchWithLogging } from "@/lib/fetchWithLogging";
import { logEvent } from "@/lib/logger";

async function getData(searchTerm, week) {
  const overallStart = Date.now();

  logEvent({
    type: "competition_dashboard_start",
    week,
    searchTerm,
  });

  try {
    let url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_COMPETITION_WEEKS}`;
    if (week) url += `?week=${week}`;
    else if (searchTerm) {
      url += `?searchTerm=${searchTerm}`;
    }

    const response = await fetchWithLogging(
      url,
      { cache: "no-store" },
      "getCompetitionWeeks",
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
        type: "competition_dashboard_unexpected_shape",
        raw,
      });
    }

    logEvent({
      type: "competition_dashboard_complete",
      durationMs: Date.now() - overallStart,
    });

    return { props: { scoresData, totalCount } };
  } catch (error) {
    logEvent({
      type: "competition_dashboard_error",
      error: error.message,
    });
    return { props: { scoresData: [], totalCount: 0 } };
  }
}

export default async function CompetitionDashboard({ searchTerm, week }) {
  const { props } = await getData(searchTerm, week);
  const { scoresData, totalCount } = props;
  return (
    <CompetitionLeaderboards
      scoresData={scoresData}
      totalCount={totalCount}
      weeksPageAPI={`${process.env.CSR_BASE_URL}${process.env.VPC_API_COMPETITION_WEEKS}`}
      tableImagesAPI={`${process.env.CSR_BASE_URL}${process.env.VPS_API_TABLES_PATH}`}
    />
  );
}
