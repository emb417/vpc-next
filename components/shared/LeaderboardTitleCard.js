import Image from "next/image";

export default function LeaderboardTitleCard({
  imageUrl,
  table,
  highlighted = false,
  children,
}) {
  return (
    <div
      className={`flex flex-col items-center w-[320px] mb-2 ${!highlighted || "text-orange-300"}`}
    >
      <div className="relative w-[316px] aspect-[3/2] bg-stone-900 rounded-xl border-2 border-orange-500 dark:border-orange-950 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            fill
            alt={table}
            priority={true}
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="mt-2 w-full">{children}</div>
    </div>
  );
}
