"use client";

import {
  GiCalendar,
  GiFireShield,
  GiPolarStar,
  GiStarsStack,
  GiCheckeredFlag,
  GiTrophyCup,
  GiTrophiesShelf,
  GiUpgrade,
  GiPinballFlipper,
} from "react-icons/gi";

import TrophyShelfCard from "./TrophyShelfCard";
import AwardCard from "./AwardCard";
import SectionLabel from "./SectionLabel";
import ParticipationCard from "./ParticipationCard";
import AvgPlayersCard from "./AvgPlayersCard";
import RankListCard from "./RankListCard";
import PlayersPerWeekChart from "./PlayersPerWeekChart";

// ── Main Component ────────────────────────────────────────────────────────────
export default function LeagueSummaryStats({ leagueStats }) {
  const {
    weeklyPlayerCounts,
    rollingAvg13,
    rollingAvg52,
    prevAvg13,
    prevAvg52,
    playersAllTime,
    players52,
    players13,
    mostPoints52,
    mostPoints13,
    bestWinPct52,
    bestWinPct13,
    mostImproved13,
    mostImproved52,
    mostActive52,
    mostActive13,
    topMakers,
    topEras,
  } = leagueStats;

  const counts = weeklyPlayerCounts.map((w) => w.count);

  return (
    <div className="flex flex-col gap-4 w-full pb-2">
      {/* ── Participation ── */}
      <SectionLabel>Participation</SectionLabel>

      {/* Row 1 — Trophy cards + Table stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2">
        <TrophyShelfCard
          icon={GiTrophyCup}
          label="Most Points"
          windows={[
            {
              label: "52 Weeks",
              player: mostPoints52,
              sub: (p) => `${p.totalPoints52?.toLocaleString()} pts`,
            },
            {
              label: "13 Weeks",
              player: mostPoints13,
              sub: (p) => `${p.recentTotalPoints?.toLocaleString()} pts`,
            },
          ]}
        />
        <TrophyShelfCard
          icon={GiStarsStack}
          label="Best Win Rate"
          windows={[
            {
              label: "52 Weeks",
              player: bestWinPct52,
              sub: (p) =>
                `${Number(p._pct ?? p.recentWinPercentage).toFixed(1)}%`,
            },
            {
              label: "13 Weeks",
              player: bestWinPct13,
              sub: (p) => `${Number(p.recentWinPercentage).toFixed(1)}%`,
            },
          ]}
        />
        <TrophyShelfCard
          icon={GiUpgrade}
          label="Most Improved"
          windows={[
            {
              label: "52 Weeks",
              player: mostImproved52,
              sub: (p) => `+${p.improvement.toFixed(1)} pos`,
            },
            {
              label: "13 Weeks",
              player: mostImproved13,
              sub: (p) => `+${p.improvement.toFixed(1)} pos`,
            },
          ]}
        />
        <TrophyShelfCard
          icon={GiFireShield}
          label="Most Active"
          windows={[
            {
              label: "52 Weeks",
              player: mostActive52,
              sub: (p) => `${p.weeksPlayed52} weeks`,
            },
            {
              label: "13 Weeks",
              player: mostActive13,
              sub: (p) => `${p.recentWeeksPlayed} weeks`,
            },
          ]}
        />

        <RankListCard
          icon={GiPinballFlipper}
          label="Top Makers By Players"
          items={topMakers}
          nameKey="maker"
        />

        <RankListCard
          icon={GiCalendar}
          label="Top Eras By Players"
          items={topEras}
          nameKey="era"
        />
      </div>

      {/* Row 2 — Participation Stats & Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <ParticipationCard
          playersAllTime={playersAllTime}
          players52={players52}
          players13={players13}
        />

        <AvgPlayersCard
          rollingAvg52={rollingAvg52}
          prevAvg52={prevAvg52}
          rollingAvg13={rollingAvg13}
          prevAvg13={prevAvg13}
          counts={counts}
        />

        <PlayersPerWeekChart weeklyPlayerCounts={weeklyPlayerCounts} />
      </div>

      {/* ── All-Time Honors Board ── */}
      <SectionLabel>All-Time Honors Board</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <AwardCard
          icon={GiTrophyCup}
          label="Most Points"
          players={leagueStats.topMostPoints}
          sub={(p) => `${p.totalPoints?.toLocaleString()} pts`}
        />
        <AwardCard
          icon={GiFireShield}
          label="Most Active"
          players={leagueStats.topMostActive}
          sub={(p) => `${p.weeksPlayed} weeks`}
        />
        <AwardCard
          icon={GiPolarStar}
          label="Most Wins"
          players={leagueStats.topMostWins}
          sub={(p) => `${p.wins?.toLocaleString()} wins`}
        />
        <AwardCard
          icon={GiStarsStack}
          label="Best Win Rate"
          players={leagueStats.topBestWinPct}
          sub={(p) => `${p.winPercentage}%`}
        />
        <AwardCard
          icon={GiCheckeredFlag}
          label="Best Avg. Finish"
          players={leagueStats.topBestAvgPosition}
          sub={(p) => `P${p.averagePosition}`}
        />
        <AwardCard
          icon={GiTrophiesShelf}
          label="Best Avg. Points"
          players={leagueStats.topBestAvgPoints}
          sub={(p) => `${p.averagePoints} pts`}
        />
      </div>

      <hr className="border-orange-950" />
    </div>
  );
}
