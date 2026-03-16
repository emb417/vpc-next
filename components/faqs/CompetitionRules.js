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
      </div>
    </div>
  );
}
