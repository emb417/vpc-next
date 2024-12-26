import Image from "next/image";

export default function LeaderboardTitleCard({
  imageUrl,
  table,
  width = 292,
  height = 292,
  highlighted = false,
  priority = false,
  loading,
  children,
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
        priority={priority}
        loading={loading}
        className="border-2 border-orange-950 rounded-xl opacity-50"
      />
      <div className="absolute bottom-0 rounded-xl m-1 w-[284px]">
        {children}
      </div>
    </div>
  );
}
