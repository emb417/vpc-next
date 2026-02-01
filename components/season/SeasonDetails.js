import SeasonDropdown from "@/components/season/SeasonDropdown";
import SeasonLeaderboard from "@/components/season/SeasonLeaderboard";
import SeasonChart from "@/components/season/SeasonChart";

export default async function SeasonDetails({ weeksData }) {
  return (
    <div className="grid grid-cols-12 mb-14 py-2 gap-4 w-full">
      <div className="col-span-12 flex items-center gap-2 mb-2 text-xl text-stone-200">
        <SeasonDropdown currentSeason={weeksData[0].season} />
        <span className="font-bold">
          Week {weeksData[0].currentSeasonWeekNumber}
        </span>
      </div>
      <div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 xl:col-span-3">
        <SeasonLeaderboard weeksData={weeksData} />
      </div>
      <div className="invisible sm:visible col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-9">
        <SeasonChart weeksData={weeksData} />
      </div>
    </div>
  );
}
