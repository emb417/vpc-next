import { useMemo } from "react";
import Link from "next/link";
import { Tooltip } from "antd";
import colors from "@/lib/Colors";

export default function WeeklyLeaderboard({ weekData }) {
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
      <div>Week #{weekData.weekNumber}</div>
      <div className="text-xl text-center mb-2 px-4">{weekData.table}</div>
      {weekData.scores.map((score, index) => (
        <Link
          href={`/player/${score.username}`}
          key={score.username}
          className={`flex flex-col items-center mb-1 justify-left rounded-xl px-2 w-full ${
            index % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
          } hover:text-orange-300 hover:bg-stone-950 duration-300`}
        >
          <div className="flex flex-row gap-2 justify-left w-full items-center">
            <div className="flex gap-2 items-center">
              <span
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: userColors.find(
                    (user) => user.value === score.username
                  ).color,
                }}
              ></span>
              {score.position}.
            </div>
            <div className="truncate">{score.username}</div>
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
