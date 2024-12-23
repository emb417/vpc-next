import Image from "next/image";
import { CgInfo } from "react-icons/cg";
import { Tooltip } from "antd";

export default function PlayerBio({ user }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full text-gray-50 text-xl gap-4 sm:gap-8 rounded-full bg-stone-900">
        <div className="flex items-center gap-2 min-w-[max-content]">
          <Image
            src={user.userAvatarUrl}
            width={58}
            height={58}
            alt={user.username}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <div className="flex text-sm">{user.username}</div>
            <div className="flex text-orange-300 gap-1 justify-center">
              <Tooltip
                title="Rolling Average Position"
                className="flex"
                color="rgba(41, 37, 36, 0.8)"
              >
                {user.rollingAveragePosition &&
                  `P${user.rollingAveragePosition}`}
                <CgInfo className="text-sm text-gray-50" />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-center pr-2 xs:pr-4 md:pr-6 py-1">
          <div className="text-orange-300">
            {user.annualGamesPlayedPercentage <= 0.5 ? (
              <div className="inline-flex items-center gap-1 text-lg">
                No Rank{" "}
                <Tooltip
                  title={`To be ranked you need to play more than 50% of the weeks over the past year; play ${Math.floor(
                    27 - user.annualGamesPlayedPercentage * 52
                  )} more weeks.`}
                  color="rgba(41, 37, 36, 0.8)"
                >
                  <CgInfo className="text-gray-50" />
                </Tooltip>
              </div>
            ) : (
              <div>Rank {user.annualRank}</div>
            )}
          </div>
          <div className="text-gray-50 text-sm">
            <Tooltip title="Annual Win Percentage">
              {user.annualWinPercentage}%
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
