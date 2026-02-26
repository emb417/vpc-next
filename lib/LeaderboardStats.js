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
      week.scores.forEach((score) => {
        const currentWeekNumber = week.weekNumber;
        const windowStart = currentWeekNumber - 12;

        // only weeks within the 13-week window where this player has a score
        const recentWeeks = weeksData.filter(
          (w) =>
            w.weekNumber >= windowStart &&
            w.weekNumber <= currentWeekNumber &&
            w.scores.find((s) => s.username === score.username),
        );

        const wins = recentWeeks.reduce((acc, w) => {
          const userScore = w.scores.find((s) => s.username === score.username);
          return acc + (w.numberOfPlayers - userScore.position);
        }, 0);

        const losses = recentWeeks.reduce((acc, w) => {
          const userScore = w.scores.find((s) => s.username === score.username);
          return acc + (userScore.position - 1);
        }, 0);

        const totalPositions = recentWeeks.reduce((acc, w) => {
          const userScore = w.scores.find((s) => s.username === score.username);
          return acc + userScore.position;
        }, 0);

        score.rollingWinPercentage = ((wins / (wins + losses)) * 100).toFixed(
          2,
        );
        score.rollingAveragePosition = (
          totalPositions / recentWeeks.length
        ).toFixed(1);
      });
    }
  });
  return weeksData.reverse();
}
