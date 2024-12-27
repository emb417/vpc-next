import Link from "next/link";

export default function HighScoresLeaderboardItem({ score, scoreIndex }) {
  return (
    <div
      className={`flex items-center gap-2 justify-left rounded-full pr-1 w-full ${
        scoreIndex % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
      } hover:bg-stone-700 duration-300`}
    >
      <div className="flex items-center pl-2 text-orange-300">
        {scoreIndex + 1}.
      </div>
      <Link
        className="flex justify-left"
        href={`/player/${score.user.username}`}
      >
        <div className="flex items-center truncate">{score.user.username}</div>
      </Link>
      <div className="ml-auto mr-1 flex gap-2 flex-row items-center">
        <div className="text-orange-300 text-sm">
          <Link
            className="flex justify-left"
            href={score.postUrl}
            target="_blank"
          >
            {score.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Link>
        </div>
        <div className="text-sm text-stone-400">v{score.versionNumber}</div>
      </div>
    </div>
  );
}
