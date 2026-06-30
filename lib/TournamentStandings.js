/**
 * Compute tournament standings: total points per player summed across every
 * table, with raw score as the tiebreaker. Mirrors the bot's
 * calculateSeasonPoints so the Discord embed and the website agree.
 *
 * Unlike the season leaderboard, this is intentionally simple — no
 * win-percentage and no avatar suppression. A player is included as long as
 * they posted on any table, and the avatar from any of their scores is kept.
 *
 * @param {Object} tournament - tournament doc with `tables[].scores[]`
 * @returns {Array} [{ username, userAvatarUrl, points, score, tablesPlayed, position }]
 */
export default function TournamentStandings(tournament) {
  if (!tournament || !Array.isArray(tournament.tables)) return [];

  const players = new Map();

  for (const table of tournament.tables) {
    for (const s of table.scores ?? []) {
      const key = s.username?.toLowerCase();
      if (!key) continue;

      const points = Number(s.points) || 0;
      const score = Number(s.score) || 0;
      const existing = players.get(key);

      if (existing) {
        existing.points += points;
        existing.score += score;
        existing.tablesPlayed += 1;
        if (!existing.userAvatarUrl && s.userAvatarUrl) {
          existing.userAvatarUrl = s.userAvatarUrl;
        }
      } else {
        players.set(key, {
          username: s.username,
          userAvatarUrl: s.userAvatarUrl ?? null,
          points,
          score,
          tablesPlayed: 1,
        });
      }
    }
  }

  return Array.from(players.values())
    .sort((a, b) => b.points - a.points || b.score - a.score)
    .map((row, index) => ({ ...row, position: index + 1 }));
}
