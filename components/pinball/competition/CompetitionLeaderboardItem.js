import Link from "next/link";
import PlayerImage from "@/components/pinball/player/PlayerImage";

export default function CompetitionLeaderboardItem({ score, scoreIndex }) {
    return (
        <Link
        href={`/player/${score.username}`}
        className={`flex items-center gap-2 justify-left rounded-full pr-1 w-full ${
          scoreIndex % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
        } hover:bg-stone-700 duration-300`}
      >
        <span className="text-orange-300 pl-2">
          {score.position}.
        </span>
        <div className="flex items-center">
          <PlayerImage
            src={score.userAvatarUrl}
            alt={score.username}
          />
        </div>
        <span className="text-stone-200 truncate">
          {score.username}
        </span>
        <div className="ml-auto mr-1 flex gap-4 flex-row items-center">
          <div className="text-orange-300 text-sm">
            {score.score
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="text-xl text-stone-100">{score.points}</div>
        </div>
      </Link>   
    );
}