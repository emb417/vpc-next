/**
 * Returns the status of a tournament based on its window.
 *
 * @param {string} startDate - `YYYY-MM-DD`
 * @param {string} endDate - `YYYY-MM-DD`
 * @returns {'future' | 'current' | 'past'}
 */
export function getTournamentStatus(startDate, endDate) {
  const today = new Date().toISOString().slice(0, 10);
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
 * Note: "today" here is computed in UTC (`toISOString`), whereas the bot's
 * scheduler runs in Pacific. This can differ by at most one day around
 * midnight — acceptable for hiding pending/just-ended tournaments on the
 * dashboard.
 *
 * @param {string} startDate - `YYYY-MM-DD`
 * @param {string} endDate - `YYYY-MM-DD`
 * @returns {boolean}
 */
export function isTournamentActive(startDate, endDate) {
  return getTournamentStatus(startDate, endDate) === 'current';
}
