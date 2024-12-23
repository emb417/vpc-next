export default function AnnualStats(data) {
  const sortedWeeks = data
    .find((obj) => obj.channelName === "competition-corner")
    .weeks.filter((week) => !isNaN(parseInt(week.weekNumber)))
    .sort((a, b) => b.weekNumber - a.weekNumber)
    .slice(0, 52)
    .map((week) => ({ ...week, weekNumber: parseInt(week.weekNumber), numberOfPlayers: week.scores.length }));

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
    userData.winPercentage = userData.wins + userData.losses > 0
      ? ((userData.wins / (userData.wins + userData.losses)) * 100).toFixed(2)
      : 0;
    userData.averagePoints = (userData.totalPoints / userData.weeksPlayed).toFixed(2);
    userData.averagePosition =
      (sortedWeeks.reduce((sum, week) => {
        const score = week.scores.find((s) => s.username === userData.username);
        return sum + (score ? score.position : 0);
      }, 0) / sortedWeeks.filter((week) => week.scores.some((s) => s.username === userData.username)).length).toFixed(2);
    userData.recentAveragePosition =
      (sortedWeeks
        .slice(0, 13)
        .reduce((sum, week) => {
          const score = week.scores.find((s) => s.username === userData.username);
          return sum + (score ? score.position : 0);
        }, 0) / sortedWeeks.slice(0, 13).filter((week) => week.scores.some((s) => s.username === userData.username)).length).toFixed(2);
  });

  return playerStats.sort((a, b) => b.gamesPlayed - a.gamesPlayed).map((user, index) => ({ ...user, rank: index + 1 }));
}