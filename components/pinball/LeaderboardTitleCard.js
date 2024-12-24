import Image from "next/image";

export default function LeaderboardTitleCard({
  imageUrl,
  table,
  weekNumber,
  width=292,
  height=292,
}) {
  return (
    <div className="relative mb-2">
      <Image
        src={imageUrl}
        width={width}
        height={height}
        alt={table}
        className="border-2 border-orange-950 rounded-xl"
      ></Image>
      <div className="absolute bottom-0 text-center backdrop-blur-sm text-xl rounded-xl m-1">
        <div>Week #{weekNumber}</div>
        <div className="text-xl">{table}</div>
      </div>
    </div>
  );
}
