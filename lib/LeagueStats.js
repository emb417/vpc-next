import { positionImprovement, playerWinPctSparkline } from "./LeagueStatsUtils";
import { sortPlayers, sortProps, rankKeyMap } from "./LeaguePlayerSorter";

function getWeeklyPlayerCounts(sortedData) {
  return sortedData.map((w) => ({
    weekNumber: w.weekNumber,
    count: w.scores?.length ?? 0,
  }));
}

function getRollingAverages(counts) {
  const avg = (arr) =>
    arr.length > 0
      ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)
      : "0";

  const rollingAvg13 = avg(counts.slice(-13));
  const rollingAvg52 = avg(counts.slice(-52));
  const prevAvg13 = avg(counts.slice(-26, -13));
  const prevAvg52 = avg(counts.slice(-104, -52));
  return { rollingAvg13, rollingAvg52, prevAvg13, prevAvg52 };
}

function getUniquePlayerCounts(sortedData) {
  const playersAllTime = new Set(
    sortedData.flatMap((w) => w.scores.map((s) => s.username)),
  ).size;
  const players52 = new Set(
    sortedData.slice(-52).flatMap((w) => w.scores.map((s) => s.username)),
  ).size;
  const players13 = new Set(
    sortedData.slice(-13).flatMap((w) => w.scores.map((s) => s.username)),
  ).size;
  return { playersAllTime, players52, players13 };
}

function getHonorsBoardStats(playerStats, qualified) {
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
  return {
    topMostWins,
    topMostActive,
    topMostPoints,
    topBestWinPct,
    topBestAvgPosition,
    topBestAvgPoints,
  };
}

function getTrophyShelfStats(sortedData, qualified13, qualified52) {
  const mostPoints52 =
    [...qualified52].sort((a, b) => b.totalPoints52 - a.totalPoints52)[0] ??
    null;
  const mostPoints13 =
    [...qualified13].sort(
      (a, b) => b.recentTotalPoints - a.recentTotalPoints,
    )[0] ?? null;

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

  return {
    mostPoints52,
    mostPoints13,
    bestWinPct52,
    bestWinPct13,
    mostActive52,
    mostActive13,
  };
}

function getMostImprovedStats(playerStats, sortedData) {
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

  return { mostImproved13, mostImproved52 };
}

function getTableStats(sortedData) {
  const parseTable = (name) => {
    if (!name) return null;
    const match = name.match(/^(.+?)\s*\(([^,)]+?)\s+(\d{4})\)$/);
    if (!match) return null;
    const year = parseInt(match[3]);
    return {
      title: match[1].trim(),
      maker: match[2].trim(),
      year,
      era:
        year < 1980
          ? "Pre-1980"
          : year < 1990
            ? "1980s"
            : year < 2000
              ? "1990s"
              : year < 2010
                ? "2000s"
                : year < 2020
                  ? "2010s"
                  : "2020s",
    };
  };

  const recentWeeks = sortedData
    .slice(-104)
    .filter((w) => w.scores?.length >= 3);

  const makerMap = {};
  const eraMap = {};

  recentWeeks.forEach((w) => {
    const t = parseTable(w.table);
    if (!t) return;

    if (!makerMap[t.maker])
      makerMap[t.maker] = { maker: t.maker, totalPlayers: 0, weeks: 0 };
    makerMap[t.maker].totalPlayers += w.scores.length;
    makerMap[t.maker].weeks += 1;

    if (!eraMap[t.era])
      eraMap[t.era] = { era: t.era, totalPlayers: 0, weeks: 0 };
    eraMap[t.era].totalPlayers += w.scores.length;
    eraMap[t.era].weeks += 1;
  });

  const topMakers = Object.values(makerMap)
    .filter((m) => m.weeks >= 3)
    .map((m) => ({ ...m, avgPlayers: (m.totalPlayers / m.weeks).toFixed(1) }))
    .sort((a, b) => Number(b.avgPlayers) - Number(a.avgPlayers))
    .slice(0, 5);

  const topEras = Object.values(eraMap)
    .filter((e) => e.weeks >= 3)
    .map((e) => ({ ...e, avgPlayers: (e.totalPlayers / e.weeks).toFixed(1) }))
    .sort((a, b) => Number(b.avgPlayers) - Number(a.avgPlayers))
    .slice(0, 5);

  return { topMakers, topEras };
}

function computePlayerDerivedStats(
  playerStats,
  sortedWeeks,
  playerWinPctSparkline,
) {
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
}

function computeLeagueStats(sortedData, playerStats) {
  const weeklyPlayerCounts = getWeeklyPlayerCounts(sortedData);
  const counts = weeklyPlayerCounts.map((w) => w.count);
  const { rollingAvg13, rollingAvg52, prevAvg13, prevAvg52 } =
    getRollingAverages(counts);
  const { playersAllTime, players52, players13 } =
    getUniquePlayerCounts(sortedData);

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

  const honorsBoardStats = getHonorsBoardStats(playerStats, qualified);
  const trophyShelfStats = getTrophyShelfStats(
    sortedData,
    qualified13,
    qualified52,
  );
  const mostImprovedStats = getMostImprovedStats(playerStats, sortedData);
  const tableStats = getTableStats(sortedData);

  return {
    weeklyPlayerCounts,
    rollingAvg13,
    rollingAvg52,
    prevAvg13,
    prevAvg52,
    playersAllTime,
    players52,
    players13,
    ...honorsBoardStats,
    ...trophyShelfStats,
    ...mostImprovedStats,
    ...tableStats,
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

  computePlayerDerivedStats(playerStats, sortedWeeks, playerWinPctSparkline);

  sortPlayers(playerStats, rankKeyMap, sortProps);

  const leagueStats = computeLeagueStats(sortedWeeks, playerStats);

  return { playerStats, rankKeyMap, leagueStats };
}
