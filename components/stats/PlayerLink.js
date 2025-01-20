import Link from "next/link";
import PlayerImage from "@/components/player/PlayerImage";

export default function PlayerLink(text, record) {
  return (
    <Link href={`/player/${text}`} className="hover:text-orange-300">
      <div className="flex items-center">
        <PlayerImage
          src={record.userAvatarUrl}
          alt={record.username}
          width={16}
          height={16}
        />
        <div className="truncate pl-1">{text}</div>
      </div>
    </Link>
  );
}
