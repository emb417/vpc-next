import { GiHumanPyramid } from "react-icons/gi";

export default function ParticipationCard({ playersAllTime, players52, players13 }) {
  const stats = [
    { label: "All Time", value: playersAllTime, pct: 100 },
    {
      label: "52 Weeks",
      value: players52,
      pct: Math.round((players52 / playersAllTime) * 100),
    },
    {
      label: "13 Weeks",
      value: players13,
      pct: Math.round((players13 / playersAllTime) * 100),
    },
  ];

  return (
    <div className="flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
        <GiHumanPyramid className="text-orange-600 shrink-0 text-lg" />
        Total Players
      </div>
      <div className="flex flex-col gap-2">
        {stats.map(({ label, value, pct }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <div className="flex flex-row justify-between items-baseline">
              <span className="text-stone-500 text-xs">{label}</span>
              <span className="text-stone-100 text-xs font-semibold">
                {value}{" "}
                <span className="text-stone-600 font-normal">({pct}%)</span>
              </span>
            </div>
            <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-700 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
