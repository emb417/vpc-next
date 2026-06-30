import { FaFlagCheckered } from "react-icons/fa";
import SectionLabel from "@/components/stats/SectionLabel";

export default function TournamentPoints() {
  return (
    <div className="space-y-4">
      <SectionLabel>
        <div className="flex items-center gap-2">
          <FaFlagCheckered className="text-orange-500" />
          Tournaments Points
        </div>
      </SectionLabel>
      <div className="bg-stone-100 dark:bg-stone-900 border border-orange-500 dark:border-orange-950 rounded-xl p-6 text-stone-700 dark:text-stone-300 space-y-4 text-sm">
        <div>
          <h4 className="text-orange-700 dark:text-orange-300 font-bold">
            Points System
          </h4>
          <p className="text-xs text-stone-500 mt-1">
            Points are awarded per table based on your rank on that table.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>1st Place</span>
            <span className="text-orange-700 dark:text-orange-400">25 pts</span>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>2nd Place</span>
            <span className="text-orange-700 dark:text-orange-400">18 pts</span>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>3rd Place</span>
            <span className="text-orange-700 dark:text-orange-400">15 pts</span>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>4th Place</span>
            <span className="text-orange-700 dark:text-orange-400">12 pts</span>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>5th Place</span>
            <span className="text-orange-700 dark:text-orange-400">10 pts</span>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>6th - 10th</span>
            <span className="text-orange-700 dark:text-orange-400">
              8-1 pts
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-orange-700 dark:text-orange-300 font-bold">
            Overall Standings
          </h4>
          <p>
            Points are <strong>totaled across every table</strong> in the
            tournament. 11th place and below earn 1 point per table. Ties are
            broken by highest total raw score.
          </p>
        </div>
      </div>
    </div>
  );
}
