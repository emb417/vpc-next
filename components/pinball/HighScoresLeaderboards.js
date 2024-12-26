"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GiPreviousButton, GiNextButton, GiHighFive } from "react-icons/gi";
import LeaderboardTitleCard from "@/components/pinball/LeaderboardTitleCard";
import { Input } from "antd";

export default function HistoryLeaderboards({
  scoresData,
  vpsIdsByRecency,
  tablesAPI,
}) {
  const [page, setPage] = useState(1);
  const [tablesPerPage] = useState(4);
  const [images, setImages] = useState({});
  const [tablesToShow, setTablesToShow] = useState([]);
  const [sortMethod, setSortMethod] = useState("recency");

  const fetchImageForVpsId = async (vpsId) => {
    const vpsResponse = await fetch(`${tablesAPI}/${vpsId}`);
    let vpsData;
    try {
      vpsData = await vpsResponse.json();
    } catch (error) {
      console.error(error);
      vpsData = null;
    }
    return vpsData?.b2sFiles?.[0]?.imgUrl ?? null;
  };

  useEffect(() => {
    const start = (page - 1) * tablesPerPage;
    const end = start + tablesPerPage;
    let sortedScoresData = scoresData;
    if (sortMethod === "recency") {
      sortedScoresData = vpsIdsByRecency.map((vpsId) =>
        scoresData.find((table) => table.vpsId === vpsId)
      );
    }
    setTablesToShow(sortedScoresData.slice(start, end));
  }, [page, scoresData, tablesPerPage, sortMethod]);

  useEffect(() => {
    const fetchImages = async () =>
      Promise.all(
        tablesToShow.map(async (table) => [
          table.vpsId,
          await fetchImageForVpsId(table.vpsId),
        ])
      ).then((imagesData) => setImages(Object.fromEntries(imagesData)));
    fetchImages();
  }, [tablesToShow]);

  useEffect(() => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [page]);

  return (
    <div className="flex flex-col flex-grow w-full max-h-screen">
      <div className="flex flex-row w-full items-center justify-start gap-4 pb-2 text-stone-50">
        <h1 className="flex flex-row items-center gap-1 text-xl">
          <GiHighFive className="text-2xl" />
          High Score Corner
        </h1>
        <div className="ml-auto flex flex-row items-center gap-8">
          <div className="hidden lg:flex flex-row items-center gap-1">
            Filter <Input placeholder="Search" />
          </div>
          <div className="hidden lg:flex flex-row items-center gap-1">
            Sort by
            <button
              className={`p-1 rounded-lg hover:bg-orange-800 duration-300 ${
                sortMethod === "recency" ? "bg-orange-800" : "bg-orange-950"
              }`}
              onClick={() => setSortMethod("recency")}
            >
              Recency
            </button>
            or
            <button
              className={`p-1 rounded-lg hover:bg-orange-800 duration-300 ${
                sortMethod === "title" ? "bg-orange-800" : "bg-orange-950"
              }`}
              onClick={() => setSortMethod("title")}
            >
              Title
            </button>
          </div>
          <div className="ml-auto flex flex-row items-center gap-1">
            <button
              className="p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <GiPreviousButton className="text-xl" />
            </button>
            <span className="text-xs text-center">
              Page {page} of {Math.ceil(scoresData.length / tablesPerPage)}
            </span>
            <button
              className="p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300"
              onClick={() => setPage(page + 1)}
              disabled={page * tablesPerPage >= scoresData.length}
            >
              <GiNextButton className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-row w-full items-center justify-start gap-4 pb-2 text-stone-50">
        <div className="flex flex-row items-center gap-1">
          <span className="text-xs">Filter</span>
          <Input className="w-[120px] h-6" placeholder="Search" />
        </div>
        <div className="ml-auto flex flex-row items-center gap-1">
          <span className="text-xs">Sort by</span>
          <button
            className={`p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300 ${
              sortMethod === "recency" ? "bg-orange-800" : ""
            }`}
            onClick={() => setSortMethod("recency")}
          >
            Recency
          </button>
          <span className="text-xs">or</span>
          <button
            className={`p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300 ${
              sortMethod === "title" ? "bg-orange-800" : ""
            }`}
            onClick={() => setSortMethod("title")}
          >
            Title
          </button>
        </div>
      </div>
      <div
        id="scrollableDiv"
        className="flex flex-row w-full xl:justify-center gap-2 text-stone-50 pb-2 mb-2 border-b-2 border-orange-950 overflow-auto"
      >
        {tablesToShow.map((table) => (
          <div
            className="flex flex-col gap-1 items-center"
            key={
              table.scores.length > 0
                ? `${table.vpsId}-${table.tableName}-${table.scores[0].tableId}`
                : `${table.vpsId}-${table.tableName}`
            }
            id={
              table.scores.length > 0
                ? `${table.vpsId}-${table.tableName}-${table.scores[0].tableId}`
                : `${table.vpsId}-${table.tableName}`
            }
          >
            <LeaderboardTitleCard
              table={table.tableName}
              imageUrl={images[table.vpsId]}
            >
              <div className="text-xl">{table.tableName}</div>
              <div className="text-xs">VPS ID {table.vpsId}</div>
            </LeaderboardTitleCard>
            <div className="flex flex-col gap-1 overflow-auto rounded-xl min-w-[320px] max-w-[320px]">
              {table.scores.length > 0 &&
                table.scores.map((score, scoreIndex) => (
                  <div
                    key={table.tableId + score.scoreId}
                    className={`flex items-center gap-2 justify-left rounded-full pr-1 w-full ${
                      scoreIndex % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
                    } hover:bg-stone-700 duration-300`}
                  >
                    <div className="flex items-center pl-2 text-orange-300">
                      {scoreIndex + 1}.
                    </div>
                    <Link
                      className="flex justify-left"
                      href={`/player/${score.user.username}`}
                    >
                      <div className="flex items-center truncate">
                        {score.user.username}
                      </div>
                    </Link>
                    <div className="ml-auto mr-1 flex gap-2 flex-row items-center">
                      <div className="text-orange-300 text-sm">
                        <Link
                          className="flex justify-left"
                          href={score.postUrl}
                          target="_blank"
                        >
                          {score.score
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Link>
                      </div>
                      <div className="text-sm text-stone-400">
                        v{score.versionNumber}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
