function playerGamesPlayedPercentage(data, username) {
  const gamesPlayed = data.filter((week) =>
    week.scores.some((s) => s.username === username && s.score > 0)
  ).length;
  return gamesPlayed / data.length;
}

export function positionStats(data) {
  const sortedWeeks = Array.from(
    new Set(
      data
        .find((obj) => obj.channelName === "competition-corner")
        .weeks.filter((week) => !isNaN(parseInt(week.weekNumber)))
    )
  )
    .sort((a, b) => b.weekNumber - a.weekNumber)
    .slice(0, 52)
    .map((week) => ({
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
  weeksData.forEach((week, weekIndex) => {
    if (week.scores.length === 0) {
      week.scores.push({
        username: "No Score",
        userAvatarUrl:
          "https://cdn.discordapp.com/avatars/12345678/123456789.png",
        position: "1",
        score: "0",
        rollingAveragePosition: "1",
      });
    } else {
      week.scores.forEach((score) => {
        const startIndex = weekIndex;
        const endIndex = Math.min(weeksData.length, weekIndex + 13);
        const scores = weeksData
          .slice(startIndex, endIndex)
          .flatMap((w) => w.scores.filter((s) => s.username === score.username))
          .reverse();
        const validScores = scores.filter((s) => s.position !== null);
        score.rollingAveragePosition =
          validScores.length > 0
            ? Number(
                (
                  validScores.reduce((sum, s) => sum + s.position, 0) /
                    validScores.length +
                  Number.EPSILON
                ).toFixed(1)
              ).toFixed(1)
            : null;
      });
    }
  });

  // calculate the win percentage for each score
  weeksData.forEach((week, weekIndex) => {
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
  weeksData.reduceRight(
    (acc, week) => {
      week.scores.forEach((score) => {
        const totalWins =
          (acc.totalWinsByUser.get(score.username) || 0) + score.wins;
        acc.totalWinsByUser.set(score.username, totalWins);
        const totalNumberOfPlayers =
          (acc.totalNumberOfPlayers.get(score.username) || 0) +
          score.wins +
          score.losses;
        acc.totalNumberOfPlayers.set(score.username, totalNumberOfPlayers);
        score.annualWinPercentage =
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

  // calculate the game played percentage for each username
  weeksData.forEach((week, index) => {
    week.scores.forEach((score) => {
      score.gamesPlayedPercentage = playerGamesPlayedPercentage(
        weeksData,
        score.username
      );
    });
  });

  return weeksData;
}

export default function LeaderboardStats(data) {
  return positionStats(data);
}
