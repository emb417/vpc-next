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
  if (from && to) return `${from} – ${to}`;
  return from || to;
}
