import SeasonLeaderboardItem from "@/components/pinball/SeasonLeaderboardItem";

export default function SeasonLeaderboard({ weeksData }) {
  const data = weeksData[0];
  const players = data.scores.map((user) => user.username);

  return (
    <div className="flex flex-wrap items-center justify-center">
      <div className="flex mb-2 text-xl text-stone-50">
        Season {data.season} - Week {data.currentSeasonWeekNumber}
      </div>
      {players.map((username, index) => (
      <SeasonLeaderboardItem key={username} username={username} data={data} index={index} />
      ))}
    </div>
  );
}
