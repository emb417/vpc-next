"use client";

import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

export default function RankListCard({
  icon: Icon,
  label,
  items,
  nameKey,
  totalKey = "totalPlayers",
  weeksKey = "weeks",
  avgKey = "avgPlayers",
}) {
  const [sortCol, setSortCol] = useState(avgKey);
  const [sortDir, setSortDir] = useState("desc");

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortCol(col);
      setSortDir("desc");
    }
  };

  const sorted = [...(items ?? [])]
    .sort((a, b) => {
      const av = Number(a[sortCol]) || 0;
      const bv = Number(b[sortCol]) || 0;
      return sortDir === "desc" ? bv - av : av - bv;
    })
    .slice(0, 5);

  const ColHeader = ({ col, children }) => {
    const active = sortCol === col;
    return (
      <th
        onClick={() => handleSort(col)}
        className={`px-2 py-1.5 text-right cursor-pointer select-none whitespace-nowrap transition-colors
          ${active ? "text-orange-600 dark:text-orange-400" : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"}`}
      >
        <span className="inline-flex items-center gap-0.5 justify-end">
          {children}
          {active ? (
            sortDir === "desc" ? (
              <FaCaretDown className="text-orange-600 dark:text-orange-500 text-xs" />
            ) : (
              <FaCaretUp className="text-orange-600 dark:text-orange-500 text-xs" />
            )
          ) : (
            <FaCaretDown className="text-stone-400 dark:text-stone-600 text-xs" />
          )}
        </span>
      </th>
    );
  };

  return (
    <div className="flex flex-col gap-2 bg-stone-200 dark:bg-stone-900 border border-orange-500 dark:border-orange-950 rounded-xl px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 text-xs uppercase tracking-wider">
        <Icon className="text-orange-600 shrink-0 text-lg" />
        {label}
      </div>

      {sorted.length === 0 ? (
        <span className="text-stone-500 dark:text-stone-600 text-xs">
          Not enough data
        </span>
      ) : (
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-300 dark:border-stone-800">
              <th className="px-2 py-1.5 text-left text-stone-500 font-normal w-full">
                Name
              </th>
              <ColHeader col={totalKey}>Players</ColHeader>
              <ColHeader col={weeksKey}>Weeks</ColHeader>
              <ColHeader col={avgKey}>Avg</ColHeader>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item, i) => (
              <tr
                key={item[nameKey]}
                className="border-b border-stone-300/50 dark:border-stone-800/50 hover:bg-stone-300/40 dark:hover:bg-stone-800/40 transition-colors"
              >
                <td className="px-2 py-1.5 flex items-center gap-1.5 min-w-0">
                  <span className="text-orange-600 shrink-0 w-4">{i + 1}.</span>
                  <span className="text-stone-800 dark:text-stone-100 font-semibold truncate">
                    {item[nameKey]}
                  </span>
                </td>
                <td
                  className={`px-2 py-1.5 text-right tabular-nums ${sortCol === totalKey ? "text-orange-600 dark:text-orange-400 font-semibold" : "text-stone-600 dark:text-stone-400"}`}
                >
                  {Number(item[totalKey]).toLocaleString()}
                </td>
                <td
                  className={`px-2 py-1.5 text-right tabular-nums ${sortCol === weeksKey ? "text-orange-600 dark:text-orange-400 font-semibold" : "text-stone-600 dark:text-stone-400"}`}
                >
                  {item[weeksKey]}
                </td>
                <td
                  className={`px-2 py-1.5 text-right tabular-nums ${sortCol === avgKey ? "text-orange-600 dark:text-orange-400 font-semibold" : "text-stone-600 dark:text-stone-400"}`}
                >
                  {item[avgKey]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
