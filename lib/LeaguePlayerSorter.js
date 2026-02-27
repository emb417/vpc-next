export const sortProps = {
  recentTotalPoints: { order: "desc", secondarySort: "recentWinPercentage" },
  totalPoints52: { order: "desc", secondarySort: "winPercentage52" },
  recentAveragePoints: {
    order: "desc",
    secondarySort: "recentWinPercentage",
  },
  averagePoints52: { order: "desc", secondarySort: "winPercentage52" },
  recentWeeksPlayed: { order: "desc", secondarySort: "recentWinPercentage" },
  weeksPlayed52: { order: "desc", secondarySort: "winPercentage52" },
  recentAveragePosition: {
    order: "asc",
    secondarySort: "recentWinPercentage",
  },
  averagePosition52: { order: "asc", secondarySort: "winPercentage52" },
  recentWinPercentage: { order: "desc", secondarySort: "recentWeeksPlayed" },
  winPercentage52: { order: "desc", secondarySort: "weeksPlayed52" },
};

export const rankKeyMap = {
  recentTotalPoints: "rankRecentTotalPoints",
  recentWeeksPlayed: "rankRecentWeeksPlayed",
  recentAveragePoints: "rankRecentAveragePoints",
  recentAveragePosition: "rankRecentAveragePosition",
  recentWinPercentage: "rankRecentWinPercentage",
  totalPoints52: "rankTotalPoints52",
  weeksPlayed52: "rankWeeksPlayed52",
  averagePoints52: "rankAveragePoints52",
  averagePosition52: "rankAveragePosition52",
  winPercentage52: "rankWinPercentage52",
  username: "rankRecentWinPercentage",
};

export function sortPlayers(playerStats, rankKeyMap, sortProps) {
  const propsSortOrderKeys = Object.keys(sortProps);
  propsSortOrderKeys.forEach((prop) => {
    playerStats.sort((a, b) =>
      sortProps[prop].order === "asc"
        ? a[prop] - b[prop] ||
          b[sortProps[prop].secondarySort] - a[sortProps[prop].secondarySort]
        : b[prop] - a[prop] ||
          b[sortProps[prop].secondarySort] - a[sortProps[prop].secondarySort],
    );
    playerStats.forEach((user, index) => {
      user[rankKeyMap[prop]] = index + 1;
      if (prop === "recentTotalPoints") user.rank = index + 1;
    });
  });
}
