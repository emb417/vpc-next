const seasonOptions = {
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
          from: 0
        }
      }
    },
    show: {
      animations: {
        y: {
          from: 0
        }
      }
    },
    hide: {
      animations: {
        y: {
          to: 0
        }
      }
    }
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
        color: "#fafaf9",
      },
      grid: {
        display: false,
        drawTicks: true,
      },
      ticks: {
        color: "#fafaf9",
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
        color: "#fafaf9",
        padding: 2,
      },
      grid: {
        color: "#fafaf9",
        drawTicks: false,
      },
      ticks: {
        color: "#fafaf9",
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
      color: "#fafaf9",
      padding: {
        top: 4,
      },
    },
    legend: {
      display: true,
      labels: {
        color: "#fafaf9",
      }
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
          return `Week ${context[0].label} Total Points`;
        },
        label: (context) => {
          return ` ${context.dataset.label} - ${context.parsed.y}`;
        },
      },
    },
  },
};

export default seasonOptions;
