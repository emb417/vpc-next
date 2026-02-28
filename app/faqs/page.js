import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  FaDiscord,
  FaTicketAlt,
  FaRobot,
  FaTrophy,
  FaListOl,
} from "react-icons/fa";
import SectionLabel from "@/components/stats/SectionLabel";

export const metadata = {
  title: "How to Join | Virtual Pinball Chat",
  description:
    "Learn how to join the Virtual Pinball Chat league, participate in weekly competitions, and use our Discord bot for score tracking.",
};

export default function FaqsPage() {
  return (
    <div className="flex flex-col w-full items-center mb-14 py-4 px-2">
      <div className="w-full max-w-5xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-orange-300">
            Join the Competition
          </h1>
          <p className="text-stone-400 text-lg">
            Welcome to the hub of the Virtual Pinball Chat community!
          </p>
          <div className="flex justify-center pt-4">
            <a
              href="https://discord.gg/9WnaJHXg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-full font-bold transition-colors duration-300"
            >
              <FaDiscord size={24} />
              Join our Discord
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Competition Corner Rules */}
          <div className="space-y-4">
            <SectionLabel>
              <div className="flex items-center gap-2">
                <FaListOl className="text-orange-500" />
                Competition Corner Rules
              </div>
            </SectionLabel>
            <div className="bg-stone-900 border border-orange-950 rounded-xl p-6 text-stone-300 space-y-4 text-sm leading-relaxed">
              <p className="text-orange-200 font-semibold italic">
                &quot;Welcome to COMPETITION CORNER where we all play the Table
                of the Week!&quot;
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Check the Leaderboard pin in Discord for the current table
                  link. You <strong>MUST</strong> use the specified table and
                  version.
                </li>
                <li>
                  No table or script modifications allowed that affect gameplay
                  (including ROM selection).
                </li>
                <li>
                  Number of balls per game <strong>MUST NOT</strong> be
                  modified.
                </li>
                <li>No EXTRA BALL buy-ins allowed.</li>
                <li>
                  Only <strong>SINGLE-PLAYER</strong> games allowed.
                </li>
                <li>
                  Techniques such as &quot;Death Saves&quot; and
                  &quot;Bangbacks&quot; are <strong>banned</strong>.
                  &quot;Lazarus&quot; bounces are permitted as they are
                  mechanical in nature.
                </li>
                <li>
                  Post a pic/screenshot of your score (including backglass and
                  full table) in the Discord channel for entry.
                </li>
                <li>
                  Scores must be posted during the Match Sequence or Credit
                  Award. High score roster photos (Grand Champion, etc.) are{" "}
                  <strong>not allowed</strong> as we cannot verify when they
                  were taken.
                </li>
                <li>
                  Rollovers require proof (photo or video) prior to the
                  rollover.
                </li>
                <li>
                  Scores must be posted by{" "}
                  <strong>Sunday, midnight Pacific time</strong>.
                </li>
              </ul>
            </div>
          </div>

          {/* Score Bot Usage */}
          <div className="space-y-4">
            <SectionLabel>
              <div className="flex items-center gap-2">
                <FaRobot className="text-orange-500" />
                How to use Score Bot
              </div>
            </SectionLabel>
            <div className="bg-stone-900 border border-orange-950 rounded-xl p-6 text-stone-300 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
                  <p className="text-xs text-stone-500 uppercase font-bold mb-1">
                    Post a Score
                  </p>
                  <code className="text-orange-300">!score &lt;value&gt;</code>{" "}
                  <span className="text-xs text-stone-400">(attach photo)</span>
                  <p className="text-sm mt-1">
                    Or use the slash command: <code>/post-score</code>
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
                    <code>/show-leaderboard</code> - View the current
                    leaderboard
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

          {/* Weekly Raffle */}
          <div className="space-y-4">
            <SectionLabel>
              <div className="flex items-center gap-2">
                <FaTicketAlt className="text-orange-500" />
                Weekly Table Raffle
              </div>
            </SectionLabel>
            <div className="bg-stone-900 border border-orange-950 rounded-xl p-6 text-stone-300 space-y-4 text-sm">
              <p>
                Each week, one table is randomly selected for next week&apos;s
                competition based on player entries.
              </p>

              <div className="space-y-2">
                <h4 className="text-orange-300 font-bold">How to Enter</h4>
                <p>
                  After posting a score, use <code>/enter-raffle</code> with a
                  VPS ID or URL.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-orange-300 font-bold">
                  Earn Tickets (Max 7)
                </h4>
                <ul className="list-none space-y-1">
                  <li>
                    🏆 <strong>Performance:</strong> +1 for posting, +1 for Top
                    10, +2 for Top 3 (Max 4)
                  </li>
                  <li>
                    🔥 <strong>Persistence:</strong> +1 for each of the previous
                    4 weeks you posted a score (Max 3)
                  </li>
                </ul>
              </div>

              <div className="space-y-2 border-t border-orange-950/50 pt-2">
                <h4 className="text-orange-300 font-bold">Qualifying Tables</h4>
                <p>
                  Tables on the Approved List are pre-qualified. Others require
                  a combined <strong>3 🏆 Trophies</strong> from players who
                  enter it to qualify.
                </p>
                <p className="text-xs italic text-stone-500 mt-2">
                  Check /show-raffle-board for the Pending (⏳) icon.
                </p>
              </div>
            </div>
          </div>

          {/* League Info */}
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

          {/* High Score Corner */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <SectionLabel>
              <div className="flex items-center gap-2">
                <FaListOl className="text-orange-500" />
                High Score Corner
              </div>
            </SectionLabel>
            <div className="bg-stone-900 border border-orange-950 rounded-xl p-6 text-stone-300 space-y-6">
              <p>
                Search, track, and post high scores in a structured manner
                outside of the weekly competition.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2">
                  <h5 className="text-orange-300 font-bold text-sm">
                    Post High Score
                  </h5>
                  <p className="text-xs">
                    <code>!high &lt;score&gt; &lt;table&gt;</code>
                  </p>
                  <p className="text-xs text-stone-500 italic">
                    Example: !high 12000000 cactus
                  </p>
                  <p className="text-xs mt-2 font-bold text-red-400">
                    REQUIRED: Attach a photo with the command!
                  </p>
                </div>
                <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2">
                  <h5 className="text-orange-300 font-bold text-sm">
                    Search Tables
                  </h5>
                  <p className="text-xs">
                    <code>/show-table-lists</code>
                  </p>
                  <p className="text-xs">
                    <code>/show-table-high-scores &lt;term&gt;</code>
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
        </div>

        {/* Footer info */}
        <div className="text-center text-stone-500 text-sm pt-8 border-t border-orange-950/30">
          <p>Questions? Contact the moderators in the Discord channel.</p>
          <p className="mt-2">Happy Flipping!</p>
        </div>
      </div>
    </div>
  );
}
