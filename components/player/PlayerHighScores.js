"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import CopyButton from "../shared/CopyButton";
import { Input } from "antd";

const formatDate = (date) => {
  const parts = new Intl.DateTimeFormat(undefined, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")} ${get("month")}/${get("day")}/${get("year")}`;
};

export default function PlayerHighScores({ highScores }) {
  const [sortCol, setSortCol] = useState("posted");
  const [sortDir, setSortDir] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortCol(col);
      setSortDir("desc");
    }
  };

  const filteredHighScores = useMemo(() => {
    return highScores.filter((score) =>
      score.tableName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [highScores, searchTerm]);

  const sortedHighScores = useMemo(() => {
    const sortableScores = [...filteredHighScores];
    if (!sortCol) return sortableScores;

    return sortableScores.sort((a, b) => {
      let av, bv;

      if (sortCol === "posted") {
        av = new Date(a[sortCol]).getTime();
        bv = new Date(b[sortCol]).getTime();
      } else if (sortCol === "score" || sortCol === "rank") {
        av = Number(a[sortCol]) || 0;
        bv = Number(b[sortCol]) || 0;
      } else {
        av = a[sortCol] || "";
        bv = b[sortCol] || "";
      }

      if (sortDir === "desc") {
        return typeof av === "string" ? bv.localeCompare(av) : bv - av;
      } else {
        return typeof av === "string" ? av.localeCompare(bv) : av - bv;
      }
    });
  }, [filteredHighScores, sortCol, sortDir]);

  const SortableColHeader = ({
    col,
    children,
    width = "auto",
    align = "right",
  }) => {
    const active = sortCol === col;
    const alignmentClass = align === "left" ? "text-left" : "text-right";
    return (
      <th
        onClick={() => handleSort(col)}
        className={`px-2 py-1.5 ${alignmentClass} cursor-pointer select-none whitespace-nowrap transition-colors sticky top-0 z-10 bg-stone-950
          ${active ? "text-orange-400" : "text-stone-500 hover:text-stone-300"}`}
        style={{ width }}
      >
        <span
          className={`inline-flex items-center gap-0.5 ${align === "left" ? "justify-start" : "justify-end"} w-full`}
        >
          {children}
          {active ? (
            sortDir === "desc" ? (
              <FaCaretDown className="text-orange-500 text-xs" />
            ) : (
              <FaCaretUp className="text-orange-500 text-xs" />
            )
          ) : (
            <FaCaretDown className="text-stone-600 text-xs" />
          )}
        </span>
      </th>
    );
  };

  const StaticColHeader = ({ children, width = "auto", align = "right" }) => {
    const alignmentClass = align === "left" ? "text-left" : "text-right";
    return (
      <th
        className={`px-2 py-1.5 ${alignmentClass} text-stone-500 font-normal whitespace-nowrap sticky top-0 z-10 bg-stone-950`}
        style={{ width }}
      >
        {children}
      </th>
    );
  };

  if (!highScores || highScores.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-full items-start gap-1 border-2 border-orange-950 rounded-xl px-2 py-1">
      <div className="flex w-full items-center h-[38px]">
        <div className="flex items-center text-lg lg:text-xl  text-stone-200 pl-1">
          <Link href="/highscores">High Score Corner</Link>
        </div>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by table name"
          allowClear
          size="small"
          className="ml-auto w-48"
          suffix={
            <span className="text-xs text-stone-500">
              {filteredHighScores.length === highScores.length
                ? `${highScores.length} Total`
                : `${filteredHighScores.length}/${highScores.length} Filtered`}
            </span>
          }
        />
      </div>
      <hr className="w-full pb-1 border-1 border-orange-950" />
      <div
        id="highScoresTableContainer"
        className="flex flex-col w-full overflow-x-auto"
      >
        <div className="w-full h-[240px] md:h-[360px] xl:h-[480px] overflow-y-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-800">
                <SortableColHeader col="posted" width="104px">
                  Date
                </SortableColHeader>
                <SortableColHeader col="rank" width="60px">
                  Rank
                </SortableColHeader>
                <SortableColHeader col="tableName" align="left">
                  Table Name
                </SortableColHeader>
                <StaticColHeader width="70px">Version</StaticColHeader>
                <StaticColHeader width="120px" align="left">
                  Author
                </StaticColHeader>
                <StaticColHeader width="100px">VPS ID</StaticColHeader>
                <SortableColHeader col="score" width="100px">
                  Score
                </SortableColHeader>
              </tr>
            </thead>
            <tbody>
              {sortedHighScores.map((score, i) => (
                <tr
                  key={`${score.tableName}-${score.versionNumber}-${score.authorName}`}
                  className="border-b border-stone-800/50 hover:bg-stone-800/40 transition-colors"
                >
                  <td
                    className={`px-2 py-1.5 text-center tabular-nums ${sortCol === "posted" ? "text-orange-400 font-semibold" : "text-stone-400"}`}
                  >
                    {formatDate(new Date(score.posted))}
                  </td>
                  <td
                    className={`px-2 py-1.5 text-center tabular-nums ${sortCol === "rank" ? "text-orange-400 font-semibold" : "text-stone-400"}`}
                  >
                    <span className="text-lg lg:text-xl">{score.rank}</span>
                  </td>
                  <td className="px-2 py-1.5 max-w-0 text-left">
                    <Link
                      href={`/highscores?vpsId=${encodeURIComponent(score.vpsId)}`}
                      className="text-stone-200 lg:text-lg block hover:text-orange-400"
                      title={score.tableName}
                    >
                      <span className="block truncate" title={score.authorName}>
                        {score.tableName}
                      </span>
                    </Link>
                  </td>
                  <td className="px-2 py-1.5 text-right tabular-nums text-stone-400">
                    {score.versionNumber}
                  </td>
                  <td className="px-2 py-1.5 text-left text-stone-400 max-w-0">
                    <span className="block truncate" title={score.authorName}>
                      {score.authorName}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-right text-stone-400">
                    <div className="flex flex-row justify-end items-center gap-1">
                      <span className="text-xs" title={score.vpsId}>
                        {score.vpsId}
                      </span>
                      <CopyButton text={score.vpsId} label="VPS ID" />
                    </div>
                  </td>
                  <td
                    className={`px-2 py-1.5 text-right lg:text-lg tabular-nums ${sortCol === "score" ? "text-orange-400 font-semibold" : "text-stone-400"}`}
                  >
                    {score.score.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
