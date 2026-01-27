import SeasonLeaderboardItem from "@/components/season/SeasonLeaderboardItem";
import SeasonDropdown from "@/components/season/SeasonDropdown";

export default function SeasonLeaderboard({ weeksData }) {
  if (!weeksData || weeksData.length === 0) return null;
  const data = weeksData[0];
  const players = data.scores.map((user) => user.username);

  return (
    <div className="flex flex-wrap items-center justify-center">
      <div className="flex items-center gap-2 mb-2 text-xl text-stone-200">
        <SeasonDropdown currentSeason={data.season} />
        <span>Week {data.currentSeasonWeekNumber}</span>
      </div>
      {players.map((username, index) => (
        <SeasonLeaderboardItem
          key={username}
          username={username}
          data={data}
          index={index}
        />
      ))}
    </div>
  );
}
