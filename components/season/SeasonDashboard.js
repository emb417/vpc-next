import SeasonChart from "@/components/season/SeasonChart";
import SeasonLeaderboard from "@/components/season/SeasonLeaderboard";
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

  if (!weeksData || weeksData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 w-full text-stone-200">
        No data found for Season {season}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 mb-14 py-2 gap-4 w-full">
      <div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 xl:col-span-3">
        <SeasonLeaderboard weeksData={weeksData} />
      </div>
      <div className="invisible sm:visible col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-9">
        <SeasonChart weeksData={weeksData} />
      </div>
    </div>
  );
}
