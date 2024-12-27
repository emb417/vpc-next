"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  GiPreviousButton,
  GiNextButton,
  GiPinballFlipper,
} from "react-icons/gi";
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

  useEffect(() => {
    const fetchImages = async () =>
      Promise.all(
        tablesToShow.map(async (table) => {
          const vpsResponse = await fetch(`${tablesAPI}/${table.vpsId}`);
          let vpsData;
          try {
            vpsData = await vpsResponse.json();
          } catch (error) {
            console.error(error);
            vpsData = null;
          }
          return [
            table.vpsId,
            vpsData?.b2sFiles?.[0]?.imgUrl ?? null,
          ];
        })
      ).then((imagesData) => setImagesUrls(Object.fromEntries(imagesData)));
    fetchImages();
  }, [tablesToShow, tablesAPI]);

  useEffect(() => {
    const start = (page - 1) * tablesPerPage;
    const end = start + tablesPerPage;
    const newTablesToShow = weeksData.slice(start, end);
    setTablesToShow(newTablesToShow);
    setTotalPages(Math.ceil(weeksData.length / tablesPerPage));

    if (week) {
      const pageWithData = newTablesToShow.findIndex(
        (weekData) => weekData.weekNumber === parseInt(week)
      );
      if (pageWithData !== -1) {
        setHighlightedId(week);
      }
    }

    const scrollableDiv = document.getElementById("scrollableDiv");
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [page, week, weeksData, tablesPerPage]);

  return (
    <div className="flex flex-col flex-grow w-full max-h-screen">
      <div className="flex flex-row w-full items-center justify-start gap-2 pb-2 text-stone-50">
        <h1 className="flex flex-row items-center gap-1 text-xl">
          <GiPinballFlipper /> Competition Corner
        </h1>
        <div className="ml-auto flex flex-row items-center gap-1">
          <button
            className="p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <GiPreviousButton className="text-xl" />
          </button>
          <span className="text-xs text-center">
            Page {page} of {totalPages}
          </span>
          <button
            className="p-1 rounded-lg bg-orange-950 text-xs hover:bg-orange-800 duration-300"
            onClick={() => setPage(page + 1)}
            disabled={page * tablesPerPage >= weeksData.length}
          >
            <GiNextButton className="text-xl" />
          </button>
        </div>
      </div>
      <div
        id="scrollableDiv"
        className="flex flex-row w-full xl:justify-center gap-4 text-stone-50 pb-2 mb-2 border-b-2 border-orange-950 overflow-auto"
      >
        {tablesToShow.map((weekData) => (
          <div
            key={weekData.weekNumber}
            id={weekData.weekNumber}
            className={`flex flex-col gap-1 items-center min-w-[320px] max-w-[320px]`}
          >
            <LeaderboardTitleCard
              imageUrl={imagesUrls[weekData.vpsId]}
              table={weekData.table}
              highlighted={highlightedId == weekData.weekNumber}
              loading="lazy"
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
              <div className="text-xl">{weekData.table}</div>
              <div className="text-xs">VPS ID {weekData.vpsId}</div>
            </LeaderboardTitleCard>
            <div className="flex flex-col gap-1 overflow-auto rounded-xl">
              {weekData.scores.map((score, scoreIndex) => (
                <Link
                  href={`/player/${score.username}`}
                  key={score.username}
                  className={`flex items-center gap-1 justify-left rounded-full pr-1 w-full ${
                    scoreIndex % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
                  } hover:bg-stone-700 duration-300`}
                >
                  <div className="flex items-center">
                    <PlayerImage
                      src={score.userAvatarUrl}
                      alt={score.username}
                    />
                  </div>
                  <div className="truncate">
                    <span className="text-orange-300 pr-1">
                      {score.position}.
                    </span>
                    <span className="text-gray-50">{score.username}</span>
                  </div>
                  <div className="ml-auto mr-1 flex gap-4 flex-row items-center">
                    <div className="text-orange-300 text-sm">
                      {score.score
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="text-xl">{score.points}</div>
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

