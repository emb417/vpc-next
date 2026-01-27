import SeasonDetails from "@/components/season/SeasonDetails";
import SeasonStats from "@/lib/SeasonStats";

async function getData(season) {
  try {
    const response = await fetch(
      `${process.env.SSR_BASE_URL}${process.env.VPC_API_SEASON_WEEKS}?season=${season}`,
      {
        next: { revalidate: 3600 },
      },
    );
    const data = await response.json();

    const seasonWeeksData = SeasonStats(data);

    return {
      props: {
        weeksData: seasonWeeksData,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: { message: "Server Error" } };
  }
}

export default async function SeasonDashboard({ season = "5" }) {
  const { props } = await getData(season);
  const { weeksData } = props;

  return <SeasonDetails weeksData={weeksData} />;
}
