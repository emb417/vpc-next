import SeasonChart from "@/components/season/SeasonChart";
import SeasonLeaderboard from "@/components/season/SeasonLeaderboard";
import SeasonStats from "@/lib/SeasonStats";

async function getData() {
  try {
    const response = await fetch(`${process.env.VPC_BASE_URL}${process.env.VPC_API_PATH}`, {
      next: { revalidate: 3600 },
    });
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

export default async function SeasonDashboard() {
  const { props } = await getData();
  const { weeksData } = props;
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
