import LeaderboardStats from "@/lib/LeaderboardStats";
import WeeklyLeaderboard from "@/components/pinball/WeeklyLeaderboard";
import RankLeaderboard from "@/components/pinball/RankLeaderboard";

async function getData() {
  try {
    const response = await fetch(`${process.env.VPC_BASE_URL}${process.env.VPC_API_PATH}`, {
      next: { revalidate: 300 },
    });
    
    const data = await response.json();

    const { rankedPlayers, positionWeeksData } = LeaderboardStats(data);

    return {
      props: {
        rankedPlayers,
        positionWeeksData,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: { message: "Server Error" } };
  }
}

export default async function Leaderboards() {
  const { props } = await getData();
  const { rankedPlayers, positionWeeksData } = props;
  return (
    <div className="grid grid-cols-12 gap-8 mb-14 max-w-5xl">
      <div className="col-span-12 sm:col-span-6">
        <WeeklyLeaderboard weekData={positionWeeksData[0]} />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <RankLeaderboard rankedPlayers={rankedPlayers} />
      </div>
    </div>
  );
}
