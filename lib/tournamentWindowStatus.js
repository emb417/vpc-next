/**
 * Returns the status of a tournament based on its window.
 *
 * @param {string} startDate - `YYYY-MM-DD`
 * @param {string} endDate - `YYYY-MM-DD`
 * @returns {'future' | 'current' | 'past'}
 */
export function getTournamentStatus(startDate, endDate) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());
  
  const y = parts.find(p => p.type === 'year').value;
  const m = parts.find(p => p.type === 'month').value;
  const d = parts.find(p => p.type === 'day').value;
  
  const today = `${y}-${m}-${d}`;

  if (startDate && today < startDate) return 'future';
  if (endDate && today > endDate) return 'past';
  return 'current';
}

/**
 * Whether a tournament's window currently includes today, i.e.
 * startDate <= today <= endDate. Dates are `YYYY-MM-DD` strings compared
 * lexicographically, mirroring the bot's `tournamentWindowStatus`
 * (vpc-bot/src/utils/formatting.js).
 *
 * Note: "today" here is computed in Pacific Time (America/Los_Angeles). This accurately
 * mirrors the bot's scheduler, ensuring consistent status checks on the dashboard.
 *
 * @param {string} startDate - `YYYY-MM-DD`
 * @param {string} endDate - `YYYY-MM-DD`
 * @returns {boolean}
 */
export function isTournamentActive(startDate, endDate) {
  return getTournamentStatus(startDate, endDate) === 'current';
}
