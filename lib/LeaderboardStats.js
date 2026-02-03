export default function LeaderboardStats(data) {
  const sortedWeeks = Array.from(
    new Set(data.filter((week) => !isNaN(parseInt(week.weekNumber)))),
  ).map((week) => ({
    ...week,
    weekNumber: parseInt(week.weekNumber),
    numberOfPlayers: week.scores.length,
  }));

  // fill in position values
  let weeksData = sortedWeeks.map((week) => {
    const scoresData = week.scores.map((score, scoreIndex) => ({
      ...score,
      position: scoreIndex + 1,
    }));
    return {
      ...week,
      scores: scoresData,
    };
  });

  // calculate the rolling averages over a 13-week period for each username
  weeksData.reverse().forEach((week, weekIndex) => {
    if (week.scores.length === 0) {
      week.scores.push({
        username: "No Score",
        userAvatarUrl: "",
        position: "1",
        score: "0",
        rollingAveragePosition: "1",
        points: 0,
        wins: 0,
        losses: 0,
        rollingWinPercentage: 0,
        gamesPlayedPercentage: 0,
      });
    } else {
      week.scores.forEach((score, scoreIndex) => {
        const startIndex = Math.max(0, weekIndex - 12);
        const endIndex = weekIndex + 1;
        const recentWeeks = weeksData.slice(startIndex, endIndex);

        const userData = recentWeeks.reduce((acc, w, index) => {
          const userScore = w.scores.find((s) => s.username === score.username);
          if (userScore) {
            const position = userScore.position;
            if (acc.username === score.username) {
              acc.wins += w.numberOfPlayers - position;
              acc.losses += position - 1;
              acc.totalPoints += userScore.points || 0;
              acc.weeksPlayed++;
              acc.totalPositions += position;
            } else {
              acc = {
                username: score.username,
                userAvatarUrl: score.userAvatarUrl,
                wins: w.numberOfPlayers - position,
                losses: position - 1,
                weeksPlayed: 1,
                totalPoints: userScore.points || 0,
                totalPositions: position,
              };
            }
          }
          return acc;
        }, {});

        const user = userData;
        user.rollingWinPercentage = (
          (user.wins / (user.wins + user.losses)) *
          100
        ).toFixed(2);
        user.averagePosition = (user.totalPositions / user.weeksPlayed).toFixed(
          1,
        );
        score.rollingAveragePosition = user.averagePosition;
        score.rollingWinPercentage = user.rollingWinPercentage;
      });
    }
  });
  return weeksData.reverse();
}
