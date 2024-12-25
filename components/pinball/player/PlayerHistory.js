import Link from "next/link";
import {
  CgChevronDoubleDownO,
  CgChevronUpO,
  CgSoftwareUpload,
} from "react-icons/cg";
import { GiRibbonMedal } from "react-icons/gi";
import { Tooltip } from "antd";

export default function PlayerHistory({ weeksData }) {
  return (
    <div className="flex flex-col w-full text-gray-50 items-start gap-1 border-2 border-orange-950 rounded-xl px-2 py-1">
      <div className="flex w-full">
        <div className="flex items-center text-sm pl-1">
          <Link href="/competitions">Competition Corner</Link>
        </div>
        {!weeksData[0].score && (
          <div className="flex items-center ml-auto text-xs">
            <Link
              href="https://discord.com/channels/652274650524418078/720381436842213397"
              target="_blank"
            >
              Post a Score
            </Link>
          </div>
        )}
        {weeksData[0].score && weeksData[0].nextScore && (
          <div className="flex flex-col items-center ml-auto text-xs">
            <Link
              href={`/player/${weeksData[0].nextPlayer}`}
              className="flex flex-col items-center"
            >
              <div className="flex items-center">
                P{weeksData[0].nextPosition}. {weeksData[0].nextPlayer}
              </div>
              <div className="text-orange-300">
                {weeksData[0].nextScore.toLocaleString()}
              </div>
            </Link>
          </div>
        )}
        {weeksData[0].score && !weeksData[0].nextScore && (
          <div className="flex flex-row items-center ml-auto text-xs">
            <div className="flex items-center">{weeksData[0].nextPlayer}</div>
            <div className="flex items-center pl-1 text-xl">
              <GiRibbonMedal className="text-blue-500" />
            </div>
          </div>
        )}
        {!weeksData[0].score && (
          <div className="flex items-center pl-1 text-xl">
            <Link
              href="https://discord.com/channels/652274650524418078/720381436842213397"
              target="_blank"
            >
              <CgSoftwareUpload className="text-red-500 animate-pulse" />
            </Link>
          </div>
        )}
        {weeksData[0].score && weeksData[0].nextScore && (
          <div className="flex items-center pl-1 text-2xl">
            <Tooltip
              title={`Only ${(
                weeksData[0].nextScore - weeksData[0].score
              ).toLocaleString()} more points!`}
              color="rgba(41, 37, 36, 0.9)"
            >
              <CgChevronUpO className="text-green-500 animate-pulse" />
            </Tooltip>
          </div>
        )}
      </div>
      <hr className="w-full pb-1 border-1 border-orange-950" />
      <div
        id="scrollableDiv"
        className="flex flex-col w-full h-[402px] overflow-auto gap-1"
      >
        {weeksData.map((weekData, index) => (
          <div
            key={index}
            className={`flex flex-col w-full rounded-xl px-2 pt-1 ${
              index % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
            }`}
          >
            <Link href={`/competitions?week=${weekData.weekNumber}`}>
              <div className="flex gap-2">
                <div className="truncate text-sm">
                  {weekData.weekNumber}. {weekData.table}
                </div>
                <div className="ml-auto min-w-[max-content] text-sm">
                  {weekData.score ? (
                    <span className="text-orange-300">
                      {weekData.score
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  ) : (
                    <span className="text-stone-500">No Score</span>
                  )}
                </div>
              </div>
              <Tooltip
                title={`${
                  Number.isNaN(
                    (weekData.score / weekData.scores[0].score) * 100
                  )
                    ? 0
                    : Math.round(
                        (weekData.score / weekData.scores[0].score) * 100
                      )
                }% to 1st Place`}
                placement="topRight"
              >
                <hr
                  style={{
                    width:
                      weekData.scores[0].score === 0
                        ? "100%"
                        : `${
                            (weekData.score / weekData.scores[0].score) * 100
                          }%`,
                  }}
                  className={`mr-auto ${
                    !weekData.score
                      ? "border-t-0"
                      : "border-t-4 border-stone-400"
                  }`}
                />
              </Tooltip>
              <div className="flex gap-2 items-start">
                <div className="">
                  {weekData.position ? (
                    <span className="text-orange-300">
                      P{weekData.position} of {weekData.numberOfParticipants}
                    </span>
                  ) : (
                    <span className="text-stone-500">No Position</span>
                  )}
                </div>
                <div className="flex ml-auto">
                  {weekData.points
                    ? `${weekData.points} ${
                        weekData.points > 1 ? "Points" : "Point"
                      }`
                    : "0 Points"}
                </div>
              </div>
            </Link>
          </div>
        ))}
        <div className="flex justify-center items-center text-2xl sticky bottom-0">
          <Tooltip title="Scroll Down for More">
            <CgChevronDoubleDownO className="text-orange-600 animate-bounce" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
