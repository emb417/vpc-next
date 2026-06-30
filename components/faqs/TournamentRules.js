import { FaListOl } from "react-icons/fa";
import SectionLabel from "@/components/stats/SectionLabel";

export default function TournamentRules() {
  return (
    <div className="space-y-4">
      <SectionLabel>
        <div className="flex items-center gap-2">
          <FaListOl className="text-orange-500" />
          Tournaments Rules
        </div>
      </SectionLabel>
      <div className="bg-stone-100 dark:bg-stone-900 border border-orange-500 dark:border-orange-950 rounded-xl p-6 text-stone-700 dark:text-stone-300 space-y-4 text-sm leading-relaxed">
        <p className="text-orange-700 dark:text-orange-200 font-semibold italic">
          &quot;Tournaments are multi-table events — battle across every table to
          climb the overall standings!&quot;
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Each tournament runs <strong>multiple tables</strong> over a set
            start and end window. Scores only count while the tournament is{" "}
            <strong>open</strong>.
          </li>
          <li>
            Post your scores in the tournament&apos;s own Discord channel (the
            <strong> #channel</strong> shown on its dashboard card).
          </li>
          <li>
            When posting, <strong>select the correct table</strong> — the table
            is required and chosen from the tournament&apos;s table list.
          </li>
          <li>
            You <strong>MUST</strong> use the specified table and version for
            each table in the tournament.
          </li>
          <li>
            No table or script modifications allowed that affect gameplay
            (including ROM selection).
          </li>
          <li>
            Number of balls per game <strong>MUST NOT</strong> be modified.
          </li>
          <li>No EXTRA BALL buy-ins allowed.</li>
          <li>
            Only <strong>SINGLE-PLAYER</strong> games allowed.
          </li>
          <li>
            Techniques such as &quot;Death Saves&quot; and &quot;Bangbacks&quot;
            are <strong>banned</strong>. &quot;Lazarus&quot; bounces are
            permitted as they are mechanical in nature.
          </li>
          <li>
            Post a pic/screenshot of your score (including backglass and full
            table) for entry.
          </li>
          <li>
            Scores must be posted during the Match Sequence or Credit Award.
            High score roster photos (Grand Champion, etc.) are{" "}
            <strong>not allowed</strong> as we cannot verify when they were
            taken.
          </li>
          <li>
            Rollovers require proof (photo or video) prior to the rollover.
          </li>
          <li>
            Points are earned <strong>per table</strong> and summed across all
            tables for the overall standings (see Tournaments Points).
          </li>
        </ul>

        <div className="bg-stone-200 dark:bg-stone-950 p-3 rounded-lg border border-stone-300 dark:border-stone-800">
          <p className="text-xs text-stone-500 uppercase font-bold mb-1">
            Post a Score{" "}
            <span className="text-xs text-stone-600 dark:text-stone-400 lowercase">
              (Photo + Table Required)
            </span>
          </p>
          <p>
            <code>/post-tournament-score</code> - Post a score (select the table)
          </p>
          <p>
            <code>/show-tournament</code> - View the current tournament and its
            tables
          </p>
        </div>
      </div>
    </div>
  );
}
