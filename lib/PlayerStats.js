import LeaderboardStats from "@/lib/LeaderboardStats";
import RecentStats from "@/lib/RecentStats";

const PerformanceType = {
  WORST: "WORST",
  BEST: "BEST",
};

function calculatePerformanceDifference(week, username, isWorst) {
  const userScore = week.scores.find((s) => s.username === username);
  if (!userScore) return 0;

  const difference = userScore.position - userScore.rollingAveragePosition;
  return isWorst ? Math.max(difference, 0) : Math.max(-difference, 0);
}

function performanceWeek(data, username, type) {
  const weeks = data
    .filter((week) =>
      week.scores.find((s) => s.username === username && s.score > 0)
    )
    .map((week) => ({
      ...week,
      performance: calculatePerformanceDifference(
        week,
        username,
        type === PerformanceType.WORST
      ),
    }));

  if (type === PerformanceType.WORST) {
    const worstWeeks = weeks.filter((week) => week.performance > 0);
    return worstWeeks.length > 0
      ? worstWeeks.reduce((max, week) =>
          max.performance > week.performance ? max : week
        )
      : { underPerformed: 0 };
  } else {
    return (
      weeks.reduce(
        (max, week) => (max?.performance > week.performance ? max : week),
        null
      ) || { overPerformed: 0 }
    );
  }
}

function updatePerformance(user, performanceWeek, type, username) {
  if (performanceWeek[type] !== 0) {
    const performanceType =
      type === "overPerformed"
        ? "bestPerformance"
        : "worstPerformance";
    user[performanceType].week = performanceWeek.weekNumber;
    user[performanceType].table = performanceWeek.table;
    user[performanceType].position =
      performanceWeek.scores.findIndex((s) => s.username === username) + 1;
    user[performanceType].players = performanceWeek.scores.length;
  }
}

function userSummaryData(positionWeeksData, username) {
  const sortedUsers = Array.from(
    positionWeeksData
      .flatMap((week) => week.scores)
      .reduce((acc, user) => {
        if (user.gamesPlayedPercentage > 0.5 && !acc.has(user.username)) {
          acc.set(user.username, {
            username: user.username,
            userAvatarUrl: user.userAvatarUrl,
            rollingWinPercentage: user.rollingWinPercentage,
          });
        }
        return acc;
      }, new Map())
      .values()
  ).sort((a, b) => b.rollingWinPercentage - a.rollingWinPercentage);

  let user = positionWeeksData
    .flatMap((week) => week.scores)
    .map((score) => ({
      username: score.username,
      userAvatarUrl: score.userAvatarUrl,
      rollingAveragePosition: score.rollingAveragePosition,
      rollingWinPercentage: score.rollingWinPercentage,
    }))
    .find((user) => user.username === username);

  if (user === undefined) {
    return null;
  }

  user.bestPerformance = {
    week: 0,
    table: "N/A",
    position: 0,
    players: 0,
  };
  const bestPerformanceWeek = performanceWeek(
    positionWeeksData,
    username,
    PerformanceType.BEST
  );
  updatePerformance(user, bestPerformanceWeek, "overPerformed", username);

  user.worstPerformance = {
    week: 0,
    table: "N/A",
    position: 0,
    players: 0,
  };
  const worstPerformanceWeek = performanceWeek(
    positionWeeksData,
    username,
    PerformanceType.WORST
  );
  updatePerformance(
    user,
    worstPerformanceWeek,
    "underPerformed",
    username
  );

  return user;
}

export default function PlayerSummaryData(data, username) {
  const positionWeeksData = LeaderboardStats(data);
  const recentPlayerStats = RecentStats(data);
  const user = userSummaryData(positionWeeksData, username);
  let userPositionData, playerRivals, playerStats;
  if (user) {
    const positionWeeksDataPlusPosition = positionWeeksData.map((week) => ({
      ...week,
      score: week.scores.find((score) => score.username === username)?.score,
      points: week.scores.find((score) => score.username === username)?.points,
      position: week.scores.find((score) => score.username === username)
        ?.position,
      numberOfParticipants: week.scores.length,
    }));

    userPositionData = positionWeeksDataPlusPosition.map((week) => ({
      ...week,
      nextScore: week.scores[week.position - 2]?.score,
      nextPosition: week.scores[week.position - 2]?.position,
      nextPlayer: week.scores[week.position - 2]?.username || "1st Place",
    }));

    playerStats = recentPlayerStats.find(
      (player) => player.username === username
    );

    const rankedPlayers = recentPlayerStats
      .filter((user) => user.rank !== undefined && user.rank !== null)
      .sort((a, b) => a.rank - b.rank);

    const twoUpRankPlayer =
      playerStats.rank >= 2 ? rankedPlayers[playerStats.rank - 3] : undefined;
    const higherRankPlayer =
      playerStats.rank >= 1 ? rankedPlayers[playerStats.rank - 2] : undefined;
    const lowerRankPlayer =
      playerStats.rank >= 0 && playerStats.rank < rankedPlayers.length
        ? rankedPlayers[playerStats.rank]
        : undefined;

    playerRivals = [
      { ...twoUpRankPlayer },
      { ...higherRankPlayer },
      { ...lowerRankPlayer },
    ].filter((rival) => rival !== undefined);
  }

  return {
    user,
    playerStats,
    playerRivals,
    userPositionData,
  };
}
