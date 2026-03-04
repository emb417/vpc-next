import { FaTrophy } from "react-icons/fa";
import SectionLabel from "@/components/stats/SectionLabel";

export default function LeagueInfo() {
  return (
    <div className="space-y-4">
      <SectionLabel>
        <div className="flex items-center gap-2">
          <FaTrophy className="text-orange-500" />
          Pinball League
        </div>
      </SectionLabel>
      <div className="bg-stone-900 border border-orange-950 rounded-xl p-6 text-stone-300 space-y-4 text-sm">
        <div>
          <h4 className="text-orange-300 font-bold">Season Structure</h4>
          <p>Regular Season: 12 weeks | Playoffs: 4 weeks</p>
          <p className="text-xs text-stone-500 mt-1">
            Participation automatically accumulates season points.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-stone-950 p-2 rounded border border-orange-950/30 flex justify-between">
            <span>1st Place</span>
            <span className="text-orange-400">12 pts</span>
          </div>
          <div className="bg-stone-950 p-2 rounded border border-orange-950/30 flex justify-between">
            <span>2nd Place</span>
            <span className="text-orange-400">10 pts</span>
          </div>
          <div className="bg-stone-950 p-2 rounded border border-orange-950/30 flex justify-between">
            <span>3rd Place</span>
            <span className="text-orange-400">9 pts</span>
          </div>
          <div className="bg-stone-950 p-2 rounded border border-orange-950/30 flex justify-between">
            <span>4th Place</span>
            <span className="text-orange-400">8 pts</span>
          </div>
          <div className="bg-stone-950 p-2 rounded border border-orange-950/30 flex justify-between">
            <span>5th Place</span>
            <span className="text-orange-400">7 pts</span>
          </div>
          <div className="bg-stone-950 p-2 rounded border border-orange-950/30 flex justify-between">
            <span>6th - 10th</span>
            <span className="text-orange-400">6-2 pts</span>
          </div>
        </div>

        <div>
          <h4 className="text-orange-300 font-bold">Playoff Format</h4>
          <p>
            Top 16 players advance to the{" "}
            <strong>Tournament of Champions</strong>.
          </p>
          <p>Single elimination, S-curve seeding (1 vs 16, etc.).</p>
        </div>
      </div>
    </div>
  );
}
