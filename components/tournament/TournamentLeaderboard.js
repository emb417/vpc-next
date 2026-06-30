import Link from "next/link";
import PlayerImage from "@/components/player/PlayerImage";

const DEFAULT_AVATAR = "https://cdn.discordapp.com/embed/avatars/0.png";

export default function TournamentLeaderboard({ standings }) {
  if (!standings || standings.length === 0) return null;

  return (
    <div className="flex flex-col gap-1 w-full">
      {standings.map((row, index) => (
        <Link
          key={row.username}
          href={`/player/${row.username}`}
          className={`flex items-center gap-2 rounded-full px-2 w-full ${
            index % 2 === 0
              ? "bg-stone-200 dark:bg-stone-900"
              : "bg-stone-300 dark:bg-stone-800"
          } hover:bg-stone-400 dark:hover:bg-stone-700 duration-300`}
        >
          <span className="text-orange-700 dark:text-orange-300">
            {row.position}.
          </span>
          <PlayerImage
            src={row.userAvatarUrl ?? DEFAULT_AVATAR}
            alt={row.username}
            width={26}
            height={26}
          />
          <span className="text-stone-800 dark:text-stone-200 truncate">
            {row.username}
          </span>
          <div className="ml-auto mr-1 flex flex-row items-center gap-4">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {row.tablesPlayed} {row.tablesPlayed === 1 ? "table" : "tables"}
            </span>
            <span className="min-w-[24px] text-xl text-center text-stone-900 dark:text-stone-100">
              {row.points}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
