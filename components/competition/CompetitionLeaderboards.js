"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { GiPinballFlipper } from "react-icons/gi";
import { Input } from "antd";
import Loading from "@/app/loading";
import LeaderboardTitleCard from "@/components/shared/LeaderboardTitleCard";
import LeaderboardTitleCardContent from "@/components/shared/LeaderboardTitleCardContent";
import CompetitionLeaderboardItem from "@/components/competition/CompetitionLeaderboardItem";

// ── Helpers ──────────────────────────────────────────────────────────────────

function unwrap(raw) {
  if (Array.isArray(raw) && raw.length > 0 && raw[0].results) {
    return { results: raw[0].results, total: Number(raw[0].totalCount ?? 0) };
  }
  return { results: [], total: 0 };
}

const truncate = (str, num) => {
  if (str.length > num) return str.slice(0, num) + "...";
  return str;
};

export default function CompetitionLeaderboards({
  scoresData = [],
  totalCount = 0,
  weeksPageAPI,
}) {
  const weeksPerPage = 4;

  const [weeks, setWeeks] = useState(scoresData);
  const [count, setCount] = useState(totalCount);
  const [offset, setOffset] = useState(weeksPerPage); // first page already loaded via SSR
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalCount > weeksPerPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // Reset everything when search changes
  useEffect(() => {
    if (!debouncedSearchTerm) {
      // Restore SSR data
      setWeeks(Array.isArray(scoresData) ? scoresData : []);
      setCount(totalCount);
      setOffset(weeksPerPage);
      setHasMore(totalCount > weeksPerPage);
      return;
    }

    // Fresh search — fetch from offset 0
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const url = `${weeksPageAPI}?limit=${weeksPerPage}&offset=0&searchTerm=${encodeURIComponent(debouncedSearchTerm)}`;
        const res = await fetch(url);
        const raw = await res.json();
        if (cancelled) return;
        const { results, total } = unwrap(raw);
        setWeeks(results);
        setCount(total);
        setOffset(weeksPerPage);
        setHasMore(total > weeksPerPage);
      } catch (err) {
        console.error("CompetitionLeaderboards search error:", err);
        if (!cancelled) {
          setWeeks([]);
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
  }, [debouncedSearchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      let url = `${weeksPageAPI}?limit=${weeksPerPage}&offset=${offset}`;
      if (debouncedSearchTerm)
        url += `&searchTerm=${encodeURIComponent(debouncedSearchTerm)}`;
      const res = await fetch(url);
      const raw = await res.json();
      const { results, total } = unwrap(raw);
      setWeeks((prev) => [...prev, ...results]);
      setCount(total);
      setOffset((prev) => prev + weeksPerPage);
      setHasMore(offset + weeksPerPage < total);
    } catch (err) {
      console.error("CompetitionLeaderboards loadMore error:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset, debouncedSearchTerm, weeksPageAPI]);

  // Wire up IntersectionObserver to the sentinel
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
          <GiPinballFlipper />
          Competition Corner
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
      <div className="flex flex-row w-full gap-2 text-stone-800 dark:text-stone-200 pb-2 mb-2 border-b-2 border-orange-500 dark:border-orange-950 overflow-x-auto overflow-y-hidden">
        <div className="flex flex-row gap-2 mx-auto">
          {(weeks ?? []).map((week) => {
            const id = week.vpsId;
            const key = `${id}-${week.table}`;
            return (
              <div
                className="flex flex-col gap-1 items-center"
                key={key}
                id={key}
              >
                <LeaderboardTitleCard
                  table={week.table}
                  imageUrl={week.vpsData?.imgUrl}
                >
                  <LeaderboardTitleCardContent
                    title={week.table}
                    vpsId={id}
                    downloadUrl={week.tableUrl}
                    weekNumber={week.weekNumber}
                    periodStart={week.periodStart}
                    periodEnd={week.periodEnd}
                    version={week.versionNumber}
                    author={
                      week.authorName
                        ? truncate(week.authorName, 30)
                        : undefined
                    }
                  />
                </LeaderboardTitleCard>
                <div className="flex flex-col gap-1 overflow-auto rounded-xl min-w-[320px] max-w-[320px]">
                  {(week.scores ?? []).map((score, scoreIndex) => (
                    <CompetitionLeaderboardItem
                      key={`${week.weekId}-${score.username}-${score.score}`}
                      score={score}
                      scoreIndex={scoreIndex}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Sentinel — observed to trigger loadMore */}
          <div
            ref={sentinelRef}
            className="flex items-center px-4 min-w-[40px]"
          >
            {loading && <Loading />}
          </div>
        </div>
      </div>

      {!hasMore && weeks.length > 0 && (
        <p className="text-center text-xs text-stone-400 dark:text-stone-600 py-1">
          All {count} weeks loaded
        </p>
      )}
    </div>
  );
}
