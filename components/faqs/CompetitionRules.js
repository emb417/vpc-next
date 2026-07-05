import Link from "next/link";
import { FaListOl } from "react-icons/fa";
import SectionLabel from "@/components/stats/SectionLabel";

export default function CompetitionRules() {
  return (
    <div className="space-y-4">
      <SectionLabel>
        <div className="flex items-center gap-2">
          <FaListOl className="text-orange-500" />
          Competition Corner Rules
        </div>
      </SectionLabel>
      <div className="bg-stone-100 dark:bg-stone-900 border border-orange-500 dark:border-orange-950 rounded-xl p-6 text-stone-700 dark:text-stone-300 space-y-4 text-sm leading-relaxed">
        <p className="text-orange-700 dark:text-orange-200 font-semibold italic">
          &quot;Welcome to COMPETITION CORNER where we all play the Table of the
          Week!&quot;
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Check the Leaderboard pin in Discord for the current table link. You{" "}
            <strong>MUST</strong> use the specified table and version.
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
            table) in the Discord channel for entry.
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
            Scores must be posted by{" "}
            <strong>Sunday, midnight Pacific time</strong>.
          </li>
        </ul>

        <div className="bg-stone-200 dark:bg-stone-950 p-3 rounded-lg border border-stone-300 dark:border-stone-800">
          <p className="text-xs text-stone-500 uppercase font-bold mb-1">
            Post a Score{" "}
            <span className="text-xs text-stone-600 dark:text-stone-400 lowercase">
              (Photo Required)
            </span>
          </p>
          <p>
            <code>/post-score</code>
          </p>
          <div className="mt-2 pt-2 border-t border-stone-300/50 dark:border-stone-800">
            <p>
              <code>/show-score</code> - View your current score info
            </p>
            <p>
              <code>/show-leaderboard</code> - View the current leaderboard
            </p>
            <p>
              <code>/show-table-of-the-week</code> - View the current table and
              download links
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-orange-700 dark:text-orange-300 font-bold">
            Propose Table for Approved List
          </h4>
          <p>
            To request a new table to be added to the approved list, start a new
            thread in the{" "}
            <Link
              href="https://discord.com/channels/652274650524418078/1477084728535552042"
              target="_blank"
              className="text-orange-700 dark:text-orange-400 hover:text-orange-300 dark:hover:text-orange-300"
            >
              Curated List
            </Link>{" "}
            forum. Check the Post Guidelines for more info.
          </p>
        </div>
      </div>
    </div>
  );
}
