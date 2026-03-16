"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { GiPreviousButton, GiNextButton, GiHighFive } from "react-icons/gi";
import { Input } from "antd";
import Loading from "@/app/loading";
import LeaderboardTitleCard from "@/components/shared/LeaderboardTitleCard";
import LeaderboardTitleCardContent from "@/components/shared/LeaderboardTitleCardContent";
import HighScoresLeaderboardItem from "@/components/highscores/HighScoresLeaderboardItem";

const truncate = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

export default function HighScoresLeaderboards({
  scoresData = [],
  totalCount = 0,
  tablesPageAPI,
  initialSearchTerm = "",
  initialVpsId = "",
}) {
  const tablesPerPage = 4;
  const [page, setPage] = useState(1);
  const [tables, setTables] = useState(scoresData);
  const [count, setCount] = useState(totalCount);
  const [loading, setLoading] = useState(false);
  const scrollableDivRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState(initialSearchTerm);
  const [vpsId, setVpsId] = useState(initialVpsId);
  const [debouncedVpsId, setDebouncedVpsId] = useState(initialVpsId);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedVpsId(vpsId);
    }, 500);
    return () => clearTimeout(timerId);
  }, [vpsId]);

  const totalPages = Math.max(1, Math.ceil(count / tablesPerPage));

  function unwindResponseShape(raw) {
    if (!raw) return { results: [], totalCount: 0 };
    return {
      results: raw[0].results ?? [],
      totalCount: Number(raw[0].totalCount ?? 0),
    };
  }

  useEffect(() => {
    const loadPage = async () => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        setTables(Array.isArray(scoresData) ? scoresData : []);
        setCount(Number.isFinite(Number(totalCount)) ? Number(totalCount) : 0);
        return;
      }

      if (page === 1 && !debouncedSearchTerm && !debouncedVpsId) {
        setTables(Array.isArray(scoresData) ? scoresData : []);
        setCount(Number.isFinite(Number(totalCount)) ? Number(totalCount) : 0);
        return;
      }

      setLoading(true);
      const offset = (page - 1) * tablesPerPage;
      let url = `${tablesPageAPI}?limit=${tablesPerPage}&offset=${offset}`;
      if (debouncedSearchTerm) {
        url += `&searchTerm=${encodeURIComponent(debouncedSearchTerm)}`;
      }
      if (debouncedVpsId) {
        url += `&vpsId=${encodeURIComponent(debouncedVpsId)}`;
      }

      try {
        const res = await fetch(url);
        const raw = await res.json();
        const { results: nextResults, totalCount: nextTotal } =
          unwindResponseShape(raw);
        setTables(nextResults);
        setCount(nextTotal);
      } catch (err) {
        console.error("HighScoresLeaderboards loadPage error:", err);
        setTables([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [
    page,
    tablesPageAPI,
    scoresData,
    totalCount,
    debouncedSearchTerm,
    debouncedVpsId,
  ]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, debouncedVpsId]);

  return (
    <div className="flex flex-col flex-grow w-full max-h-dvh">
      {/* ── Header ── */}
      <div className="flex flex-row w-full items-center justify-start py-2">
        <h1 className="flex flex-row items-center gap-1 text-lg text-stone-800 dark:text-stone-200">
          <GiHighFive />
          High Score Corner
        </h1>

        <div className="flex flex-row items-center ml-auto gap-4">
          <div className="hidden lg:flex w-[230px] items-center mx-auto">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for table name"
              allowClear
              size="small"
            />
          </div>
          <div className="flex flex-row items-center gap-2 text-stone-800 dark:text-stone-200">
            <button
              className="p-1 rounded-lg bg-orange-100 dark:bg-orange-900 text-xs hover:bg-orange-300 dark:hover:bg-orange-700 duration-300"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
            >
              <GiPreviousButton className="text-xl" />
            </button>
            <span className="min-w-[max-content] text-xs text-center">
              Page {page} of {Number.isFinite(totalPages) ? totalPages : 1}
            </span>
            <button
              className="p-1 rounded-lg bg-orange-100 dark:bg-orange-900 text-xs hover:bg-orange-300 dark:hover:bg-orange-700 duration-300"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loading}
            >
              <GiNextButton className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile search ── */}
      <div className="lg:hidden flex w-full justify-center items-center pl-2 pb-3 text-stone-800 dark:text-stone-200">
        <div className="flex flex-row items-center w-[190px]">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for table name"
            allowClear
            size="small"
          />
        </div>
      </div>

      {/* ── Leaderboard columns ── */}
      <div
        ref={scrollableDivRef}
        className="flex flex-row w-full gap-2 text-stone-800 dark:text-stone-200 pb-2 mb-2 border-b-2 border-orange-500 dark:border-orange-950 overflow-auto"
      >
        <div className="flex flex-row gap-2 mx-auto">
          {loading ? (
            <Loading />
          ) : (
            (tables ?? []).map((table) => {
              const id = table.vpsId;
              const key = `${id}-${table.tableName}-${table.versionNumber}`;

              return (
                <div
                  className="flex flex-col gap-1 items-center"
                  key={key}
                  id={key}
                >
                  <LeaderboardTitleCard
                    table={table.tableName}
                    imageUrl={table.vpsData?.imgUrl}
                  >
                    <LeaderboardTitleCardContent
                      title={table.tableName}
                      vpsId={id}
                      downloadUrl={table.tableUrl}
                      version={table.versionNumber}
                      author={
                        table.authorName
                          ? truncate(table.authorName, 30)
                          : undefined
                      }
                    />
                  </LeaderboardTitleCard>

                  {/* ── Scores list ── */}
                  <div className="flex flex-col gap-1 overflow-auto rounded-xl min-w-[320px] max-w-[320px]">
                    {(table.scores ?? []).map((score, scoreIndex) => (
                      <HighScoresLeaderboardItem
                        key={`${id}-${table.tableName}-${table.versionNumber}-${score.scoreId}`}
                        score={score}
                        scoreIndex={scoreIndex}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
