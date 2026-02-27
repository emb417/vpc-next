import { GiPerson } from "react-icons/gi";
import Sparkline from "./Sparkline";
import TrendIndicator from "./TrendIndicator";

export default function AvgPlayersCard({
  rollingAvg52,
  prevAvg52,
  rollingAvg13,
  prevAvg13,
  counts,
}) {
  const stats = [
    {
      label: "52 Weeks",
      value: rollingAvg52,
      prev: prevAvg52,
      spark: counts.slice(-52),
    },
    {
      label: "13 Weeks",
      value: rollingAvg13,
      prev: prevAvg13,
      spark: counts.slice(-13),
    },
  ];

  return (
    <div className="flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
        <GiPerson className="text-orange-600 shrink-0 text-lg" />
        Avg. Players / Week
      </div>
      <div className="flex flex-col gap-1 w-full">
        {stats.map(({ label, value, prev, spark }) => (
          <div key={label} className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-baseline w-full">
              <span className="text-stone-500 text-xs">{label}</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-stone-100 text-lg font-semibold leading-none">
                  {value}
                </span>
                <TrendIndicator current={value} previous={prev} />
              </div>
            </div>
            <Sparkline
              data={spark}
              tooltipLabel={(v) => ` ${v.toFixed(1)} players`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
