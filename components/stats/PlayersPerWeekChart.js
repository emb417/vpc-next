"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  LineElement,
  PointElement,
} from "chart.js";
import { GiMinions } from "react-icons/gi";
import { useTheme } from "@/lib/ThemeContext";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  LineElement,
  PointElement,
);

export default function PlayersPerWeekChart({
  weeklyPlayerCounts,
  className = "",
}) {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const textColor = isDark ? "#78716c" : "#57534e";
  const gridColor = isDark ? "rgba(120,113,108,0.15)" : "rgba(87,83,78,0.15)";

  const counts = weeklyPlayerCounts.map((w) => w.count);
  const labels = weeklyPlayerCounts.map((w) => `Wk ${w.weekNumber}`);

  const rollingAverage = counts.map((_, index) => {
    const start = Math.max(0, index - 12);
    const window = counts.slice(start, index + 1);
    const sum = window.reduce((a, b) => a + b, 0);
    return sum / window.length;
  });

  const options = useMemo(
    () => ({
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
          backgroundColor: isDark
            ? "rgba(41, 37, 36, 0.9)"
            : "rgba(231, 229, 228, 0.9)",
          titleColor: isDark ? "#fafaf9" : "#1c1917",
          bodyColor: isDark ? "#fafaf9" : "#1c1917",
          footerColor: isDark ? "#fafaf9" : "#1c1917",
          mode: "index",
          intersect: false,
          callbacks: {
            title: (ctx) => {
              const week = weeklyPlayerCounts[ctx[0].dataIndex];
              return `Week ${week?.weekNumber} (${week?.periodStart} - ${week?.periodEnd})`;
            },
            afterTitle: (ctx) => {
              const week = weeklyPlayerCounts[ctx[0].dataIndex];
              return week?.table || "";
            },
            label: () => null,
            footer: (ctx) => {
              const players = ctx.find((c) => c.dataset.type === "bar")?.raw;
              const avg = ctx.find((c) => c.dataset.type === "line")?.raw;
              let indicator = "—";
              if (players > avg) indicator = "▲";
              else if (players < avg) indicator = "▼";
              return [
                `${players} Players ${indicator}`,
                `${avg ? avg.toFixed(1) : "N/A"} 13-Wk Avg`,
              ];
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            font: { size: 10 },
            maxTicksLimit: 20,
            maxRotation: 0,
          },
          grid: { display: false },
        },
        y: {
          ticks: { color: textColor, font: { size: 10 } },
          grid: { color: gridColor },
          min: 0,
        },
      },
    }),
    [theme, weeklyPlayerCounts, router],
  );

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "13-Week Average",
        data: rollingAverage,
        borderColor: "rgba(251, 146, 60, 0.8)",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        order: 1,
      },
      {
        type: "bar",
        label: "Players",
        data: counts,
        backgroundColor: "rgba(194, 65, 12, 0.6)",
        borderColor: "rgba(194, 65, 12, 1)",
        borderWidth: 1,
        borderRadius: 2,
        order: 2,
      },
    ],
  };

  return (
    <div
      className={`flex flex-col gap-2 bg-stone-200 dark:bg-stone-900 border border-orange-500 dark:border-orange-950 rounded-xl px-3 py-2.5 ${className}`}
    >
      <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 text-xs uppercase tracking-wider">
        <GiMinions className="text-orange-600 shrink-0 text-lg" />
        Players per Week
      </div>
      <div className="flex-1 cursor-pointer" style={{ height: "120px" }}>
        <Bar data={data} options={{ ...options, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
