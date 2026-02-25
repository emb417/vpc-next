"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  GiPreviousButton,
  GiNextButton,
  GiPinballFlipper,
} from "react-icons/gi";
import { CgSoftwareUpload } from "react-icons/cg";
import { Input, Tooltip } from "antd";
import Loading from "@/app/loading";
import LeaderboardTitleCard from "@/components/shared/LeaderboardTitleCard";
import LeaderboardTitleCardContent from "@/components/shared/LeaderboardTitleCardContent";
import CompetitionLeaderboardItem from "@/components/competition/CompetitionLeaderboardItem";

const truncate = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};
// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function CompetitionLeaderboards({
  scoresData = [],
  totalCount = 0,
  weeksPageAPI,
  tableImagesAPI,
}) {
  const weeksPerPage = 4;
  const [page, setPage] = useState(1);
  const [weeks, setWeeks] = useState(scoresData);
  const [count, setCount] = useState(totalCount);
  const [loading, setLoading] = useState(false);
  const [imagesUrls, setImagesUrls] = useState({});
  const scrollableDivRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const totalPages = Math.max(1, Math.ceil(count / weeksPerPage));

  function unwindResponseShape(raw) {
    if (!raw) return { results: [], totalCount: 0 };
    if (Array.isArray(raw) && raw.length > 0 && raw[0].results) {
      return {
        results: raw[0].results,
        totalCount: Number(raw[0].totalCount ?? 0),
      };
    }
    if (Array.isArray(raw) && raw.length === 0) {
      return { results: [], totalCount: 0 };
    }
    return { results: [], totalCount: 0 };
  }

  useEffect(() => {
    const loadPage = async () => {
      if (page === 1 && !debouncedSearchTerm) {
        setWeeks(Array.isArray(scoresData) ? scoresData : []);
        setCount(
          Number.isFinite(Number(totalCount))
            ? Number(totalCount)
            : Array.isArray(scoresData)
              ? scoresData.length
              : 0,
        );
        return;
      }

      setLoading(true);
      const offset = (page - 1) * weeksPerPage;
      let url = `${weeksPageAPI}?limit=${weeksPerPage}&offset=${offset}`;
      if (debouncedSearchTerm) {
        url += `&searchTerm=${encodeURIComponent(debouncedSearchTerm)}`;
      }

      try {
        const res = await fetch(url);
        const raw = await res.json();
        const { results: nextResults, totalCount: nextTotal } =
          unwindResponseShape(raw);
        setWeeks(nextResults);
        setCount(nextTotal);
      } catch (err) {
        console.error("CompetitionLeaderboards loadPage error:", err);
        setWeeks([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [page, weeksPageAPI, scoresData, totalCount, debouncedSearchTerm]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const fetchImagesForTables = async () => {
      const imagesData = await Promise.all(
        (weeks ?? []).map(async (week) => {
          const id = week.vpsId;
          const imageUrl = `${tableImagesAPI}/${id}`;
          try {
            const vpsResponse = await fetch(imageUrl);
            const vpsData = await vpsResponse.json();
            const found = vpsData?.b2sFiles?.[0]?.imgUrl ?? null;
            return [id, found];
          } catch (error) {
            console.error(
              "CompetitionLeaderboards image fetch error for",
              id,
              error,
            );
            return [id, null];
          }
        }),
      );
      setImagesUrls(Object.fromEntries(imagesData));
    };

    if ((weeks ?? []).length > 0) {
      fetchImagesForTables();
    } else {
      setImagesUrls({});
    }
  }, [weeks, tableImagesAPI]);

  return (
    <div className="flex flex-col flex-grow w-full max-h-dvh">
      {/* ── Header ── */}
      <div className="flex flex-row w-full items-center justify-start py-2">
        <h1 className="flex flex-row items-center gap-1 text-lg text-stone-200">
          <GiPinballFlipper />
          Competition Corner
          <Tooltip
            title="Click to see instructions on how to post a score."
            color="rgba(41, 37, 36, 0.8)"
          >
            <Link
              href="https://discord.com/channels/652274650524418078/919336296281960468/919338053208776794"
              target="_blank"
            >
              <CgSoftwareUpload className="text-red-500 animate-pulse" />
            </Link>
          </Tooltip>
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
          <div className="flex flex-row items-center gap-2 text-stone-200">
            <button
              className="p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
            >
              <GiPreviousButton className="text-xl" />
            </button>
            <span className="min-w-[max-content] text-xs text-center">
              Page {page} of {Number.isFinite(totalPages) ? totalPages : 1}
            </span>
            <button
              className="p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loading}
            >
              <GiNextButton className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile search ── */}
      <div className="lg:hidden flex w-full justify-center items-center pl-2 pb-3 text-stone-200">
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
        className="flex flex-row w-full xl:justify-center gap-2 text-stone-200 pb-2 mb-2 border-b-2 border-orange-950 overflow-auto"
      >
        {loading ? (
          <Loading />
        ) : (
          (weeks ?? []).map((week) => {
            const id = week.vpsId;
            const key = `${id}-${week.table}`;
            const downloadUrl = week.tableUrl ?? "#";

            return (
              <div
                className="flex flex-col gap-1 items-center"
                key={key}
                id={key}
              >
                <LeaderboardTitleCard
                  table={week.table}
                  imageUrl={imagesUrls?.[id]}
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

                {/* ── Scores list ── */}
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
          })
        )}
      </div>
    </div>
  );
}
