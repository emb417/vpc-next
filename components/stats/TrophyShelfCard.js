import Link from "next/link";
import PlayerImage from "@/components/player/PlayerImage";

export default function TrophyShelfCard({ icon: Icon, label, windows }) {
  return (
    <div className="flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
        <Icon className="text-orange-600 shrink-0 text-lg" />
        {label}
      </div>
      <div className="flex flex-row gap-2 justify-around items-center flex-1 w-full">
        {windows.map(({ label: winLabel, player, sub }) => (
          <div
            key={winLabel}
            className="flex flex-col items-center gap-1 w-1/2 min-w-0"
          >
            <span className="text-stone-500 text-xs">{winLabel}</span>
            {player ? (
              <Link
                href={`/player/${player.username}`}
                className="flex flex-col items-center gap-1 hover:text-orange-300 transition-colors min-w-0 w-full"
              >
                <PlayerImage
                  src={player.userAvatarUrl}
                  alt={player.username}
                  width={32}
                  height={32}
                  className="rounded-full shrink-0"
                />
                <span className="text-stone-100 text-xs font-semibold truncate w-full text-center leading-none">
                  {player.username}
                </span>
                <span className="text-orange-500 text-xs shrink-0 text-center">
                  {sub(player)}
                </span>
              </Link>
            ) : (
              <span className="text-stone-600 text-xs text-center">
                Not enough data
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
