import Link from "next/link";
import { Tooltip } from "antd";

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
        <Tooltip
          title={`Posted at ${new Intl.DateTimeFormat(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }
          ).format(new Date(score.posted))} for version ${score.versionNumber}`}
          color="rgba(41, 37, 36, 0.8)"
        >
          <div className="text-orange-300 text-sm">
            {score.postUrl ? (
              <Link
                className="flex justify-left"
                href={score.postUrl}
                target="_blank"
              >
                {score.score.toLocaleString("en-US")}
              </Link>
            ) : (
              <span className="flex justify-left">
                {score.score.toLocaleString("en-US")}
              </span>
            )}
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
