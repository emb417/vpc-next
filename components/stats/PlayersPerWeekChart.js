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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  LineElement,
  PointElement,
);

export default function PlayersPerWeekChart({ weeklyPlayerCounts, className = "" }) {
  const router = useRouter();
  const counts = weeklyPlayerCounts.map((w) => w.count);
  const labels = weeklyPlayerCounts.map((w) => `Wk ${w.weekNumber}`);

  // Calculate 13-week rolling average
  const rollingAverage = counts.map((_, index) => {
    const start = Math.max(0, index - 12);
    const window = counts.slice(start, index + 1);
    const sum = window.reduce((a, b) => a + b, 0);
    return sum / window.length;
  });

  const options = {
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
          label: (ctx) => {
            if (ctx.dataset.type === "line") {
              return ` 13-Wk Avg: ${ctx.raw.toFixed(1)}`;
            }
            return ` ${ctx.raw} players`;
          },
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
    <div className={`flex flex-col gap-2 bg-stone-900 border border-orange-950 rounded-xl px-3 py-2.5 ${className}`}>
      <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider">
        <GiMinions className="text-orange-600 shrink-0 text-lg" />
        Players per Week
      </div>
      <div className="flex-1 cursor-pointer" style={{ height: "120px" }}>
        <Bar
          data={data}
          options={{ ...options, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
