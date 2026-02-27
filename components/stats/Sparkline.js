import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
);

export default function Sparkline({
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
