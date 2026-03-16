"use client";

import { useState, useMemo, use } from "react";
import PlayerPane from "@/components/player/PlayerPane";
import { GiPinballFlipper, GiCalendar, GiOctoman } from "react-icons/gi";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

const SortableColHeader = ({
  col,
  children,
  sortCol,
  sortDir,
  handleSort,
  align = "right",
  className = "",
}) => {
  const active = sortCol === col;
  const justifyClass = align === "left" ? "justify-start" : "justify-end";
  return (
    <th
      onClick={() => handleSort(col)}
      className={`px-2 py-1.5 cursor-pointer select-none whitespace-nowrap transition-colors sticky top-0 z-10 bg-stone-100 dark:bg-stone-950 ${className}
        ${active ? "text-orange-600 dark:text-orange-400" : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"}`}
    >
      <span
        className={`inline-flex items-center gap-0.5 ${justifyClass} w-full`}
      >
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

const InsightTable = ({ icon, data, nameKey }) => {
  const [sortCol, setSortCol] = useState("avgRank");
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const sortedData = useMemo(() => {
    const sortableData = [...data];
    if (!sortCol) return sortableData;

    return sortableData.sort((a, b) => {
      let av, bv;

      if (sortCol === "avgRank") {
        av = Number(a.avgRank) || 0;
        bv = Number(b.avgRank) || 0;
      } else if (sortCol === "totalTables") {
        av = Number(a.totalTables) || 0;
        bv = Number(b.totalTables) || 0;
      } else {
        av = a[nameKey] || "";
        bv = b[nameKey] || "";
      }

      if (sortDir === "desc") {
        return typeof av === "string" ? bv.localeCompare(av) : bv - av;
      } else {
        return typeof av === "string" ? av.localeCompare(bv) : av - bv;
      }
    });
  }, [data, sortCol, sortDir, nameKey]);

  const displayedData = useMemo(() => sortedData, [sortedData]);

  if (data.length === 0) return null;

  return (
    <div className="flex flex-col w-full items-start gap-1">
      <div className="flex flex-col w-full overflow-x-auto">
        <div className="w-full h-[150px] overflow-y-auto">
          <table className="w-full text-xs border-collapse table-fixed">
            <colgroup>
              <col />
              <col style={{ width: "6rem" }} />
              <col style={{ width: "7rem" }} />
            </colgroup>
            <thead>
              <tr className="border-b border-stone-300 dark:border-stone-800">
                <SortableColHeader
                  col={nameKey}
                  sortCol={sortCol}
                  sortDir={sortDir}
                  handleSort={handleSort}
                  align="left"
                >
                  {nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
                </SortableColHeader>
                <SortableColHeader
                  col="avgRank"
                  sortCol={sortCol}
                  sortDir={sortDir}
                  handleSort={handleSort}
                  align="right"
                >
                  Avg Rank
                </SortableColHeader>
                <SortableColHeader
                  col="totalTables"
                  sortCol={sortCol}
                  sortDir={sortDir}
                  handleSort={handleSort}
                  align="right"
                >
                  Total Tables
                </SortableColHeader>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item) => (
                <tr
                  key={item[nameKey]}
                  className="border-b border-stone-300/50 dark:border-stone-800/50 hover:bg-stone-200/40 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <td className="px-2 py-1.5 text-left text-stone-800 dark:text-stone-200 xl:text-lg truncate">
                    {item[nameKey]}
                  </td>
                  <td
                    className={`px-2 py-1.5 text-right tabular-nums ${sortCol === "avgRank" ? "text-orange-600 dark:text-orange-400 font-semibold" : "text-stone-500 dark:text-stone-400"}`}
                  >
                    P{item.avgRank.toFixed(1)}
                  </td>
                  <td
                    className={`px-2 py-1.5 text-right tabular-nums ${sortCol === "totalTables" ? "text-orange-600 dark:text-orange-400 font-semibold" : "text-stone-500 dark:text-stone-400"}`}
                  >
                    {item.totalTables}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function PlayerHighScoreInsights({ highScores, vpsLookup }) {
  if (!highScores || highScores.length === 0) return null;

  const aggregatedStats = highScores.reduce(
    (acc, score) => {
      const designer = vpsLookup[score.vpsId]?.designer;
      const maker = vpsLookup[score.vpsId]?.maker;
      const year = vpsLookup[score.vpsId]?.year;

      if (designer) {
        if (!acc.designers[designer]) {
          acc.designers[designer] = {
            designer,
            totalRank: 0,
            count: 0,
            uniqueTables: new Set(),
          };
        }
        acc.designers[designer].totalRank += score.rank;
        acc.designers[designer].count += 1;
        acc.designers[designer].uniqueTables.add(score.vpsId);
      }

      if (maker) {
        if (!acc.manufacturers[maker]) {
          acc.manufacturers[maker] = {
            maker,
            totalRank: 0,
            count: 0,
            uniqueTables: new Set(),
          };
        }
        acc.manufacturers[maker].totalRank += score.rank;
        acc.manufacturers[maker].count += 1;
        acc.manufacturers[maker].uniqueTables.add(score.vpsId);
      }

      if (year) {
        const era =
          year < 1980
            ? "Pre-1980"
            : year < 1990
              ? "1980s"
              : year < 2000
                ? "1990s"
                : year < 2010
                  ? "2000s"
                  : year < 2020
                    ? "2010s"
                    : "2020s";
        if (!acc.eras[era]) {
          acc.eras[era] = {
            era,
            totalRank: 0,
            count: 0,
            uniqueTables: new Set(),
          };
        }
        acc.eras[era].totalRank += score.rank;
        acc.eras[era].count += 1;
        acc.eras[era].uniqueTables.add(score.vpsId);
      }

      return acc;
    },
    { designers: {}, manufacturers: {}, eras: {} },
  );

  const topDesigners = Object.values(aggregatedStats.designers)
    .map((d) => ({
      ...d,
      avgRank: d.totalRank / d.count,
      totalTables: d.uniqueTables.size,
    }))
    .sort((a, b) => b.totalTables - a.totalTables);

  const topManufacturers = Object.values(aggregatedStats.manufacturers)
    .map((m) => ({
      ...m,
      avgRank: m.totalRank / m.count,
      totalTables: m.uniqueTables.size,
    }))
    .sort((a, b) => b.totalTables - a.totalTables);

  const topEras = Object.values(aggregatedStats.eras)
    .map((e) => ({
      ...e,
      avgRank: e.totalRank / e.count,
      totalTables: e.uniqueTables.size,
    }))
    .sort((a, b) => b.totalTables - a.totalTables);

  return (
    <div className="flex flex-col w-full text-stone-800 dark:text-stone-200 gap-4">
      <PlayerPane title="Designers by High Scores">
        <InsightTable
          icon={<GiOctoman className="text-orange-600 shrink-0 text-lg" />}
          data={topDesigners}
          nameKey="designer"
        />
      </PlayerPane>
      <PlayerPane title="Manufacturers by High Scores">
        <InsightTable
          icon={
            <GiPinballFlipper className="text-orange-600 shrink-0 text-lg" />
          }
          data={topManufacturers}
          nameKey="maker"
        />
      </PlayerPane>
      <PlayerPane title="Eras by High Scores">
        <InsightTable
          icon={<GiCalendar className="text-orange-600 shrink-0 text-lg" />}
          data={topEras}
          nameKey="era"
        />
      </PlayerPane>
    </div>
  );
}
