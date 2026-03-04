import SeasonDetails from "@/components/season/SeasonDetails";
import SeasonStats from "@/lib/SeasonStats";
import { fetchWithLogging } from "@/lib/fetchWithLogging";
import { logEvent } from "@/lib/logger";

async function getData(season) {
  const overallStart = Date.now();

  logEvent({
    type: "season_dashboard_getData_start",
    season,
  });

  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_SEASON_WEEKS}?season=${season}`;

    const response = await fetchWithLogging(
      url,
      { cache: "no-store" },
      "getSeasonWeeks",
    );

    if (!response.ok) {
      throw new Error(`Upstream error ${response.status}`);
    }

    const data = await response.json();
    const seasonWeeksData = SeasonStats(data);

    logEvent({
      type: "season_dashboard_getData_complete",
      season,
      durationMs: Date.now() - overallStart,
    });

    return seasonWeeksData;
  } catch (error) {
    logEvent({
      type: "season_dashboard_getData_error",
      season,
      error: error.message,
    });
    return [];
  }
}

async function getSeasons() {
  const overallStart = Date.now();

  logEvent({ type: "season_dashboard_getSeasons_start" });

  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_SEASONS}`;

    const response = await fetchWithLogging(
      url,
      { cache: "no-store" },
      "getSeasons",
    );

    if (!response.ok) {
      throw new Error(`Upstream error ${response.status}`);
    }

    const data = await response.json();

    logEvent({
      type: "season_dashboard_getSeasons_complete",
      durationMs: Date.now() - overallStart,
    });

    return data
      .sort((a, b) => Number(b.seasonNumber) - Number(a.seasonNumber))
      .map((season) => ({
        value: season.seasonNumber.toString(),
        label: season.seasonName,
      }));
  } catch (error) {
    logEvent({
      type: "season_dashboard_getSeasons_error",
      error: error.message,
    });
    return [];
  }
}

export default async function SeasonDashboard({ season }) {
  const seasonOptions = await getSeasons();
  const currentSeason = season ?? seasonOptions[0]?.value;
  const weeksData = await getData(currentSeason);

  return (
    <SeasonDetails
      weeksData={weeksData}
      currentSeasonId={currentSeason}
      seasonOptions={seasonOptions}
    />
  );
}
