"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { GiPreviousButton, GiNextButton, GiHighFive } from "react-icons/gi";
import { CgSoftwareUpload } from "react-icons/cg";
import LeaderboardTitleCard from "@/components/shared/LeaderboardTitleCard";
import HighScoresLeaderboardItem from "@/components/highscores/HighScoresLeaderboardItem";
import { Input, Tooltip } from "antd";

const SortMethodButton = ({ sortMethod, setSortMethod, children, value }) => (
  <button
    className={`p-1 rounded-lg text-xs hover:bg-orange-800 duration-300 ${
      sortMethod === value ? "bg-orange-800" : "bg-orange-950"
    }`}
    onClick={() => setSortMethod(value)}
  >
    {children}
  </button>
);

export default function HistoryLeaderboards({
  scoresData,
  vpsIdsByRecency,
  tablesAPI,
}) {
  const [sortMethod, setSortMethod] = useState("recent");
  const [filterValue, setFilterValue] = useState(null);
  const [filteredScoresData, setFilteredScoresData] = useState(scoresData);
  const [page, setPage] = useState(1);
  const [tablesPerPage, setTablesPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [tablesToShow, setTablesToShow] = useState([]);
  const [imagesUrls, setImagesUrls] = useState({});
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    const fetchImagesForTables = async () => {
      const imagesData = await Promise.all(
        tablesToShow.map(async (table) => {
          const vpsResponse = await fetch(`${tablesAPI}/${table.vpsId}`);
          let vpsData;
          try {
            vpsData = await vpsResponse.json();
          } catch (error) {
            console.error(error);
            vpsData = null;
          }
          return [table.vpsId, vpsData?.b2sFiles?.[0]?.imgUrl ?? null];
        })
      );
      setImagesUrls(Object.fromEntries(imagesData));
    };
    fetchImagesForTables();
  }, [tablesToShow, tablesAPI]);

  useEffect(() => {
    let sortedScoresData = filteredScoresData;
    if (sortMethod === "recent") {
      const seenVpsIds = new Set();
      sortedScoresData = vpsIdsByRecency
        .map((vpsId) => {
          if (seenVpsIds.has(vpsId)) return null;
          seenVpsIds.add(vpsId);
          return filteredScoresData.find((table) => table.vpsId === vpsId);
        })
        .filter(Boolean);
    }
    const start = (page - 1) * tablesPerPage;
    const end = Math.min(start + tablesPerPage, sortedScoresData.length);
    setTablesToShow(sortedScoresData.slice(start, end));
    setTotalPages(Math.ceil(sortedScoresData.length / tablesPerPage));

    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({ left: 0, behavior: "smooth" });
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
  }, [page, filteredScoresData, sortMethod, tablesPerPage, vpsIdsByRecency]);

  useEffect(() => {
    let filteredScoresData = scoresData;
    if (filterValue) {
      filteredScoresData = filteredScoresData.filter(
        (table) =>
          table.tableName.toLowerCase().includes(filterValue.toLowerCase()) ||
          table.vpsId.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    setFilteredScoresData(filteredScoresData);
    setPage(1);
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [scoresData, filterValue]);

  useEffect(() => {
    setPage(1);
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [sortMethod]);

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
        <div className="flex flex-row items-center gap-8 ml-auto">
          <div className="hidden lg:flex w-[230px]">
            <Input
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Filter by table name or VPS ID"
              allowClear
              size="small"
            />
          </div>
          <div className="hidden lg:flex flex-row items-center gap-1 text-stone-200">
            Sort by
            <SortMethodButton
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
              value="recent"
            >
              Recent
            </SortMethodButton>
            or
            <SortMethodButton
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
              value="name"
            >
              Name
            </SortMethodButton>
          </div>
          <div className="flex flex-row items-center gap-2 text-stone-200 ml-auto">
            <button
              className="p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <GiPreviousButton className="text-xl" />
            </button>
            <span className="min-w-[max-content] text-xs text-center">
              Page {page} of {totalPages}
            </span>
            <button
              className="p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <GiNextButton className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex w-full justify-center items-center pl-2 pb-3 text-stone-200">
        <div className="w-[190px]">
          <Input
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="Filter by table or VPS ID"
            allowClear
            size="small"
          />
        </div>
        <div className="flex flex-row items-center gap-1 ml-auto">
          <span className="text-xs">Sort by</span>
          <SortMethodButton
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
            value="recent"
          >
            Recent
          </SortMethodButton>
          <span className="text-xs">or</span>
          <SortMethodButton
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
            value="name"
          >
            Name
          </SortMethodButton>
        </div>
      </div>
      <div
        ref={scrollableDivRef}
        className="flex flex-row w-full xl:justify-center gap-2 text-stone-200 pb-2 mb-2 border-b-2 border-orange-950 overflow-auto"
      >
        {tablesToShow.map((table) => (
          <div
            className="flex flex-col gap-1 items-center"
            key={
              table.scores.length > 0
                ? `${table.vpsId}-${table.tableName}-${table.scores[0].tableId}--${table.scores[0].versionId}`
                : `${table.vpsId}-${table.tableName}`
            }
            id={
              table.scores.length > 0
                ? `${table.vpsId}-${table.tableName}-${table.scores[0].tableId}--${table.scores[0].versionId}`
                : `${table.vpsId}-${table.tableName}`
            }
          >
            <LeaderboardTitleCard
              table={table.tableName}
              imageUrl={imagesUrls?.[table.vpsId]}
            >
              <Link
                href={`https://virtual-pinball-spreadsheet.web.app/game/${table.vpsId}/`}
                target="_blank"
              >
                <div className="text-xl">{table.tableName}</div>
                <div className="text-xs">VPS ID {table.vpsId}</div>
              </Link>
            </LeaderboardTitleCard>
            <div className="flex flex-col gap-1 overflow-auto rounded-xl min-w-[320px] max-w-[320px]">
              {table.scores.length > 0 &&
                table.scores.map((score, scoreIndex) => (
                  <HighScoresLeaderboardItem
                    key={table.tableId + score.scoreId}
                    score={score}
                    scoreIndex={scoreIndex}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
