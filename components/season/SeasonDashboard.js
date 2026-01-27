import SeasonDetails from "@/components/season/SeasonDetails";
import SeasonStats from "@/lib/SeasonStats";

async function getData(season) {
  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_SEASON_WEEKS}?season=${season}`;
    console.log(`🚀 Req ${url}`);

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    console.log(
      `${response.ok ? "✅" : "❌"} Resp ${response.status} ${response.headers.get("Date")} `,
    );

    const data = await response.json();

    const seasonWeeksData = SeasonStats(data);

    return {
      props: {
        weeksData: seasonWeeksData,
      },
    };
  } catch (error) {
    console.error("SSR getData error:", error);
    return { props: { weeksData: [] } };
  }
}

export default async function SeasonDashboard({ season = "5" }) {
  const { props } = await getData(season);
  const { weeksData } = props;

  return <SeasonDetails weeksData={weeksData} />;
}
