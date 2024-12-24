"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import PlayerImage from "@/components/pinball/player/PlayerImage";
import LeaderboardTitleCard from "@/components/pinball/LeaderboardTitleCard";

export default function CompetitionLeaderboards({ weeksData }) {
  const searchParams = useSearchParams();
  const week = searchParams.get("week");
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    if (week) {
      const element = document.getElementById(week);
      if (element) {
        setHighlightedId(week);
        element.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [week]);

  return (
    <div
      id="scrollableDiv"
      className="flex flex-row w-full gap-4 text-stone-50 pb-4 mb-4 border-b border-orange-950 overflow-auto"
    >
      {weeksData.map((weekData) => (
        <div
          key={weekData.weekNumber}
          id={weekData.weekNumber}
          className={`flex flex-col gap-1 items-center min-w-[320px] max-w-[320px]`}
        >
            <LeaderboardTitleCard
              imageUrl={weekData.imageUrl}
              table={weekData.table}
              weekNumber={weekData.weekNumber}
              periodStart={weekData.periodStart}
              periodEnd={weekData.periodEnd}
              highlighted={highlightedId == weekData.weekNumber}
              loading="lazy"
            />
          <div className="flex flex-col gap-1 overflow-auto rounded-xl">
            {weekData.scores.map((score, scoreIndex) => (
              <Link
                href={`/player/${score.username}`}
                key={score.username}
                className={`flex items-center gap-2 justify-left rounded-full pr-1 w-full ${
                  scoreIndex % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
                } hover:text-orange-300 hover:bg-stone-950 duration-300`}
              >
                <div className="flex items-center">
                  <PlayerImage src={score.userAvatarUrl} alt={score.username} />
                </div>
                <div className="truncate">
                  {score.position}. {score.username}
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
  );
}
