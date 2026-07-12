export function formatCardDate(date) {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDateRange(start, end) {
  const from = formatCardDate(start);
  const to = formatCardDate(end);

  if (from && to) {
    const startDate = new Date(`${start}T00:00:00`);
    const endDate = new Date(`${end}T00:00:00`);
    const diffTime = endDate - startDate;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let duration = "";
    if (diffDays > 0) {
      if (diffDays % 7 === 0) {
        const weeks = diffDays / 7;
        duration = `${weeks} ${weeks === 1 ? "Week" : "Weeks"}`;
      } else {
        duration = `${diffDays} ${diffDays === 1 ? "Day" : "Days"}`;
      }
    }

    const range = `${from} – ${to}`;
    return duration ? `${duration} · ${range}` : range;
  }

  return from || to;
}
