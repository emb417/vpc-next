export default function RankListCard({
  icon: Icon,
  label,
  items,
  nameKey,
  totalKey = "totalPlayers",
  weeksKey = "weeks",
  avgKey = "avgPlayers",
}) {
  return (
    <div className="flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5 col-span-2 xl:col-span-1">
      <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
        <Icon className="text-orange-600 shrink-0 text-lg" />
        {label}
      </div>
      <div className="flex flex-col gap-1">
        {(items ?? []).map((item, i) => (
          <div
            key={item[nameKey]}
            className="flex items-center gap-1.5 min-w-0"
          >
            <span className="text-orange-700 text-xs shrink-0 w-4">
              {i + 1}.
            </span>
            <span className="text-stone-100 text-xs font-semibold truncate flex-1">
              {item[nameKey]}
            </span>
            <span className="text-stone-600 text-xs shrink-0">
              {item[totalKey].toLocaleString()} · {item[weeksKey]}w
            </span>
            <span className="text-stone-500 text-xs shrink-0 ml-2">
              {item[avgKey]} avg
            </span>
          </div>
        ))}
        {!items?.length && (
          <span className="text-stone-600 text-xs">Not enough data</span>
        )}
      </div>
    </div>
  );
}
