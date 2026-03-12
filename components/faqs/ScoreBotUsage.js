import { FaRobot } from "react-icons/fa";
import SectionLabel from "@/components/stats/SectionLabel";

export default function ScoreBotUsage() {
  return (
    <div className="space-y-4">
      <SectionLabel>
        <div className="flex items-center gap-2">
          <FaRobot className="text-orange-500" />
          How to use Score Bot
        </div>
      </SectionLabel>
      <div className="bg-stone-900 border border-orange-950 rounded-xl p-6 text-stone-300 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-stone-300">
              Virtual Pinball Chat uses a Discord bot to track both weekly
              competition scores and high scores outside of the weekly
              competition. The bot also manages raffle entries and automates
              weekly competition table selections.
            </p>
          </div>
          <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
            <p className="text-xs text-stone-500 uppercase font-bold mb-1">
              Post a Score{" "}
              <span className="text-xs text-stone-600 lowercase">
                (Photo Required)
              </span>
            </p>
            <p className="text-sm">
              <code>/post-score</code>
            </p>
            <p className="text-sm">
              Or: <code className="text-orange-300">!score &lt;value&gt;</code>{" "}
              <span className="text-xs text-stone-400">(attach photo)</span>
            </p>
            <p className="text-xs text-stone-500 italic">
              Example: !score 12000000
            </p>
          </div>
          <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
            <p className="text-xs text-stone-500 uppercase font-bold mb-1">
              View Info
            </p>
            <p className="text-sm">
              <code>/show-score</code> - View your current score info
            </p>
            <p className="text-sm">
              <code>/show-leaderboard</code> - View the current leaderboard
            </p>
          </div>
          <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
            <p className="text-xs text-stone-500 uppercase font-bold mb-1">
              Raffle Commands
            </p>
            <p className="text-sm">
              <code>/enter-raffle</code> - Enter a table
            </p>
            <p className="text-sm">
              <code>/show-raffle-board</code> - Monitor entries
            </p>
            <p className="text-sm">
              <code>/show-raffle-rules</code> - Full raffle rules
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
