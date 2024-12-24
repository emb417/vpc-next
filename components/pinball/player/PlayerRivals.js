import Image from "next/image";
import {
  CgInfo,
  CgChevronDoubleUpO,
  CgChevronUpO,
  CgChevronDownO,
} from "react-icons/cg";
import { Tooltip } from "antd";
import Link from "next/link";

export default function PlayerRivals({ playerRivals }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {playerRivals.map(
        (rival, index) =>
          rival.username && (
            <Link
              key={index}
              href={`/player/${rival.username}`}
              className="flex flex-row gap-1 text-gray-50 text-sm rounded-full bg-stone-900 hover:text-orange-300 hover:bg-stone-950 duration-300"
            >
              <div className="flex items-center gap-2 pr-2 col-span-2">
                <Image
                  src={rival.userAvatarUrl}
                  width={32}
                  height={32}
                  alt={rival.username}
                  className="rounded-full"
                />
                <span className="text-lg">{rival.rank}.</span>
                <span className="truncate">{rival.username}</span>
              </div>
              <div className="flex justify-end items-center ml-auto">
                <Tooltip
                  title="Rolling Average Position"
                  className="flex"
                  color="rgba(41, 37, 36, 0.8)"
                >
                  <span className="text-lg text-orange-300">
                    P{rival.rollingAveragePosition}
                  </span>
                  <CgInfo className="text-gray-50 text-xs" />
                </Tooltip>
              </div>
              <div className="flex gap-2 items-center justify-end">
                <Tooltip title="Win Percentage" color="rgba(41, 37, 36, 0.8)">
                  <span className="text-lg">{rival.winPercentage}%</span>
                </Tooltip>
                <span className="w-8 h-8">
                  {index === 0 && (
                    <Tooltip title="Ranked 2 Places Higher" color="rgba(41, 37, 36, 0.8)">
                      <CgChevronDoubleUpO className="text-green-500 w-8 h-8" />
                    </Tooltip>
                  )}
                  {index === 1 && (
                    <Tooltip title="Ranked 1 Place Higher" color="rgba(41, 37, 36, 0.8)">
                      <CgChevronUpO className="text-green-500 w-8 h-8" />
                    </Tooltip>
                  )}
                  {index === 2 && (
                    <Tooltip title="Ranked 1 Place Lower" color="rgba(41, 37, 36, 0.8)">
                      <CgChevronDownO className="text-red-500 w-8 h-8" />
                    </Tooltip>
                  )}
                </span>
              </div>
            </Link>
          )
      )}
    </div>
  );
}