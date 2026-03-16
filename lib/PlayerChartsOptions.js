const getPlayerChartsOptions = (theme) => {
  const isDark = theme === "dark";
  const textColor = isDark ? "#fafaf9" : "#292524"; // stone-50 or stone-800
  const gridColor = isDark ? "rgba(250, 250, 249, 0.2)" : "rgba(41, 37, 36, 0.2)";
  const tooltipBgColor = isDark ? "rgba(41, 37, 36, 0.8)" : "rgba(250, 250, 249, 0.8)";

  return {
    layout: {
      padding: 2,
    },
    clip: false,
    responsive: true,
    animation: {
      duration: 1000,
    },
    interaction: {
      mode: "point",
    },
    elements: {
      line: {
        tension: 0.2,
        color: textColor,
      },
    },
    stacked: false,
    scales: {
      x: {
        type: "linear",
        display: true,
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
            size: 12,
          },
          padding: 2,
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        reverse: true,
        min: 1,
        suggestedMax: 20,
        title: {
          display: true,
          text: "Position",
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
            size: 12,
          },
          padding: 2,
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        reverse: false,
        title: {
          display: true,
          text: "Win %",
          font: {
            size: 12,
          },
          color: textColor,
          padding: 2,
        },
        grid: {
          color: gridColor,
          drawTicks: false,
          drawOnChartArea: false,
        },
        ticks: {
          color: textColor,
          font: {
            size: 12,
          },
          padding: 2,
        },
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        backgroundColor: tooltipBgColor,
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
        callbacks: {
          labelPointStyle: function (context) {
            if (context.raw.pointStyle === "triangle") {
              return {
                pointStyle: "triangle",
                rotation: 270,
              };
            } else if (context.raw.pointStyle === "circle") {
              return {
                pointStyle: "circle",
                rotation: 0,
              };
            } else if (context.raw.pointStyle === "cross") {
              return {
                pointStyle: "cross",
                rotation: 45,
              };
            }
          },
          title: (context) => {
            return [
              `Week #${context[0].raw.week}`,
              `${context[0].raw.periodStart} to ${context[0].raw.periodEnd}`,
              `${context[0].raw.table}`,
            ];
          },
          label: (context) => {
            if (context.raw.r !== undefined) {
              const formattedScore = new Intl.NumberFormat("en-US").format(
                context.raw.score,
              );
              return [
                ` ${context.dataset.label} - Weekly Position`,
                ` P${context.parsed.y} of ${context.raw.participants} From Score: ${formattedScore}`,
                ` `,
              ];
            } else if (context.raw.position !== undefined) {
              return [
                ` ${context.dataset.label} - Average Position`,
                ` P${context.parsed.y} From Week #${context.parsed.x - 12} to Week #${context.parsed.x}`,
                ` `,
              ];
            } else if (context.raw.rollingWinPercentage !== undefined) {
              return [
                ` ${context.dataset.label} - Win Percentage`,
                ` ${context.parsed.y}% From Week #${context.parsed.x - 12} to Week #${context.parsed.x}`,
                ` `,
              ];
            }
          },
        },
      },
    },
  };
};

export default getPlayerChartsOptions;

