import Link from "next/link";
import Image from "next/image";
import { CgInfo } from "react-icons/cg";
import { Tooltip } from "antd";

export default function RankLeaderboard({ rankedPlayers }) {
  return (
    <div className="flex flex-wrap items-center justify-center">
      <div className="flex flex-col mb-2 items-center">
        <Image
          src="/icon.png"
          width={168}
          height={168}
          alt="VPC"
          className="mb-2"
        />
        <div className="flex text-xl text-stone-50">
          Annual Rankings{" "}
          <Tooltip
            title="To be ranked you need to play more than 50% of the weeks over the past year.
          The ranking is based on win percentage over the past year.
          The P value is your rolling average final weekly position from the last 13 weeks."
            color="rgba(41, 37, 36, 0.8)"
          >
            <CgInfo className="text-sm text-orange-300" />
          </Tooltip>
        </div>
      </div>
      {rankedPlayers.map((user, index) => (
        <Link
          href={`/player/${user.username}`}
          key={user.username}
          className={`flex flex-col items-center mb-1 pr-2 justify-left rounded-full w-full text-stone-50 text-md ${
            index % 2 === 0 ? "bg-stone-900" : "bg-stone-800"
          } hover:bg-stone-700 duration-300`}
        >
          <div className="flex flex-row gap-2 justify-left w-full items-center">
            <div className="flex w-6 h-6 rounded-full items-center">
              <Image
                src={user.userAvatarUrl}
                width={32}
                height={32}
                alt={user.username}
                className="rounded-full"
              />
            </div>
            <div className="truncate">
              <span className="text-orange-300 pr-1">{user.rank}.</span>
              <span className="text-gray-50">{user.username}</span>
            </div>
            <div className="flex flex-row gap-3 items-center ml-auto">
              <div className="flex text-sm text-orange-300">
                P{user.rollingAveragePosition}
              </div>
              <div className="text-lg">{user.winPercentage}%</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
