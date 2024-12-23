export default function SeasonStats(data) {
  const weeksSet = new Set(
    data.find((obj) => obj.channelName === "competition-corner").weeks
      .filter((week) => week.season === 5)
  );

  const sortedWeeks = Array.from(weeksSet)
    .sort((a, b) => b.currentSeasonWeekNumber - a.currentSeasonWeekNumber)
    .map((week) => ({
      ...week,
      currentSeasonWeekNumber: parseInt(week.currentSeasonWeekNumber),
      numberOfPlayers: week.scores.length,
    }));

  // fill in position values
  const sortedWeeksWithPositions = sortedWeeks.map((week, weekIndex) => {
    const scoresData = week.scores.map((score, scoreIndex) => ({
      ...score,
      position: scoreIndex + 1,
    }));
    return {
      ...week,
      scores: scoresData,
    };
  });

  const allUsernames = new Set(
    sortedWeeksWithPositions.flatMap((week) =>
      week.scores.map((score) => score.username)
    )
  );

  const cumulativeWeeksData = sortedWeeksWithPositions.map((week, index) => {
    // add a score of 0 for any username in allUsernames but not in the scores
    allUsernames.forEach((username) => {
      if (!week.scores.find((s) => s.username === username)) {
        week.scores.push({ username, points: 0 });
      }
    });
    const scores = week.scores.map((score) => {
      let cumulativePoints = 0;
      for (let i = index; i < sortedWeeksWithPositions.length; i++) {
        const weekScores = sortedWeeksWithPositions[i].scores;
        const scoreObj = weekScores.find((s) => s.username === score.username);
        if (scoreObj) {
          cumulativePoints += scoreObj.points;
        }
      }
      return { ...score, cumulativePoints };
    });
    return { ...week, scores };
  });

  cumulativeWeeksData.forEach((week, weekIndex) => {
    week.scores.forEach((score) => {
      score.losses = score.position > 0 ? score.position - 1 : 0;
      score.wins = week.numberOfPlayers - score.position;
      score.winPercentage =
        week.numberOfPlayers > 0
          ? Number(
              (
                ((week.numberOfPlayers - score.position) /
                  week.numberOfPlayers) *
                100
              ).toFixed(1)
            ).toFixed(1)
          : 0.0;
    });
  });

  // calculate the win percentage for each username
  cumulativeWeeksData.reduceRight(
    (acc, week) => {
      week.scores.forEach((score) => {
        const totalWins =
          (acc.totalWinsByUser.get(score.username) || 0) + (score.wins || 0);
        acc.totalWinsByUser.set(score.username, totalWins);
        const totalNumberOfPlayers =
          (acc.totalNumberOfPlayers.get(score.username) || 0) +
          (score.wins || 0) +
          (score.losses || 0);
        acc.totalNumberOfPlayers.set(score.username, totalNumberOfPlayers);
        score.seasonWinPercentage =
          totalWins > 0
            ? Number((totalWins / totalNumberOfPlayers) * 100).toFixed(2)
            : "0.00";
      });
      return {
        totalWinsByUser: acc.totalWinsByUser,
        totalNumberOfPlayers: acc.totalNumberOfPlayers,
      };
    },
    { totalWinsByUser: new Map(), totalNumberOfPlayers: new Map() }
  );

  const weeksData = cumulativeWeeksData.map((weekData) => {
    const scores = weekData.scores
      .sort((a, b) => {
        const cumulativePointsDiff = b.cumulativePoints - a.cumulativePoints;
        if (cumulativePointsDiff !== 0) {
          return cumulativePointsDiff;
        }
        return b.seasonWinPercentage - a.seasonWinPercentage;
      })
      .map((score, index) => ({
        ...score,
        seasonPosition: index + 1,
      }));

    return {
      ...weekData,
      scores,
    };
  });

  return weeksData;
}
