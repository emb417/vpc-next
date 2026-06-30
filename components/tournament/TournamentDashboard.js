import TournamentLeaderboards from "@/components/tournament/TournamentLeaderboards";
import { fetchWithLogging } from "@/lib/fetchWithLogging";
import { logEvent } from "@/lib/logger";

async function getData(searchTerm) {
  const overallStart = Date.now();

  logEvent({ type: "tournament_dashboard_start", searchTerm });

  try {
    let url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_TOURNAMENTS}?limit=10`;
    if (searchTerm) url += `&searchTerm=${encodeURIComponent(searchTerm)}`;

    const response = await fetchWithLogging(
      url,
      { cache: "no-store" },
      "getTournaments",
    );

    if (!response.ok) {
      throw new Error(`Upstream error ${response.status}`);
    }

    const raw = await response.json();

    let results = [];
    let totalCount = 0;

    if (Array.isArray(raw) && raw.length > 0) {
      results = raw[0].results ?? [];
      totalCount = Number(raw[0].totalCount ?? results.length);
    } else {
      logEvent({ type: "tournament_dashboard_unexpected_shape", raw });
    }

    logEvent({
      type: "tournament_dashboard_complete",
      durationMs: Date.now() - overallStart,
    });

    return { results, totalCount };
  } catch (error) {
    logEvent({ type: "tournament_dashboard_error", error: error.message });
    return { results: [], totalCount: 0 };
  }
}

export default async function TournamentDashboard({ searchTerm }) {
  const { results, totalCount } = await getData(searchTerm);
  return (
    <TournamentLeaderboards
      tournaments={results}
      totalCount={totalCount}
      tournamentsPageAPI={`${process.env.CSR_BASE_URL}${process.env.VPC_API_TOURNAMENTS}`}
    />
  );
}
