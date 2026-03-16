import { FaTrophy } from "react-icons/fa";
import SectionLabel from "@/components/stats/SectionLabel";
import Link from "next/link";

export default function LeagueInfo() {
  return (
    <div className="space-y-4">
      <SectionLabel>
        <div className="flex items-center gap-2">
          <FaTrophy className="text-orange-500" />
          Pinball League
        </div>
      </SectionLabel>
      <div className="bg-stone-100 dark:bg-stone-900 border border-orange-500 dark:border-orange-950 rounded-xl p-6 text-stone-700 dark:text-stone-300 space-y-4 text-sm">
        <div>
          <h4 className="text-orange-700 dark:text-orange-300 font-bold">Points Structure</h4>
          <p className="text-xs text-stone-500 mt-1">
            Participation automatically accumulates points.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>1st Place</span>
            <span className="text-orange-700 dark:text-orange-400">12 pts</span>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>2nd Place</span>
            <span className="text-orange-700 dark:text-orange-400">10 pts</span>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>3rd Place</span>
            <span className="text-orange-700 dark:text-orange-400">9 pts</span>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>4th Place</span>
            <span className="text-orange-700 dark:text-orange-400">8 pts</span>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>5th Place</span>
            <span className="text-orange-700 dark:text-orange-400">7 pts</span>
          </div>
          <div className="bg-stone-200 dark:bg-stone-950 p-2 rounded border border-orange-300/30 dark:border-orange-950/30 flex justify-between">
            <span>6th - 10th</span>
            <span className="text-orange-700 dark:text-orange-400">6-2 pts</span>
          </div>
        </div>

        <div>
          <h4 className="text-orange-700 dark:text-orange-300 font-bold">Participation</h4>
          <p>
            All players get at least 1 point for each week they participate in.
          </p>
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
