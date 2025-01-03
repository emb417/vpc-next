"use client";

import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  GiPreviousButton,
  GiNextButton,
  GiPinballFlipper,
} from "react-icons/gi";
import { CgSoftwareUpload } from "react-icons/cg";
import { Input, Tooltip } from "antd";
import PlayerImage from "@/components/pinball/player/PlayerImage";
import LeaderboardTitleCard from "@/components/pinball/LeaderboardTitleCard";

export default function CompetitionLeaderboards({ weeksData, tablesAPI }) {
  const searchParams = useSearchParams();
  const week = searchParams.get("week");
  const [highlightedId, setHighlightedId] = useState(null);
  const [page, setPage] = useState(1);
  const [tablesPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [tablesToShow, setTablesToShow] = useState([]);
  const [imagesUrls, setImagesUrls] = useState({});
  const [filterValue, setFilterValue] = useState(null);
  const [filteredWeeksData, setFilteredWeeksData] = useState(weeksData);
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
    if (week) {
      const weekIndex = weeksData.findIndex(
        (weekData) => weekData.weekNumber === parseInt(week)
      );
      const pageWithData = Math.ceil(weekIndex / tablesPerPage) || 1;
      setPage(pageWithData);
      setHighlightedId(week);
    }
  }, [week, weeksData, tablesPerPage]);

  useEffect(() => {
    const start = (page - 1) * tablesPerPage;
    const end = start + tablesPerPage;
    const newTablesToShow = filteredWeeksData.slice(start, end);
    setTablesToShow(newTablesToShow);
    setTotalPages(Math.ceil(filteredWeeksData.length / tablesPerPage));

    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [page, filteredWeeksData, tablesPerPage]);

  const handleFilterChange = (value) => {
    setFilterValue(value);
    const filteredWeeks = weeksData.filter(
      (weekData) =>
        !value ||
        weekData.table.toLowerCase().includes(value.toLowerCase()) ||
        weekData.vpsId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredWeeksData(filteredWeeks);
    setPage(1);

    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col flex-grow w-full max-h-dvh">
      <div className="flex flex-row w-full items-center justify-start py-2">
        <h1 className="flex flex-row items-center gap-1 text-lg text-stone-200">
          <GiPinballFlipper /> Competition Corner
          <Tooltip
            title="Click to see instructions on how to post a competition score."
            color="rgba(41, 37, 36, 0.8)"
          >
            <Link
              href="https://discord.com/channels/652274650524418078/720381436842213397/720392464690577539"
              target="_blank"
            >
              <CgSoftwareUpload className="text-red-500 animate-pulse" />
            </Link>
          </Tooltip>
        </h1>
        <div className="flex flex-row items-center gap-8 ml-auto">
          <div className="hidden md:flex w-[230px]">
            <Input
              value={filterValue}
              onChange={(e) => handleFilterChange(e.target.value)}
              placeholder="Filter by table name or VPS ID"
              allowClear
              size="small"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <button
              className="p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <GiPreviousButton className="text-xl text-stone-300" />
            </button>
            <span className="min-w-[max-content] text-xs text-center text-stone-300">
              Page {page} of {totalPages}
            </span>
            <button
              className="p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300"
              onClick={() => setPage(page + 1)}
              disabled={page * tablesPerPage >= filteredWeeksData.length}
            >
              <GiNextButton className="text-xl text-stone-300" />
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden flex w-full justify-center items-center pb-3">
        <div className="w-[230px]">
          <Input
            value={filterValue}
            onChange={(e) => handleFilterChange(e.target.value)}
            placeholder="Filter by table name or VPS ID"
            allowClear
            size="small"
          />
        </div>
      </div>
      <div
        ref={scrollableDivRef}
        className="flex flex-row w-full xl:justify-center gap-4 text-stone-200 pb-2 mb-2 border-b-2 border-orange-950 overflow-auto"
      >
        {tablesToShow.map((weekData) => (
          <div
            key={weekData.weekNumber}
            id={weekData.weekNumber}
            className={`flex flex-col gap-1 items-center`}
          >
            <LeaderboardTitleCard
              imageUrl={imagesUrls[weekData.vpsId]}
              table={weekData.table}
              highlighted={highlightedId == weekData.weekNumber}
            >
              <div className="text-sm">Week #{weekData.weekNumber}</div>
              {weekData.periodStart &&
                weekData.periodEnd &&
                weekData.periodStart !== "0NaN-aN-aN" && (
                  <div className="text-sm">
                    {new Date(weekData.periodStart).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                    {" to "}
                    {new Date(weekData.periodEnd).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </div>
                )}
              <Link
                href={`https://virtual-pinball-spreadsheet.web.app/game/${weekData.vpsId}/`}
                target="_blank"
              >
                <div className="text-xl">{weekData.table}</div>
                <div className="text-xs">VPS ID {weekData.vpsId}</div>
              </Link>
            </LeaderboardTitleCard>
            <div className="flex flex-col gap-1 overflow-auto rounded-xl min-w-[320px] max-w-[320px]">
              {weekData.scores.map((score, scoreIndex) => (
                <Link
                  href={`/player/${score.username}`}
                  key={score.username}
                  className={`flex items-center gap-2 justify-left rounded-full pr-1 w-full ${
                    scoreIndex % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
                  } hover:bg-stone-700 duration-300`}
                >
                  <span className="text-orange-300 pl-2">
                    {score.position}.
                  </span>
                  <div className="flex items-center">
                    <PlayerImage
                      src={score.userAvatarUrl}
                      alt={score.username}
                    />
                  </div>
                  <span className="text-stone-200 truncate">
                    {score.username}
                  </span>
                  <div className="ml-auto mr-1 flex gap-4 flex-row items-center">
                    <div className="text-orange-300 text-sm">
                      {score.score
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="text-xl text-stone-100">{score.points}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
