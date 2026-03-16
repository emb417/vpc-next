import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";
import SectionLabel from "@/components/stats/SectionLabel";

export default function WeeklyRaffle() {
  return (
    <div className="space-y-4">
      <SectionLabel>
        <div className="flex items-center gap-2">
          <FaTicketAlt className="text-orange-500" />
          Weekly Table Raffle
        </div>
      </SectionLabel>
      <div className="bg-stone-100 dark:bg-stone-900 border border-orange-500 dark:border-orange-950 rounded-xl p-6 text-stone-700 dark:text-stone-300 space-y-4 text-sm">
        <p>
          Each week, one table is randomly selected for next week&apos;s
          competition based on player entries.
        </p>

        <div className="space-y-2">
          <h4 className="text-orange-700 dark:text-orange-300 font-bold">How to Enter</h4>
          <p>
            After posting a score, use <code>/enter-raffle</code> with a VPS ID
            or URL.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-orange-700 dark:text-orange-300 font-bold">Earn Tickets (Max 7)</h4>
          <ul className="list-none space-y-1">
            <li>
              🏆 <strong>Performance:</strong> +1 for posting, +1 for Top 10, +2
              for Top 3 (Max 4)
            </li>
            <li>
              🔥 <strong>Persistence:</strong> +1 for each of the previous 4
              weeks you posted a score (Max 3)
            </li>
          </ul>
        </div>

        <div className="space-y-2 border-t border-orange-300/50 dark:border-orange-950/50 pt-2">
          <h4 className="text-orange-700 dark:text-orange-300 font-bold">Qualifying Tables</h4>
          <p>
            Tables on the{" "}
            <Link
              href="https://docs.google.com/spreadsheets/d/1cQoj3uVV78KGRRJqWSiJSbSZ-LLP5Kp1M2aNMCJj4X4/edit?usp=sharing)"
              target="_blank"
              className="text-orange-700 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300"
            >
              Approved List
            </Link>{" "}
            are pre-qualified. Others require a combined{" "}
            <strong>3 🏆 Trophies</strong> from players who enter it to qualify.
          </p>
          <p className="text-xs italic text-stone-500 dark:text-stone-500 mt-2">
            Check /show-raffle-board for the Pending (⏳) icon.
          </p>
        </div>
      </div>
    </div>
  );
}
