import Image from "next/image";

export default function LeaderboardTitleCard({
  imageUrl,
  table,
  weekNumber,
  width = 292,
  height = 292,
  periodStart,
  periodEnd,
  highlighted = false,
}) {
  return (
    <div className={`relative mb-2 ${!highlighted || "text-orange-300"} text-center`}>
      <Image
        src={
          imageUrl ??
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAAA3CAQAAADqUq/mAAAAO0lEQVR42u3OAQ0AAAgDoD+51a3hHCSgmRxTJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSWlF6UFKOkbgXVWTUoAAAAASUVORK5CYII="
        }
        width={imageUrl ? width : 292}
        height={imageUrl ? height : 220}
        alt={table}
        className="border-2 border-orange-950 rounded-xl opacity-50"
      />
      <div className="absolute bottom-0 rounded-xl m-1 w-[284px]">
        <div className="text-sm">Week #{weekNumber}</div>
        {periodStart && periodEnd && periodStart !== "0NaN-aN-aN" && (
          <div className="text-sm">
            {new Date(periodStart).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            {" to "}
            {new Date(periodEnd).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        )}
        <div className="text-xl">{table}</div>
      </div>
    </div>
  );
}
