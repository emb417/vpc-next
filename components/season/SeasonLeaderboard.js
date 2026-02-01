import SeasonLeaderboardItem from "@/components/season/SeasonLeaderboardItem";

export default function SeasonLeaderboard({ weeksData }) {
  if (!weeksData || weeksData.length === 0) return null;
  const data = weeksData[0];
  const players = data.scores.map((user) => user.username);

  return (
    <div className="flex flex-wrap items-center justify-center">
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
