export default function RecentStats(data) {
  const recentWeeks = data
    .find((obj) => obj.channelName === "competition-corner")
    .weeks.filter((week) => !isNaN(parseInt(week.weekNumber)))
    .sort((a, b) => b.weekNumber - a.weekNumber)
    .slice(0, 13)
    .map((week) => ({
      ...week,
      weekNumber: parseInt(week.weekNumber),
      numberOfPlayers: week.scores.length,
    }));

  const recentPlayerStats = recentWeeks.reduce((acc, week) => {
    week.scores.forEach((score, index) => {
      const userData = acc.find((user) => user.username === score.username);
      if (userData) {
        userData.wins += week.scores.length - (index + 1);
        userData.losses += index;
        userData.totalPositions += index + 1 || 0;
        userData.totalPoints += score.points || 0;
        userData.weeksPlayed++;
        userData.winPercentage = (
          (userData.wins / (userData.wins + userData.losses)) *
          100
        ).toFixed(2);
        userData.averagePosition = (
          userData.totalPositions / userData.weeksPlayed
        ).toFixed(1);
      } else {
        acc.push({
          username: score.username,
          userAvatarUrl: score.userAvatarUrl,
          wins: week.scores.length - (index + 1),
          losses: index,
          weeksPlayed: 1,
          totalPoints: score.points,
          totalPositions: index + 1,
        });
      }
    });
    return acc;
  }, []);

  const powerRankedPlayers = recentPlayerStats
    .filter((user) => user.weeksPlayed > 6)
    .sort((a, b) => b.winPercentage - a.winPercentage)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

  return recentPlayerStats.map((user) => ({
    ...user,
    rank: powerRankedPlayers.find(
      (rankedUser) => rankedUser.username === user.username
    )?.rank,
  }));
}
