import Link from "next/link";
import PlayerImage from "@/components/player/PlayerImage";

export default function AwardCard({ icon: Icon, label, players, sub }) {
  if (!players?.length) return null;
  return (
    <div className="flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5 h-full">
      <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
        <Icon className="text-orange-600 shrink-0 text-lg" />
        {label}
      </div>
      <div className="flex flex-col gap-1">
        {players.map((player, i) => (
          <Link
            key={player.username}
            href={`/player/${player.username}`}
            className="flex items-center gap-1.5 hover:text-orange-300 transition-colors duration-200 min-w-0"
          >
            <span className="text-orange-700 text-xs shrink-0 w-4">
              {i + 1}.
            </span>
            <PlayerImage
              src={player.userAvatarUrl}
              alt={player.username}
              width={16}
              height={16}
              className="rounded-full shrink-0"
            />
            <span className="text-stone-100 text-xs font-semibold truncate leading-none">
              {player.username}
            </span>
            <span className="text-stone-500 text-xs shrink-0 ml-auto">
              {sub(player)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
