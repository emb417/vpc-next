import Link from "next/link";
import Image from "next/image";

export default function SeasonLeaderboardItems({ username, data, index }) {
  return (
    <Link
      href={`/player/${username}`}
      className={`flex items-center gap-2 mb-1 text-stone-50 justify-left rounded-full pr-2 w-full ${
        index % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
      } hover:bg-stone-700 duration-300`}
    >
      <div className="flex items-center gap-2">
        {data.scores.find((score) => score.username === username)
          .userAvatarUrl ? (
          <Image
            src={
              data.scores.find((score) => score.username === username)
                .userAvatarUrl
            }
            width={32}
            height={32}
            alt={username}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-orange-950" />
        )}
      </div>
      <div className="truncate">
        <span className="text-orange-300 pr-1">
          {
            data.scores.find((score) => score.username === username)
              .seasonPosition
          }
          .
        </span>
        <span className="text-gray-50">{username}</span>
      </div>
      <div className="ml-auto mr-1 flex flex-row items-center gap-4">
        <div className="text-xs text-orange-300">
          {
            data.scores.find((score) => score.username === username)
              .seasonWinPercentage
          }
          %
        </div>
        <div className="mr-1 text-xl text-center min-w-[24px]">
          {
            data.scores.find((score) => score.username === username)
              .cumulativePoints
          }
        </div>
      </div>
    </Link>
  );
}
