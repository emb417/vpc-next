export function onFilterNumeric(value, record, operator) {
  const [op, filterValue] = value.split(",");
  const numberValue = record[operator];
  switch (op) {
    case "gt":
      return numberValue > Number(filterValue);
    case "lt":
      return numberValue < Number(filterValue);
    case "eq":
      return numberValue === Number(filterValue);
    default:
      return true;
  }
}

export function avgPosition(sortedData, username, sliceStart, sliceEnd) {
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

export function positionImprovement(sortedData, username, windowSize) {
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

export function playerWinPctSparkline(sortedData, username, weeks = 26) {
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
