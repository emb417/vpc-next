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
import LeaderboardTitleCard from "@/components/pinball/LeaderboardTitleCard";
import CompetitionLeaderboardItem from "@/components/pinball/CompetitionLeaderboardItem";

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
  const [sortMethod, setSortMethod] = useState("recent");
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
    let sortedFilteredWeeksData = filteredWeeksData;
    if (sortMethod === "recent") {
      sortedFilteredWeeksData = filteredWeeksData.sort(
        (a, b) => b.weekNumber - a.weekNumber
      );
    } else if (sortMethod === "name") {
      sortedFilteredWeeksData = filteredWeeksData.sort((a, b) =>
        a.table.localeCompare(b.table)
      );
    }

    const start = (page - 1) * tablesPerPage;
    const end = Math.min(start + tablesPerPage, sortedFilteredWeeksData.length);
    setTablesToShow(sortedFilteredWeeksData.slice(start, end));
    setTotalPages(Math.ceil(sortedFilteredWeeksData.length / tablesPerPage));

    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [page, filteredWeeksData, sortMethod, tablesPerPage]);
  
  useEffect(() => {
    let filteredWeeksData = weeksData;
    if(filterValue){
      filteredWeeksData = filteredWeeksData.filter(
        (weekData) =>
        weekData.table.toLowerCase().includes(filterValue.toLowerCase()) ||
        weekData.vpsId.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    setFilteredWeeksData(filteredWeeksData);
    setPage(1);
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [weeksData, filterValue]);

  useEffect(() => {
    setPage(1);
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [sortMethod]);
  
  return (
    <div className="flex flex-col w-full max-h-dvh">
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
            placeholder="Filter by name or VPS ID"
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
        className="flex flex-row w-full xl:justify-center gap-4 text-stone-200 pb-2 mb-2 border-b-2 border-orange-950 overflow-auto"
      >
        {tablesToShow.map((weekData) => (
          <div
            className={`flex flex-col gap-1 items-center`}
            key={weekData.weekNumber}
            id={weekData.weekNumber}
          >
            <LeaderboardTitleCard
              table={weekData.table}
              imageUrl={imagesUrls[weekData.vpsId]}
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
                <CompetitionLeaderboardItem score={score} scoreIndex={scoreIndex} key={score.username} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
