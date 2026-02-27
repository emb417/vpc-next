"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import {
  GiHumanPyramid,
  GiFireShield,
  GiMinions,
  GiPolarStar,
  GiStarsStack,
  GiCheckeredFlag,
  GiPerson,
  GiTrophyCup,
  GiTrophiesShelf,
  GiUpgrade,
} from "react-icons/gi";
import PlayerImage from "@/components/player/PlayerImage";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
);

// ── Sparkline ─────────────────────────────────────────────────────────────────
function Sparkline({
  data,
  color = "#f97316",
  tooltipLabel = (v) => ` ${v.toFixed(1)}`,
}) {
  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        data,
        borderColor: color,
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3,
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(41, 37, 36, 0.9)",
        callbacks: {
          title: () => "",
          label: (ctx) => tooltipLabel(ctx.parsed.y),
        },
      },
    },
    scales: { x: { display: false }, y: { display: false } },
  };
  return (
    <div className="w-full h-8 overflow-visible">
      <Line
        data={chartData}
        options={{ ...options, maintainAspectRatio: false }}
      />
    </div>
  );
}

// ── Trend Indicator ───────────────────────────────────────────────────────────
function TrendIndicator({ current, previous }) {
  if (!previous || Number(previous) === 0) return null;
  const diff = Number(current) - Number(previous);
  if (Math.abs(diff) < 0.05) return null;
  return diff > 0 ? (
    <span className="text-green-500 text-xs">▲ {diff.toFixed(1)}</span>
  ) : (
    <span className="text-red-500 text-xs">▼ {Math.abs(diff).toFixed(1)}</span>
  );
}

// ── Trophy Shelf Card (2 players side by side) ────────────────────────────────
function TrophyShelfCard({ icon: Icon, label, windows }) {
  return (
    <div className="flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
        <Icon className="text-orange-600 shrink-0 text-lg" />
        {label}
      </div>
      <div className="flex flex-row gap-2 justify-around items-center flex-1 w-full">
        {windows.map(({ label: winLabel, player, sub }) => (
          <div
            key={winLabel}
            className="flex flex-col items-center gap-1 w-1/2 min-w-0"
          >
            <span className="text-stone-500 text-xs">{winLabel}</span>
            {player ? (
              <Link
                href={`/player/${player.username}`}
                className="flex flex-col items-center gap-1 hover:text-orange-300 transition-colors min-w-0 w-full"
              >
                <PlayerImage
                  src={player.userAvatarUrl}
                  alt={player.username}
                  width={32}
                  height={32}
                  className="rounded-full shrink-0"
                />
                <span className="text-stone-100 text-xs font-semibold truncate w-full text-center leading-none">
                  {player.username}
                </span>
                <span className="text-orange-500 text-xs shrink-0 text-center">
                  {sub(player)}
                </span>
              </Link>
            ) : (
              <span className="text-stone-600 text-xs text-center">
                Not enough data
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Player Award Card (top N list) ────────────────────────────────────────────
function AwardCard({ icon: Icon, label, players, sub }) {
  if (!players?.length) return null;
  return (
    <div className="flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5 h-full">
      <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
        <Icon className="text-orange-600 shrink-0 text-lg" />
        {label}
      </div>
      <div className="flex flex-col gap-1">
        {players.map((player, i) => (
          <Link
            key={player.username}
            href={`/player/${player.username}`}
            className="flex items-center gap-1.5 hover:text-orange-300 transition-colors duration-200 min-w-0"
          >
            <span className="text-orange-700 text-xs shrink-0 w-4">
              {i + 1}.
            </span>
            <PlayerImage
              src={player.userAvatarUrl}
              alt={player.username}
              width={16}
              height={16}
              className="rounded-full shrink-0"
            />
            <span className="text-stone-100 text-xs font-semibold truncate leading-none">
              {player.username}
            </span>
            <span className="text-stone-500 text-xs shrink-0 ml-auto">
              {sub(player)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="text-lg text-stone-200 uppercase pl-1">{children}</div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LeagueSummaryStats({ leagueStats }) {
  const router = useRouter();

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
  } = leagueStats;

  const counts = weeklyPlayerCounts.map((w) => w.count);
  const labels = weeklyPlayerCounts.map((w) => `Wk ${w.weekNumber}`);

  const barChartOptions = {
    onClick: (_, elements) => {
      if (!elements || elements.length === 0) return;
      const weekNumber = weeklyPlayerCounts[elements[0].index]?.weekNumber;
      if (weekNumber) router.push(`/competitions?week=${weekNumber}`);
    },
    responsive: true,
    animation: { duration: 500 },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(41, 37, 36, 0.9)",
        callbacks: {
          title: (ctx) =>
            `Week ${weeklyPlayerCounts[ctx[0].dataIndex]?.weekNumber}`,
          label: (ctx) => ` ${ctx.raw} players`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#78716c",
          font: { size: 10 },
          maxTicksLimit: 20,
          maxRotation: 0,
        },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#78716c", font: { size: 10 } },
        grid: { color: "rgba(120,113,108,0.15)" },
        min: 0,
      },
    },
  };

  const barChartData = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: "rgba(194, 65, 12, 0.6)",
        borderColor: "rgba(194, 65, 12, 1)",
        borderWidth: 1,
        borderRadius: 2,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4 w-full pb-2">
      {/* ── Participation ── */}
      <SectionLabel>Participation</SectionLabel>

      {/* Row 1 — Trophy cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
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
      </div>

      {/* Row 2 — Stats + Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Total Players */}
        <div className="flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
            <GiHumanPyramid className="text-orange-600 shrink-0 text-lg" />
            Total Players
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "All Time", value: playersAllTime, pct: 100 },
              {
                label: "52 Weeks",
                value: players52,
                pct: Math.round((players52 / playersAllTime) * 100),
              },
              {
                label: "13 Weeks",
                value: players13,
                pct: Math.round((players13 / playersAllTime) * 100),
              },
            ].map(({ label, value, pct }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <div className="flex flex-row justify-between items-baseline">
                  <span className="text-stone-500 text-xs">{label}</span>
                  <span className="text-stone-100 text-xs font-semibold">
                    {value}{" "}
                    <span className="text-stone-600 font-normal">({pct}%)</span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-700 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avg Players / Week */}
        <div className="flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
            <GiPerson className="text-orange-600 shrink-0 text-lg" />
            Avg. Players / Week
          </div>
          <div className="flex flex-col gap-1 w-full">
            {[
              {
                label: "52 Weeks",
                value: rollingAvg52,
                prev: prevAvg52,
                spark: counts.slice(-52),
              },
              {
                label: "13 Weeks",
                value: rollingAvg13,
                prev: prevAvg13,
                spark: counts.slice(-13),
              },
            ].map(({ label, value, prev, spark }) => (
              <div key={label} className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-baseline w-full">
                  <span className="text-stone-500 text-xs">{label}</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-stone-100 text-lg font-semibold leading-none">
                      {value}
                    </span>
                    <TrendIndicator current={value} previous={prev} />
                  </div>
                </div>
                <Sparkline
                  data={spark}
                  tooltipLabel={(v) => ` ${v.toFixed(1)} players`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Players per Week bar chart */}
        <div className="flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
            <GiMinions className="text-orange-600 shrink-0 text-lg" />
            Players per Week
          </div>
          <div className="flex-1 cursor-pointer" style={{ height: "120px" }}>
            <Bar
              data={barChartData}
              options={{ ...barChartOptions, maintainAspectRatio: false }}
            />
          </div>
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

      <hr className="border-orange-950" />
    </div>
  );
}
