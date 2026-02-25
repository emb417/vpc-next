import SeasonDetails from "@/components/season/SeasonDetails";
import SeasonStats from "@/lib/SeasonStats";

async function getData(season) {
  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_SEASON_WEEKS}?season=${season}`;
    console.log(`🚀 Req ${url}`);

    const response = await fetch(url, { cache: "no-store" });

    console.log(
      `${response.ok ? "✅" : "❌"} Resp ${response.status} ${response.headers.get("Date")} `,
    );

    const data = await response.json();
    const seasonWeeksData = SeasonStats(data);

    return seasonWeeksData;
  } catch (error) {
    console.error("SSR getData error:", error);
    return [];
  }
}

async function getSeasons() {
  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_SEASONS}`;
    console.log(`🚀 Req ${url}`);
    const response = await fetch(url, { cache: "no-store" });
    console.log(
      `${response.ok ? "✅" : "❌"} Resp ${response.status} ${response.headers.get("Date")}`,
    );
    const data = await response.json();
    return data
      .sort((a, b) => Number(b.seasonNumber) - Number(a.seasonNumber))
      .map((season) => ({
        value: season.seasonNumber.toString(),
        label: season.seasonName,
      }));
  } catch (error) {
    console.error("SSR getSeasons error:", error);
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
