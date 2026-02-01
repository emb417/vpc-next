"use client";
import { useState, useEffect, useMemo } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Legend,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
} from "chart.js";
import colors from "@/lib/Colors";
import seasonOptions from "@/lib/SeasonChartOptions";

ChartJS.register(
  Title,
  Legend,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip
);

function getScores(item, selectedUsernames) {
  if (!item || !item.scores) {
    return [];
  }
  return item.scores
    .filter((score) => selectedUsernames.includes(score.username))
    .map((score) => ({
      points: score.points,
      cumulativePoints: score.cumulativePoints,
    }));
}

export default function PinballChart({ weeksData }) {
  const [data, setData] = useState({ datasets: [] });

  const usernames = useMemo(() => {
    if (!weeksData || weeksData.length === 0 || !weeksData[0].scores) return [];
    const sortedScores = [...weeksData[0].scores].sort(
      (a, b) => b.cumulativePoints - a.cumulativePoints
    );
    const usernamesSet = new Set(sortedScores.map((score) => score.username));
    return Array.from(usernamesSet);
  }, [weeksData]);

  const usernameOptions = useMemo(() => {
    return usernames.reduce((acc, username, index) => {
      const color = colors[index % 20];
      return acc.concat({
        value: username,
        label: username,
        color,
      });
    }, []);
  }, [usernames]);

  useEffect(() => {
    if (!weeksData || weeksData.length === 0) return;

    const topScores = weeksData[0].scores.slice(0, 20);
    const datasets = topScores.map((score) => {
      return {
        type: "line",
        label: score.username,
        data: weeksData.map((item) => ({
          x: item.currentSeasonWeekNumber,
          y: getScores(item, [score.username])[0]?.cumulativePoints || null,
        })),
        backgroundColor: usernameOptions.find(
          (option) => option.value === score.username
        )?.color,
        borderColor: usernameOptions.find(
          (option) => option.value === score.username
        )?.color,
        borderWidth: 1,
        radius: 5,
        hoverRadius: 10,
      };
    });

    const label = weeksData.map((item) => item.currentSeasonWeekNumber);
    setData({ label, datasets });
  }, [weeksData, usernameOptions]);

  return (
      <div className="w-full">
        <Chart
          options={seasonOptions}
          data={data}
          className="bg-stone-900 rounded-2xl"
        />
      </div>
  );
}
