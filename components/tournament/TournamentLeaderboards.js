"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { GiTrophy } from "react-icons/gi";
import { Input } from "antd";
import Loading from "@/app/loading";
import TournamentCard from "@/components/tournament/TournamentCard";

// ── Helpers ──────────────────────────────────────────────────────────────────

function unwrap(raw) {
  if (Array.isArray(raw) && raw.length > 0 && raw[0].results) {
    return { results: raw[0].results, total: Number(raw[0].totalCount ?? 0) };
  }
  return { results: [], total: 0 };
}

export default function TournamentLeaderboards({
  tournaments = [],
  totalCount = 0,
  tournamentsPageAPI,
}) {
  const perPage = 10;

  const [items, setItems] = useState(tournaments);
  const [count, setCount] = useState(totalCount);
  const [offset, setOffset] = useState(perPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalCount > perPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const sentinelRef = useRef(null);
  const observerRef = useRef(null);
  const scrollableRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // Reset / fresh search when the debounced term changes
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setItems(Array.isArray(tournaments) ? tournaments : []);
      setCount(totalCount);
      setOffset(perPage);
      setHasMore(totalCount > perPage);
      scrollableRef.current?.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const url = `${tournamentsPageAPI}?limit=${perPage}&offset=0&searchTerm=${encodeURIComponent(debouncedSearchTerm)}`;
        const res = await fetch(url);
        const raw = await res.json();
        if (cancelled) return;
        const { results, total } = unwrap(raw);
        setItems(results);
        setCount(total);
        setOffset(perPage);
        setHasMore(total > perPage);
        scrollableRef.current?.scrollTo({ left: 0, behavior: "smooth" });
      } catch (err) {
        console.error("TournamentLeaderboards search error:", err);
        if (!cancelled) {
          setItems([]);
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
      let url = `${tournamentsPageAPI}?limit=${perPage}&offset=${offset}`;
      if (debouncedSearchTerm)
        url += `&searchTerm=${encodeURIComponent(debouncedSearchTerm)}`;
      const res = await fetch(url);
      const raw = await res.json();
      const { results, total } = unwrap(raw);
      setItems((prev) => [...prev, ...results]);
      setCount(total);
      setOffset((prev) => prev + perPage);
      setHasMore(offset + perPage < total);
    } catch (err) {
      console.error("TournamentLeaderboards loadMore error:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset, debouncedSearchTerm, tournamentsPageAPI]);

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
    <div className="flex flex-col w-full h-full min-h-0">
      <div className="flex flex-col w-full py-2 gap-2">
        <div className="flex flex-row w-full items-center justify-between">
          <h1 className="flex flex-row items-center gap-1 text-lg text-stone-800 dark:text-stone-200">
            <GiTrophy />
            Tournaments
          </h1>
          <div className="flex items-center w-full max-w-[230px]">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by tournament name"
              allowClear
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>Active</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Upcoming</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-stone-400"></span>Concluded</span>
        </div>
      </div>

      <div
        ref={scrollableRef}
        className="flex flex-row flex-1 min-h-0 w-full gap-6 text-stone-800 dark:text-stone-200 pb-2 mb-2 overflow-x-auto overflow-y-hidden"
      >
        {items.length === 0 && !loading ? (
          <p className="m-auto text-center text-2xl text-stone-400 dark:text-stone-600">
            No tournaments found.
          </p>
        ) : (
          <div className="flex flex-row gap-6 mx-auto h-full">
            {(items ?? []).map((tournament) => (
              <TournamentCard
                key={
                  tournament._id ?? `${tournament.name}-${tournament.startDate}`
                }
                tournament={tournament}
              />
            ))}

            {/* Sentinel — observed to trigger loadMore; omitted when done so short lists center */}
            {(hasMore || loading) && (
              <div
                ref={sentinelRef}
                className="flex items-center px-4 min-w-[40px]"
              >
                {loading && <Loading />}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
