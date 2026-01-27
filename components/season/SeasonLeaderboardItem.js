import Link from "next/link";
import Image from "next/image";

export default function SeasonLeaderboardItems({ username, data, index }) {
  return (
    <Link
      href={`/player/${username}`}
      className={`flex items-center gap-2 mb-1 justify-left rounded-full px-2 w-full ${
        index % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
      } hover:bg-stone-700 duration-300`}
    >
      <span className="text-orange-300">
        {
          data.scores.find((score) => score.username === username)
            .seasonPosition
        }
        .
      </span>
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
            unoptimized
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-orange-950" />
        )}
      </div>
      <span className="text-stone-200">{username}</span>
      <div className="ml-auto mr-1 flex flex-row items-center gap-4">
        <div className="text-sm text-orange-300">
          {
            data.scores.find((score) => score.username === username)
              .seasonWinPercentage
          }
          %
        </div>
        <div className="min-w-[24px] mr-1 text-xl text-center text-stone-100">
          {
            data.scores.find((score) => score.username === username)
              .cumulativePoints
          }
        </div>
      </div>
    </Link>
  );
}
