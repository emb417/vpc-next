"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { GiPreviousButton, GiNextButton, GiHighFive } from "react-icons/gi";
import { CgSoftwareUpload } from "react-icons/cg";
import { Tooltip, Input } from "antd";
import Loading from "@/app/loading";
import LeaderboardTitleCard from "@/components/shared/LeaderboardTitleCard";
import HighScoresLeaderboardItem from "@/components/highscores/HighScoresLeaderboardItem";

export default function HighScoresLeaderboards({
  scoresData = [],
  totalCount = 0,
  tablesPageAPI,
  tableImagesAPI,
}) {
  const tablesPerPage = 4;
  const [page, setPage] = useState(1);
  const [tables, setTables] = useState(scoresData);
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

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

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
      if (page === 1 && !debouncedSearchTerm) {
        setTables(Array.isArray(scoresData) ? scoresData : []);
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
      const offset = (page - 1) * tablesPerPage;
      let url = `${tablesPageAPI}?limit=${tablesPerPage}&offset=${offset}`;
      if (debouncedSearchTerm) {
        url += `&searchTerm=${encodeURIComponent(debouncedSearchTerm)}`;
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
  }, [page, tablesPageAPI, scoresData, totalCount, debouncedSearchTerm]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const fetchImagesForTables = async () => {
      const imagesData = await Promise.all(
        (tables ?? []).map(async (table) => {
          const id = table.vpsId ?? table.tableId;
          const imageUrl = `${tableImagesAPI}/${id}`;
          try {
            const vpsResponse = await fetch(imageUrl);
            const vpsData = await vpsResponse.json();
            const found = vpsData?.b2sFiles?.[0]?.imgUrl ?? null;
            return [id, found];
          } catch (error) {
            console.error(
              "HighScoresLeaderboards image fetch error for",
              id,
              error,
            );
            return [id, null];
          }
        }),
      );
      setImagesUrls(Object.fromEntries(imagesData));
    };

    if ((tables ?? []).length > 0) {
      fetchImagesForTables();
    } else {
      setImagesUrls({});
    }
  }, [tables, tableImagesAPI]);

  return (
    <div className="flex flex-col flex-grow w-full max-h-dvh">
      <div className="flex flex-row w-full items-center justify-start py-2">
        <h1 className="flex flex-row items-center gap-1 text-lg text-stone-200">
          <GiHighFive />
          High Score Corner
          <Tooltip
            title="Click to see instructions on how to post a high score."
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

      <div
        ref={scrollableDivRef}
        className="flex flex-row w-full xl:justify-center gap-2 text-stone-200 pb-2 mb-2 border-b-2 border-orange-950 overflow-auto"
      >
        {loading ? (
          <Loading />
        ) : (
          (tables ?? []).map((table) => {
            const id = table.vpsId;
            const key = `${id}-${table.tableName}`;
            return (
              <div
                className="flex flex-col gap-1 items-center"
                key={key}
                id={key}
              >
                <LeaderboardTitleCard
                  table={table.tableName}
                  imageUrl={imagesUrls?.[id]}
                >
                  <Link href={table.tableUrl || "#"} target="_blank">
                    <div className="text-xl">{table.tableName}</div>
                    <div className="text-sm">v{table.versionNumber}</div>
                    <div className="text-xs">VPS ID {id}</div>
                  </Link>
                </LeaderboardTitleCard>

                <div className="flex flex-col gap-1 overflow-auto rounded-xl min-w-[320px] max-w-[320px]">
                  {(table.scores ?? []).map((score, scoreIndex) => (
                    <HighScoresLeaderboardItem
                      key={`${table.vpsId ?? id}-${score.scoreId}`}
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
