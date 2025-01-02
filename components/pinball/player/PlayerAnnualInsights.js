import Link from "next/link";
import PlayerPane from "@/components/pinball/player/PlayerPane";
import PlayerSummaryItem from "@/components/pinball/player/PlayerSummaryItem";

export default function PlayerSummary({ user }) {
  return (
    <div className="flex flex-col w-full text-stone-200 gap-4">
      <PlayerPane
        title="Annual Insights"
        className="flex flex-col md:flex-row items-center md:items-start"
      >
        <PlayerSummaryItem title="Best Game to Average">
          {user.annualBestPerformance.week !== 0 && (
            <Link
              href={`/competitions?week=${user.annualBestPerformance.week}`}
            >
              <span className="text-sm">
                P{user.annualBestPerformance.position} of{" "}
                {user.annualBestPerformance.players}
                <span className="text-stone-200"> | </span>
                {user.annualBestPerformance.table}
              </span>
            </Link>
          )}
          {user.annualBestPerformance.week === 0 && (
            <span className="text-sm">
              P{user.annualBestPerformance.position} of{" "}
              {user.annualBestPerformance.players}
              <span className="text-stone-200"> | </span>
              {user.annualBestPerformance.table}
            </span>
          )}
        </PlayerSummaryItem>
        <PlayerSummaryItem title="Worst Game to Average">
          {user.annualWorstPerformance.week !== 0 && (
            <Link
              href={`/competitions?week=${user.annualWorstPerformance.week}`}
            >
              <span className="text-sm">
                P{user.annualWorstPerformance.position} of{" "}
                {user.annualWorstPerformance.players}
                <span className="text-stone-200"> | </span>
                {user.annualWorstPerformance.table}
              </span>
            </Link>
          )}
          {user.annualWorstPerformance.week === 0 && (
            <span className="text-sm">
              P{user.annualWorstPerformance.position} of{" "}
              {user.annualWorstPerformance.players}
              <span className="text-stone-200"> | </span>
              {user.annualWorstPerformance.table}
            </span>
          )}
        </PlayerSummaryItem>
      </PlayerPane>
    </div>
  );
}
