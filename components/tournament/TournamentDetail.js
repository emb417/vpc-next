import Link from "next/link";
import { GiTrophy } from "react-icons/gi";
import { formatDateRange } from "@/lib/formatDateRange";
import { fetchWithLogging } from "@/lib/fetchWithLogging";
import { logEvent } from "@/lib/logger";
import TournamentTableCard from "@/components/tournament/TournamentTableCard";
import CompetitionLeaderboardItem from "@/components/competition/CompetitionLeaderboardItem";

async function getTournament(id) {
  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_TOURNAMENTS}?id=${id}&limit=1`;
    const response = await fetchWithLogging(
      url,
      { cache: "no-store" },
      "getTournamentById",
    );
    if (!response.ok) throw new Error(`Upstream error ${response.status}`);
    const raw = await response.json();
    if (Array.isArray(raw) && raw.length > 0) {
      return raw[0].results?.[0] ?? null;
    }
    return null;
  } catch (error) {
    logEvent({ type: "tournament_detail_error", id, error: error.message });
    return null;
  }
}

export default async function TournamentDetail({ id }) {
  const tournament = await getTournament(id);

  if (!tournament) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-stone-700 dark:text-stone-200">
        <p>Tournament not found.</p>
        <Link
          href="/tournaments"
          className="text-orange-600 dark:text-orange-300 hover:underline"
        >
          ← Back to tournaments
        </Link>
      </div>
    );
  }

  const tables = [...(tournament.tables ?? [])].sort(
    (a, b) => a.tableIndex - b.tableIndex,
  );

  return (
    <div className="flex flex-col flex-grow w-full max-h-dvh">
      <div className="flex flex-row flex-wrap w-full items-center justify-start py-2 gap-2">
        <h1 className="flex flex-row items-center gap-1 text-lg text-stone-800 dark:text-stone-200">
          <GiTrophy />
          {tournament.name}
        </h1>
        <span className="text-md text-stone-500 dark:text-stone-400 sm:ml-auto whitespace-nowrap">
          {tables.length} tables ·{" "}
          {formatDateRange(tournament.startDate, tournament.endDate)}
          {tournament.status === "active" ? "" : " · ended"}
        </span>
      </div>

      <div className="flex flex-row w-full gap-2 text-stone-800 dark:text-stone-200 pb-2 mb-2 overflow-x-auto overflow-y-hidden">
        <div className="flex flex-row gap-2 mx-auto">
          {tables.map((t) => {
            const scores = [...(t.scores ?? [])].sort(
              (a, b) => b.score - a.score,
            );
            return (
              <div
                className="flex flex-col gap-2 items-center"
                key={t.vpsId}
                id={t.vpsId}
              >
                <TournamentTableCard data={t} />
                <div className="flex flex-col gap-1 overflow-auto rounded-xl min-w-[320px] max-w-[320px]">
                  {scores.length === 0 ? (
                    <p className="px-2 py-6 text-center text-sm text-stone-400 dark:text-stone-600">
                      No scores yet.
                    </p>
                  ) : (
                    scores.map((score, scoreIndex) => (
                      <CompetitionLeaderboardItem
                        key={`${score.username}-${score.score}`}
                        score={score}
                        scoreIndex={scoreIndex}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
