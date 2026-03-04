import { FaListOl } from "react-icons/fa";
import SectionLabel from "@/components/stats/SectionLabel";

export default function HighScoreCorner() {
  return (
    <div className="col-span-1 md:col-span-2 space-y-4">
      <SectionLabel>
        <div className="flex items-center gap-2">
          <FaListOl className="text-orange-500" />
          High Score Corner
        </div>
      </SectionLabel>
      <div className="bg-stone-900 border border-orange-950 rounded-xl p-6 text-stone-300 space-y-6">
        <p>
          Search, track, and post high scores in a structured manner outside of
          the weekly competition.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2">
            <h5 className="text-orange-300 font-bold text-sm">
              Post High Score{" "}
              <span className="text-xs text-stone-500 lowercase">
                (Photo Required)
              </span>
            </h5>
            <p className="text-xs">
              <code>/post-high-score</code>
            </p>
            <p className="text-xs">
              Or: <code>!high &lt;score&gt; &lt;tablesearchterm&gt;</code>
            </p>
            <p className="text-xs text-stone-500 italic">
              Example: !high 12000000 cactus
            </p>
          </div>
          <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2">
            <h5 className="text-orange-300 font-bold text-sm">Search Tables</h5>
            <p className="text-xs">
              <code>/show-table-lists</code>
            </p>
            <p className="text-xs">
              <code>/show-table-high-scores &lt;tablesearchterm&gt;</code>
            </p>
            <p className="text-xs text-stone-500 italic">
              Example: /show-table-high-scores tablesearchterm: cactus
            </p>
          </div>
          <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2">
            <h5 className="text-orange-300 font-bold text-sm">
              Propose New Tables
            </h5>
            <p className="text-xs">
              Provide the VPS ID in the channel and tag the moderators.
            </p>
            <p className="text-xs text-stone-500 italic">
              Example: Please add Skyway. VPS Id: qo-m1I-F
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
