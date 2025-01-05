import Link from "next/link";
import PlayerPane from "@/components/player/PlayerPane";
import PlayerInsightItem from "@/components/player/PlayerInsightItem";

export default function PlayerSummary({ user }) {
  return (
    <div className="flex flex-col w-full text-stone-200 gap-4">
      <PlayerPane
        title="The Best of Times and The Worst of Times"
        className="flex flex-col md:flex-row items-center md:items-start"
      >
        <PlayerInsightItem title="Best Performance to Average">
          {user.bestPerformance.week !== 0 && (
            <Link
              href={`/competitions?week=${user.bestPerformance.week}`}
            >
              <span className="text-sm">
                P{user.bestPerformance.position} of{" "}
                {user.bestPerformance.players}
                <span className="text-stone-200"> | </span>
                {user.bestPerformance.table}
              </span>
            </Link>
          )}
          {user.bestPerformance.week === 0 && (
            <span className="text-sm">
              P{user.bestPerformance.position} of{" "}
              {user.bestPerformance.players}
              <span className="text-stone-200"> | </span>
              {user.bestPerformance.table}
            </span>
          )}
        </PlayerInsightItem>
        <PlayerInsightItem title="Worst Performance to Average">
          {user.worstPerformance.week !== 0 && (
            <Link
              href={`/competitions?week=${user.worstPerformance.week}`}
            >
              <span className="text-sm">
                P{user.worstPerformance.position} of{" "}
                {user.worstPerformance.players}
                <span className="text-stone-200"> | </span>
                {user.worstPerformance.table}
              </span>
            </Link>
          )}
          {user.worstPerformance.week === 0 && (
            <span className="text-sm">
              P{user.worstPerformance.position} of{" "}
              {user.worstPerformance.players}
              <span className="text-stone-200"> | </span>
              {user.worstPerformance.table}
            </span>
          )}
        </PlayerInsightItem>
      </PlayerPane>
    </div>
  );
}
