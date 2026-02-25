import SeasonDropdown from "@/components/season/SeasonDropdown";
import SeasonLeaderboard from "@/components/season/SeasonLeaderboard";
import SeasonChart from "@/components/season/SeasonChart";

export default async function SeasonDetails({
  weeksData,
  currentSeasonId,
  seasonOptions,
}) {
  const sortedWeeks = [...weeksData].sort(
    (a, b) => a.weekNumber - b.weekNumber,
  );

  const seasonStart = sortedWeeks[0]?.periodStart ?? "—";
  const seasonEnd = sortedWeeks[sortedWeeks.length - 1]?.periodEnd ?? "—";

  return (
    <div className="grid grid-cols-12 mb-14 py-2 gap-4 w-full">
      <div className="col-span-12 flex flex-wrap items-center gap-2 mx-2 text-xl text-stone-200">
        <SeasonDropdown
          currentSeasonId={currentSeasonId.toString()}
          seasonOptions={seasonOptions}
        />
        <span className="font-bold pl-4">
          {seasonStart} to {seasonEnd}
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
