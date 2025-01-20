export default function LeagueStats(data) {
  const sortedWeeks = data
    .find((obj) => obj.channelName === "competition-corner")
    .weeks.filter((week) => !isNaN(parseInt(week.weekNumber)))
    .sort((a, b) => b.weekNumber - a.weekNumber)
    .slice(0, 52)
    .map((week) => ({
      ...week,
      weekNumber: parseInt(week.weekNumber),
      numberOfPlayers: week.scores.length,
    }));

  const playerStats = sortedWeeks.reduce((acc, week) => {
    week.scores.forEach((score, index) => {
      score.position = index + 1;
      score.wins = week.numberOfPlayers - score.position;
      score.losses = score.position - 1;
    });

    week.scores.forEach((score) => {
      const userData = acc.find((user) => user.username === score.username);
      if (userData) {
        userData.wins += score.wins || 0;
        userData.losses += score.losses || 0;
        userData.totalPoints += score.points || 0;
        userData.weeksPlayed += score.weeksPlayed || 1;
      } else {
        acc.push({
          username: score.username,
          userAvatarUrl: score.userAvatarUrl,
          weeksPlayed: score.weeksPlayed || 1,
          wins: score.wins || 0,
          losses: score.losses || 0,
          totalPoints: score.points || 0,
        });
      }
    });
    return acc;
  }, []);

  playerStats.forEach((userData) => {
    userData.winPercentage = (
      userData.wins > 0
        ? (userData.wins / (userData.wins + userData.losses)) * 100
        : 0
    ).toFixed(2);

    userData.averagePoints = (
      userData.totalPoints / userData.weeksPlayed
    ).toFixed(2);

    userData.averagePosition = (
      sortedWeeks.reduce((sum, week) => {
        const score = week.scores.find((s) => s.username === userData.username);
        return sum + (score ? score.position : 0);
      }, 0) /
      sortedWeeks.filter((week) =>
        week.scores.some((s) => s.username === userData.username)
      ).length
    ).toFixed(2);

    userData.recentAveragePosition = (
      sortedWeeks.slice(0, 13).reduce((sum, week) => {
        const score = week.scores.find((s) => s.username === userData.username);
        return sum + (score ? score.position : 0);
      }, 0) > 0
        ? sortedWeeks.slice(0, 13).reduce((sum, week) => {
            const score = week.scores.find(
              (s) => s.username === userData.username
            );
            return sum + (score ? score.position : 0);
          }, 0) /
          sortedWeeks
            .slice(0, 13)
            .filter((week) =>
              week.scores.some((s) => s.username === userData.username)
            ).length
        : 100
    ).toFixed(2);

    userData.recentWeeksPlayed = sortedWeeks
      .slice(0, 13)
      .filter((week) =>
        week.scores.some((s) => s.username === userData.username)
      ).length;

    userData.recentWins = sortedWeeks.slice(0, 13).reduce((sum, week) => {
      const score = week.scores.find((s) => s.username === userData.username);
      return sum + (score ? week.numberOfPlayers - score.position : 0);
    }, 0);

    userData.recentLosses = sortedWeeks.slice(0, 13).reduce((sum, week) => {
      const score = week.scores.find((s) => s.username === userData.username);
      return sum + (score ? score.position - 1 : 0);
    }, 0);

    userData.recentWinPercentage = (
      userData.recentWins > 0
        ? (userData.recentWins /
            (userData.recentWins + userData.recentLosses)) *
          100
        : 0
    ).toFixed(2);

    userData.recentTotalPoints = sortedWeeks
      .slice(0, 13)
      .reduce((sum, week) => {
        const score = week.scores.find((s) => s.username === userData.username);
        return sum + (score ? score.points : 0);
      }, 0);

    userData.recentAveragePoints = (
      userData.recentTotalPoints > 0
        ? userData.recentTotalPoints /
          sortedWeeks
            .slice(0, 13)
            .filter((week) =>
              week.scores.some((s) => s.username === userData.username)
            ).length
        : 0
    ).toFixed(2);
  });

  const sortPlayers = (sortProps) => {
    const propsSortOrderKeys = Object.keys(sortProps);
    propsSortOrderKeys.forEach((prop) => {
      playerStats.sort((a, b) =>
        sortProps[prop].order === "asc"
          ? a[prop] - b[prop] ||
            b[sortProps[prop].secondarySort] - a[sortProps[prop].secondarySort]
          : b[prop] - a[prop] ||
            b[sortProps[prop].secondarySort] - a[sortProps[prop].secondarySort]
      );
      playerStats.forEach((user, index) => {
        user[rankKeyMap[prop]] = index + 1;
        if (prop === "recentTotalPoints") user.rank = index + 1;
      });
    });
  };

  const sortProps = {
    recentTotalPoints: { order: "desc", secondarySort: "recentWinPercentage" },
    totalPoints: { order: "desc", secondarySort: "winPercentage" },
    recentAveragePoints: {
      order: "desc",
      secondarySort: "recentWinPercentage",
    },
    averagePoints: { order: "desc", secondarySort: "winPercentage" },
    recentWeeksPlayed: { order: "desc", secondarySort: "recentWinPercentage" },
    weeksPlayed: { order: "desc", secondarySort: "winPercentage" },
    recentAveragePosition: {
      order: "asc",
      secondarySort: "recentWinPercentage",
    },
    averagePosition: { order: "asc", secondarySort: "winPercentage" },
    recentWinPercentage: { order: "desc", secondarySort: "recentWeeksPlayed" },
    winPercentage: { order: "desc", secondarySort: "weeksPlayed" },
  };

  const rankKeyMap = {
    recentTotalPoints: "rankRecentTotalPoints",
    recentWeeksPlayed: "rankRecentWeeksPlayed",
    averagePoints: "rankAveragePoints",
    averagePosition: "rankAveragePosition",
    recentAveragePoints: "rankRecentAveragePoints",
    recentAveragePosition: "rankRecentAveragePosition",
    recentWinPercentage: "rankRecentWinPercentage",
    totalPoints: "rankTotalPoints",
    weeksPlayed: "rankWeeksPlayed",
    winPercentage: "rankWinPercentage",
    username: "rankRecentWinPercentage",
  };

  sortPlayers(sortProps);

  return { playerStats, rankKeyMap };
}
