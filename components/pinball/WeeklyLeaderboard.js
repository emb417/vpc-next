import { useMemo } from "react";
import Link from "next/link";
import { Tooltip } from "antd";
import colors from "@/lib/Colors";
import LeaderboardTitleCard from "@/components/pinball/LeaderboardTitleCard";

export default function WeeklyLeaderboard({ weekData, vpsData }) {
  const usernames = useMemo(() => {
    const usernamesSet = new Set(
      weekData.scores.flatMap((score) => score.username)
    );
    return Array.from(usernamesSet);
  }, [weekData]);

  const userColors = useMemo(() => {
    return usernames.reduce((acc, username, index) => {
      const color = colors[index % 20];
      return acc.concat({
        value: username,
        label: username,
        color,
      });
    }, []);
  }, [usernames]);

  return (
    <div className="flex flex-col items-center text-gray-50">
      <LeaderboardTitleCard
        imageUrl={vpsData.b2sFiles[0].imgUrl}
        table={weekData.table}
        weekNumber={weekData.weekNumber}
        periodStart={weekData.periodStart}
        periodEnd={weekData.periodEnd}
        priority
      >
        <div className="text-sm">Week #{weekData.weekNumber}</div>
        {weekData.periodStart &&
          weekData.periodEnd &&
          weekData.periodStart !== "0NaN-aN-aN" && (
            <div className="text-sm">
              {new Date(weekData.periodStart).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              {" to "}
              {new Date(weekData.periodEnd).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
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
      {weekData.scores.map((score, index) => (
        <Link
          href={`/player/${score.username}`}
          key={score.username}
          className={`flex flex-col items-center mb-1 justify-left rounded-xl px-2 w-full ${
            index % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
          } hover:bg-stone-700 duration-300`}
        >
          <div className="flex flex-row gap-2 justify-left w-full items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: userColors.find(
                  (user) => user.value === score.username
                ).color,
              }}
            ></div>
            <div className="truncate">
              <span className="text-orange-300 pr-1">{score.position}.</span>
              <span className="text-gray-50">{score.username}</span>
            </div>
            <div className="flex flex-row gap-3 items-center ml-auto">
              <div className="text-orange-300 text-sm">
                {score.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <div className="text-xl mr-1">{score.points}</div>
            </div>
          </div>
          <Tooltip
            title={`${
              Number.isNaN((score.score / weekData.scores[0].score) * 100)
                ? 0
                : Math.round((score.score / weekData.scores[0].score) * 100)
            }% to 1st Place`}
            placement="topRight"
          >
            <hr
              style={{
                width:
                  weekData.scores[0].score === 0
                    ? "100%"
                    : `${(score.score / weekData.scores[0].score) * 100}%`,
              }}
              className={`mr-auto pb-1 ${
                !score.score ? "border-t-0" : "border-t-4 border-stone-400"
              }`}
            />
          </Tooltip>
        </Link>
      ))}
    </div>
  );
}
