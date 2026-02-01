import { CgInfo } from "react-icons/cg";
import { Tooltip } from "antd";
import PlayerImage from "@/components/player/PlayerImage";

export default function PlayerBio({ user }) {
  const renderStat = (value, prefix = "", suffix = "", fallbackLabel = "") => {
    if (typeof value === "number") {
      return `${prefix}${value}${suffix}`;
    } else if (value !== undefined && value !== null) {
      return `${prefix}${value}${suffix}`;
    } else {
      return fallbackLabel ? `${fallbackLabel} N/A` : "N/A";
    }
  };

  const weeksPlayed =
    typeof user.weeksPlayed === "number" ? user.weeksPlayed : 0;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row w-full gap-1 rounded-full bg-stone-900">
        <div className="flex flex-row w-1/2 items-center gap-2">
          <PlayerImage
            src={user.userAvatarUrl}
            width={58}
            height={58}
            alt={user.username}
            fallbackClassName="w-10 h-10"
          />
          <div className="flex flex-col truncate text-stone-200">
            <div className="text-sm truncate">{user.username}</div>
            <div className="text-xl text-orange-300">
              <Tooltip
                title="Average position over the past 13 weeks."
                className="flex"
                color="rgba(41, 37, 36, 0.8)"
              >
                {renderStat(user.averagePosition, "P", "", "P")}
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex w-1/4 flex-col justify-center">
          <Tooltip
            title="Win and loss record over the past 13 weeks.
            Wins are accumulated over the weeks based on how many players finished lower than you each week.
            Losses are accumulated over the weeks based on how many players finished higher than you each week."
            color="rgba(41, 37, 36, 0.8)"
          >
            <div className="flex flex-col items-center justify-center text-xs">
              <div className="flex flex-row items-center text-orange-300 truncate">
                Recent Record
              </div>
              <div className="flex flex-row items-center text-stone-200">
                {renderStat(user.wins, "", " Wins", "Wins")}
              </div>
              <div className="flex flex-row items-center text-stone-200">
                {renderStat(user.losses, "", " Losses", "Losses")}
              </div>
            </div>
          </Tooltip>
        </div>
        <div className="flex w-1/4 flex-col items-center justify-center">
          {weeksPlayed <= 6 ? (
            <div className="flex flex-row items-center text-orange-300 text-xs">
              No Rank
              <Tooltip
                title={`Play ${Math.floor(
                  7 - weeksPlayed,
                )} more weeks to be ranked;
                you need to play 7 weeks out of the past 13 weeks to be ranked,
                i.e., more than 50% of the weeks.`}
                color="rgba(41, 37, 36, 0.8)"
              >
                <CgInfo className="text-stone-100 text-sm" />
              </Tooltip>
            </div>
          ) : (
            <Tooltip
              title="Power ranking based on win percentage over the past 13 weeks."
              color="rgba(41, 37, 36, 0.8)"
            >
              <div className="text-xl text-orange-300">
                {renderStat(user.rank, "R", "", "R")}
              </div>
            </Tooltip>
          )}
          <div className="text-stone-200 text-sm">
            <Tooltip
              title="Win percentage over the past 13 weeks based on recent record."
              color="rgba(41, 37, 36, 0.8)"
            >
              {renderStat(user.winPercentage, "", "%", "Win %")}{" "}
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
