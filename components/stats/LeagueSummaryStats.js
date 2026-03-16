"use client";

import {
  GiCalendar,
  GiFireShield,
  GiOctoman,
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
    topDesigners,
  } = leagueStats;

  const counts = weeklyPlayerCounts.map((w) => w.count);

  return (
    <div className="flex flex-col gap-4 w-full pb-2">
      {/* ── Participation ── */}
      <SectionLabel>Participation</SectionLabel>

      {/* Row 1 — Trophy cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
      </div>

      {/* Row 2 — Table stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        <RankListCard
          icon={GiPinballFlipper}
          label="Top Manufacturers (min 8 weeks)"
          items={topMakers}
          nameKey="maker"
        />
        <RankListCard
          icon={GiCalendar}
          label="Top Eras"
          items={topEras}
          nameKey="era"
        />
        <div className="md:col-span-2 xl:col-span-1">
          <RankListCard
            icon={GiOctoman}
            label="Top Designers (min 8 weeks)"
            items={topDesigners}
            nameKey="designer"
          />
        </div>
      </div>

      {/* Row 3 — Participation Stats & Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 items-stretch">
        <div className="lg:col-span-1 flex flex-col">
          <ParticipationCard
            playersAllTime={playersAllTime}
            players52={players52}
            players13={players13}
            className="h-full"
          />
        </div>

        <div className="lg:col-span-2 flex flex-col">
          <AvgPlayersCard
            rollingAvg52={rollingAvg52}
            prevAvg52={prevAvg52}
            rollingAvg13={rollingAvg13}
            prevAvg13={prevAvg13}
            counts={counts}
            className="h-full"
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3 flex flex-col">
          <PlayersPerWeekChart
            weeklyPlayerCounts={weeklyPlayerCounts}
            className="h-full"
          />
        </div>
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

      <hr className="border-orange-500 dark:border-orange-950" />
    </div>
  );
}
