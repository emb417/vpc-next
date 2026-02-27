function avgPosition(sortedData, username, sliceStart, sliceEnd) {
  const slice = sortedData.slice(sliceStart, sliceEnd);
  const played = slice.filter((w) =>
    w.scores.some((s) => s.username === username),
  );
  if (played.length === 0) return null;
  const total = played.reduce((sum, w) => {
    const idx = w.scores.findIndex((s) => s.username === username);
    return sum + (idx + 1);
  }, 0);
  return total / played.length;
}

function positionImprovement(sortedData, username, windowSize) {
  const recent = avgPosition(sortedData, username, -windowSize);
  const prior = avgPosition(
    sortedData,
    username,
    -(windowSize * 2),
    -windowSize,
  );
  if (recent === null || prior === null) return null;
  return prior - recent; // positive = improved (lower position is better)
}

function playerWinPctSparkline(sortedData, username, weeks = 26) {
  const points = [];
  let wins = 0;
  let total = 0;
  sortedData.slice(-weeks).forEach((w) => {
    const idx = w.scores.findIndex((s) => s.username === username);
    if (idx !== -1) {
      wins += w.scores.length - (idx + 1);
      total += w.scores.length - 1;
      points.push(total > 0 ? (wins / total) * 100 : 0);
    }
  });
  return points.length > 1 ? points : null;
}

function computeLeagueStats(sortedData, playerStats) {
  // ── Weekly player counts ──────────────────────────────────────────
  const weeklyPlayerCounts = sortedData.map((w) => ({
    weekNumber: w.weekNumber,
    count: w.scores?.length ?? 0,
  }));

  const counts = weeklyPlayerCounts.map((w) => w.count);

  const avg = (arr) =>
    arr.length > 0
      ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)
      : "0";

  const rollingAvg13 = avg(counts.slice(-13));
  const rollingAvg52 = avg(counts.slice(-52));
  const prevAvg13 = avg(counts.slice(-26, -13));
  const prevAvg52 = avg(counts.slice(-104, -52));

  // ── Unique player counts ──────────────────────────────────────────
  const playersAllTime = new Set(
    sortedData.flatMap((w) => w.scores.map((s) => s.username)),
  ).size;
  const players52 = new Set(
    sortedData.slice(-52).flatMap((w) => w.scores.map((s) => s.username)),
  ).size;
  const players13 = new Set(
    sortedData.slice(-13).flatMap((w) => w.scores.map((s) => s.username)),
  ).size;

  // ── Honours board — top 10 each ──────────────────────────────────
  const qualified = playerStats.filter((p) => p.weeksPlayed >= 5);
  const qualified13 = playerStats.filter(
    (p) =>
      sortedData
        .slice(-13)
        .filter((w) => w.scores.some((s) => s.username === p.username))
        .length >= 3,
  );
  const qualified52 = playerStats.filter(
    (p) =>
      sortedData
        .slice(-52)
        .filter((w) => w.scores.some((s) => s.username === p.username))
        .length >= 5,
  );
  const top10 = (arr) => arr.slice(0, 10);

  const topMostWins = top10([...playerStats].sort((a, b) => b.wins - a.wins));
  const topMostActive = top10(
    [...playerStats].sort((a, b) => b.weeksPlayed - a.weeksPlayed),
  );
  const topMostPoints = top10(
    [...playerStats].sort((a, b) => b.totalPoints - a.totalPoints),
  );
  const topBestWinPct = top10(
    [...qualified].sort(
      (a, b) => Number(b.winPercentage) - Number(a.winPercentage),
    ),
  );
  const topBestAvgPosition = top10(
    [...qualified].sort(
      (a, b) => Number(a.averagePosition) - Number(b.averagePosition),
    ),
  );
  const topBestAvgPoints = top10(
    [...qualified].sort(
      (a, b) => Number(b.averagePoints) - Number(a.averagePoints),
    ),
  );

  // ── Participation trophy shelf stats ─────────────────────────────
  // Most Points 52w / 13w
  const mostPoints52 =
    [...qualified52].sort((a, b) => b.totalPoints52 - a.totalPoints52)[0] ??
    null;
  const mostPoints13 =
    [...qualified13].sort(
      (a, b) => b.recentTotalPoints - a.recentTotalPoints,
    )[0] ?? null;

  // Best Win Rate 52w / 13w
  const recentWinPct52 = (p) => {
    const weeks = sortedData
      .slice(-52)
      .filter((w) => w.scores.some((s) => s.username === p.username));
    const wins = weeks.reduce((sum, w) => {
      const idx = w.scores.findIndex((s) => s.username === p.username);
      return sum + (w.scores.length - (idx + 1));
    }, 0);
    const losses = weeks.reduce((sum, w) => {
      const idx = w.scores.findIndex((s) => s.username === p.username);
      return sum + idx;
    }, 0);
    return wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
  };
  const bestWinPct52 =
    [...qualified52]
      .map((p) => ({ ...p, _pct: recentWinPct52(p) }))
      .sort((a, b) => b._pct - a._pct)[0] ?? null;
  const bestWinPct13 =
    [...qualified13].sort(
      (a, b) => Number(b.recentWinPercentage) - Number(a.recentWinPercentage),
    )[0] ?? null;

  // Most Active 52w / 13w — tiebreak by most points
  const mostActive52 =
    [...qualified52].sort(
      (a, b) =>
        b.weeksPlayed52 - a.weeksPlayed52 || b.totalPoints52 - a.totalPoints52,
    )[0] ?? null;
  const mostActive13 =
    [...qualified13].sort(
      (a, b) =>
        b.recentWeeksPlayed - a.recentWeeksPlayed ||
        b.recentTotalPoints - a.recentTotalPoints,
    )[0] ?? null;

  // ── Most improved ─────────────────────────────────────────────────
  const mostImproved13 =
    playerStats
      .map((p) => ({
        ...p,
        improvement: positionImprovement(sortedData, p.username, 13),
      }))
      .filter((p) => {
        const recentPlayed = sortedData
          .slice(-13)
          .filter((w) =>
            w.scores.some((s) => s.username === p.username),
          ).length;
        const priorPlayed = sortedData
          .slice(-26, -13)
          .filter((w) =>
            w.scores.some((s) => s.username === p.username),
          ).length;
        return (
          p.improvement !== null &&
          p.improvement > 0 &&
          recentPlayed >= 5 &&
          priorPlayed >= 5
        );
      })
      .sort((a, b) => b.improvement - a.improvement)[0] ?? null;

  const mostImproved52 =
    playerStats
      .map((p) => ({
        ...p,
        improvement: positionImprovement(sortedData, p.username, 52),
      }))
      .filter((p) => {
        const recentPlayed = sortedData
          .slice(-52)
          .filter((w) =>
            w.scores.some((s) => s.username === p.username),
          ).length;
        const priorPlayed = sortedData
          .slice(-104, -52)
          .filter((w) =>
            w.scores.some((s) => s.username === p.username),
          ).length;
        return (
          p.improvement !== null &&
          p.improvement > 0 &&
          recentPlayed >= 13 &&
          priorPlayed >= 13
        );
      })
      .sort((a, b) => b.improvement - a.improvement)[0] ?? null;

  return {
    weeklyPlayerCounts,
    rollingAvg13,
    rollingAvg52,
    prevAvg13,
    prevAvg52,
    playersAllTime,
    players52,
    players13,
    mostPoints52,
    mostPoints13,
    bestWinPct52,
    bestWinPct13,
    mostActive52,
    mostActive13,
    topMostWins,
    topMostActive,
    topMostPoints,
    topBestWinPct,
    topBestAvgPosition,
    topBestAvgPoints,
    mostImproved13,
    mostImproved52,
  };
}

export default function LeagueStats(data) {
  const sortedWeeks = data
    .map((week) => ({
      ...week,
      weekNumber: parseInt(week.weekNumber),
      numberOfPlayers: week.scores.length,
    }))
    .sort((a, b) => a.weekNumber - b.weekNumber);

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
        week.scores.some((s) => s.username === userData.username),
      ).length
    ).toFixed(2);

    userData.recentAveragePosition = (
      sortedWeeks.slice(-13).reduce((sum, week) => {
        const score = week.scores.find((s) => s.username === userData.username);
        return sum + (score ? score.position : 0);
      }, 0) > 0
        ? sortedWeeks.slice(-13).reduce((sum, week) => {
            const score = week.scores.find(
              (s) => s.username === userData.username,
            );
            return sum + (score ? score.position : 0);
          }, 0) /
          sortedWeeks
            .slice(-13)
            .filter((week) =>
              week.scores.some((s) => s.username === userData.username),
            ).length
        : 100
    ).toFixed(2);

    userData.recentWeeksPlayed = sortedWeeks
      .slice(-13)
      .filter((week) =>
        week.scores.some((s) => s.username === userData.username),
      ).length;

    userData.recentWins = sortedWeeks.slice(-13).reduce((sum, week) => {
      const score = week.scores.find((s) => s.username === userData.username);
      return sum + (score ? week.numberOfPlayers - score.position : 0);
    }, 0);

    userData.recentLosses = sortedWeeks.slice(-13).reduce((sum, week) => {
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

    userData.recentTotalPoints = sortedWeeks.slice(-13).reduce((sum, week) => {
      const score = week.scores.find((s) => s.username === userData.username);
      return sum + (score ? score.points : 0);
    }, 0);

    userData.totalPoints52 = sortedWeeks.slice(-52).reduce((sum, week) => {
      const score = week.scores.find((s) => s.username === userData.username);
      return sum + (score ? score.points : 0);
    }, 0);

    userData.weeksPlayed52 = sortedWeeks
      .slice(-52)
      .filter((week) =>
        week.scores.some((s) => s.username === userData.username),
      ).length;

    userData.averagePoints52 = (
      userData.weeksPlayed52 > 0
        ? userData.totalPoints52 / userData.weeksPlayed52
        : 0
    ).toFixed(2);

    const wins52 = sortedWeeks.slice(-52).reduce((sum, week) => {
      const score = week.scores.find((s) => s.username === userData.username);
      return sum + (score ? week.numberOfPlayers - score.position : 0);
    }, 0);
    const losses52 = sortedWeeks.slice(-52).reduce((sum, week) => {
      const score = week.scores.find((s) => s.username === userData.username);
      return sum + (score ? score.position - 1 : 0);
    }, 0);
    userData.winPercentage52 = (
      wins52 > 0 ? (wins52 / (wins52 + losses52)) * 100 : 0
    ).toFixed(2);

    const weeks52 = sortedWeeks.slice(-52);
    const played52 = weeks52.filter((w) =>
      w.scores.some((s) => s.username === userData.username),
    );
    userData.averagePosition52 = (
      played52.length > 0
        ? played52.reduce((sum, week) => {
            const score = week.scores.find(
              (s) => s.username === userData.username,
            );
            return sum + (score ? score.position : 0);
          }, 0) / played52.length
        : 0
    ).toFixed(2);

    userData.recentAveragePoints = (
      userData.recentTotalPoints > 0
        ? userData.recentTotalPoints /
          sortedWeeks
            .slice(-13)
            .filter((week) =>
              week.scores.some((s) => s.username === userData.username),
            ).length
        : 0
    ).toFixed(2);

    // Sparkline — win % trend over last 26 weeks
    userData.winPctSparkline = playerWinPctSparkline(
      sortedWeeks,
      userData.username,
      26,
    );
  });

  const sortPlayers = (sortProps) => {
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
  };

  const sortProps = {
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

  const rankKeyMap = {
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

  sortPlayers(sortProps);

  const leagueStats = computeLeagueStats(sortedWeeks, playerStats);

  return { playerStats, rankKeyMap, leagueStats };
}
