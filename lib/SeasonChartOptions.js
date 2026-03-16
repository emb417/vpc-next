const getSeasonOptions = (theme) => {
  const isDark = theme === "dark";
  const textColor = isDark ? "#fafaf9" : "#292524";
  const gridColor = isDark ? "rgba(250, 250, 249, 0.2)" : "rgba(41, 37, 36, 0.2)";

  return {
    layout: {
      padding: 2,
    },
    clip: false,
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeInCubic",
    },
    transitions: {
      active: {
        animations: {
          y: {
            from: 0,
          },
        },
      },
      show: {
        animations: {
          y: {
            from: 0,
          },
        },
      },
      hide: {
        animations: {
          y: {
            to: 0,
          },
        },
      },
    },
    interaction: {
      mode: "point",
    },
    elements: {
      line: {
        tension: 0.25,
      },
    },
    scales: {
      x: {
        type: "linear",
        min: 1,
        suggestedMax: 10,
        title: {
          display: true,
          text: "Week",
          font: {
            size: 12,
          },
          color: textColor,
        },
        grid: {
          display: false,
          drawTicks: true,
        },
        ticks: {
          color: textColor,
          font: {
            size: 10,
          },
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Leaderboard Points",
          font: {
            size: 12,
          },
          color: textColor,
          padding: 2,
        },
        grid: {
          color: gridColor,
          drawTicks: false,
        },
        ticks: {
          color: textColor,
          font: {
            size: 10,
          },
          padding: 8,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Top 20 Players",
        font: {
          size: 12,
        },
        color: textColor,
        padding: {
          top: 4,
        },
      },
      legend: {
        display: true,
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        caretSize: 20,
        cornerRadius: 12,
        usePointStyle: true,
        pointStyle: "circle",
        callbacks: {
          title: (context) => {
            const raw = context[0].raw;
            return [
              `Week ${context[0].label}: ${raw.periodStart} to ${raw.periodEnd}`,
              raw.tableName,
            ];
          },
          label: (context) => {
            return ` ${context.dataset.label} - ${context.parsed.y}`;
          },
        },
      },
    },
  };
};

export default getSeasonOptions;

