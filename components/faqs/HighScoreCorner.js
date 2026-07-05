import { FaListOl } from "react-icons/fa";
import SectionLabel from "@/components/stats/SectionLabel";

export default function HighScoreCorner() {
  return (
    <div className="space-y-4">
      <SectionLabel>
        <div className="flex items-center gap-2">
          <FaListOl className="text-orange-500" />
          High Score Corner
        </div>
      </SectionLabel>
      <div className="bg-stone-100 dark:bg-stone-900 border border-orange-500 dark:border-orange-950 rounded-xl p-6 text-stone-700 dark:text-stone-300 space-y-6">
        <p>
          Post and search high scores (using VPS ID or Table URL) outside of the
          weekly competition.
        </p>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-stone-200 dark:bg-stone-950 p-4 rounded-lg border border-stone-300 dark:border-stone-800 space-y-2">
            <h5 className="text-orange-700 dark:text-orange-300 font-bold text-sm">
              Post High Score{" "}
              <span className="text-xs text-stone-500 lowercase">
                (Photo Required)
              </span>
            </h5>
            <p className="text-xs">
              <code>/post-high-score</code>
            </p>
            <p className="text-xs text-stone-500 italic">
              Use table VPS ID or URL or table name search terms.
            </p>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-4 rounded-lg border border-stone-300 dark:border-stone-800 space-y-2">
            <h5 className="text-orange-700 dark:text-orange-300 font-bold text-sm">
              Search High Scores
            </h5>
            <p className="text-xs">
              <code>/show-table-high-scores</code>
            </p>
            <p className="text-xs text-stone-500 italic">
              Example: /show-table-high-scores tablesearchterm: cactus
            </p>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-4 rounded-lg border border-stone-300 dark:border-stone-800 space-y-2">
            <h5 className="text-orange-700 dark:text-orange-300 font-bold text-sm">
              New Tables
            </h5>
            <p className="text-xs">
              Posting a score for a new table will automatically create the new
              table.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
