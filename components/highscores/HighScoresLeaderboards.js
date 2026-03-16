"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { GiHighFive } from "react-icons/gi";
import { Input } from "antd";
import Loading from "@/app/loading";
import LeaderboardTitleCard from "@/components/shared/LeaderboardTitleCard";
import LeaderboardTitleCardContent from "@/components/shared/LeaderboardTitleCardContent";
import HighScoresLeaderboardItem from "@/components/highscores/HighScoresLeaderboardItem";

const truncate = (str, num) => {
  if (str.length > num) return str.slice(0, num) + "...";
  return str;
};

export default function HighScoresLeaderboards({
  scoresData = [],
  totalCount = 0,
  tablesPageAPI,
  initialSearchTerm = "",
  initialVpsId = "",
}) {
  const tablesPerPage = 10;

  const [tables, setTables] = useState(scoresData);
  const [count, setCount] = useState(totalCount);
  const [offset, setOffset] = useState(tablesPerPage); // SSR already loaded first page
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalCount > tablesPerPage);

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState(initialSearchTerm);
  const [vpsId, setVpsId] = useState(initialVpsId);
  const [debouncedVpsId, setDebouncedVpsId] = useState(initialVpsId);

  const sentinelRef = useRef(null);
  const observerRef = useRef(null);
  const scrollableRef = useRef(null);

  // Debounce search term
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // Debounce vpsId
  useEffect(() => {
    const id = setTimeout(() => setDebouncedVpsId(vpsId), 500);
    return () => clearTimeout(id);
  }, [vpsId]);

  // Reset + refetch from scratch when filters change
  useEffect(() => {
    if (!debouncedSearchTerm && !debouncedVpsId) {
      setTables(Array.isArray(scoresData) ? scoresData : []);
      setCount(totalCount);
      setOffset(tablesPerPage);
      setHasMore(totalCount > tablesPerPage);
      scrollableRef.current?.scrollTo({ left: 0, behavior: "smooth" });

      return;
    }

    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        let url = `${tablesPageAPI}?limit=${tablesPerPage}&offset=0`;
        if (debouncedSearchTerm)
          url += `&searchTerm=${encodeURIComponent(debouncedSearchTerm)}`;
        if (debouncedVpsId)
          url += `&vpsId=${encodeURIComponent(debouncedVpsId)}`;
        const res = await fetch(url);
        const raw = await res.json();
        if (cancelled) return;
        const { results, total } = unwrap(raw);
        setTables(results);
        setCount(total);
        setOffset(tablesPerPage);
        setHasMore(total > tablesPerPage);
        scrollableRef.current?.scrollTo({ left: 0, behavior: "smooth" });
      } catch (err) {
        console.error("HighScoresLeaderboards filter error:", err);
        if (!cancelled) {
          setTables([]);
          setCount(0);
          setHasMore(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedSearchTerm, debouncedVpsId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      let url = `${tablesPageAPI}?limit=${tablesPerPage}&offset=${offset}`;
      if (debouncedSearchTerm)
        url += `&searchTerm=${encodeURIComponent(debouncedSearchTerm)}`;
      if (debouncedVpsId) url += `&vpsId=${encodeURIComponent(debouncedVpsId)}`;
      const res = await fetch(url);
      const raw = await res.json();
      const { results, total } = unwrap(raw);
      setTables((prev) => [...prev, ...results]);
      setCount(total);
      setOffset((prev) => prev + tablesPerPage);
      setHasMore(offset + tablesPerPage < total);
    } catch (err) {
      console.error("HighScoresLeaderboards loadMore error:", err);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    hasMore,
    offset,
    debouncedSearchTerm,
    debouncedVpsId,
    tablesPageAPI,
  ]);

  // Wire IntersectionObserver to sentinel
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );
    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [loadMore]);

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

      {/* ── Scrollable leaderboard row ── */}
      <div
        ref={scrollableRef}
        className="flex flex-row w-full gap-2 text-stone-800 dark:text-stone-200 pb-2 mb-2 border-b-2 border-orange-500 dark:border-orange-950 overflow-x-auto overflow-y-hidden"
      >
        <div className="flex flex-row gap-2 mx-auto">
          {(tables ?? []).map((table) => {
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
          })}

          {/* Sentinel — triggers loadMore when scrolled into view */}
          <div
            ref={sentinelRef}
            className="flex items-center px-4 min-w-[40px]"
          >
            {loading && <Loading />}
          </div>
        </div>
      </div>

      {!hasMore && tables.length > 0 && (
        <p className="text-center text-xs text-stone-400 dark:text-stone-600 py-1">
          All {count} tables loaded
        </p>
      )}
    </div>
  );
}

function unwrap(raw) {
  if (Array.isArray(raw) && raw.length > 0 && raw[0].results) {
    return { results: raw[0].results, total: Number(raw[0].totalCount ?? 0) };
  }
  return { results: [], total: 0 };
}
