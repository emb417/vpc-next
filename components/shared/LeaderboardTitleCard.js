import Image from "next/image";

export default function LeaderboardTitleCard({
  imageUrl,
  table,
  highlighted = false,
  children,
}) {
  return (
    <div
      className={`relative mb-2 ${!highlighted || "text-orange-300"} text-center`}
    >
      <div className="bg-stone-950 rounded-xl">
        <Image
          src={
            imageUrl ??
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAAA3CAYAAABAW2dtAAAAYElEQVR42u3QIQEAMAgAsNPlCPoHhAY43BZhUfn7sQpJkiRJkiRJkiQkSZIkSZIkSUiSJEmSJEmSJGmQJEmSJEmSJCFJkiRJkiRJQpIkSZIkSZIkCUmSJEmSJEkSkiQdGEMLT3+vKf5nAAAAAElFTkSuQmCC"
          }
          width={imageUrl ? 292 : 292}
          height={imageUrl ? 292 : 220}
          alt={table}
          priority={true}
          className="opacity-50 rounded-xl border-2 border-orange-500 dark:border-orange-950"
        />
      </div>
      <div className="absolute bottom-0 rounded-xl m-1 w-[284px]">
        {children}
      </div>
    </div>
  );
}
