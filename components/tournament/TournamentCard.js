import { GiTrophy } from "react-icons/gi";
import TournamentStandings from "@/lib/TournamentStandings";
import TournamentLeaderboard from "@/components/tournament/TournamentLeaderboard";
import DashboardCard from "@/components/main/DashboardCard";
import { formatDateRange } from "@/lib/formatDateRange";
import { getTournamentStatus } from "@/lib/tournamentWindowStatus";

export default function TournamentCard({ tournament }) {
  const standings = TournamentStandings(tournament);
  const status = getTournamentStatus(tournament.startDate, tournament.endDate);

  const topBorderClass = {
    current: "border-t-4 border-green-500",
    future: "border-t-4 border-blue-500",
    past: "border-t-4 border-stone-400",
  }[status];

  const sortedTables = [...(tournament.tables ?? [])].sort(
    (a, b) => a.tableIndex - b.tableIndex,
  );
  const imageSrc =
    sortedTables.find((t) => t.vpsData?.imgUrl)?.vpsData?.imgUrl ?? null;
  const tableNames = sortedTables.map((t) => t.table);

  return (
    <div
      className={`flex flex-col gap-3 shrink-0 w-[292px] h-full min-h-0 rounded-lg ${topBorderClass}`}
    >
      <DashboardCard
        href={`/tournaments/${tournament._id}`}
        icon={<GiTrophy />}
        title={tournament.name}
        subtitle={formatDateRange(tournament.startDate, tournament.endDate)}
        imageSrc={imageSrc}
        imageAlt={tournament.name}
        tables={tableNames}
        channel={tournament.channelName}
      />

      <div className="flex flex-col flex-1 min-h-0 overflow-auto">
        {standings.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-stone-400 dark:text-stone-600">
            No scores posted yet.
          </p>
        ) : (
          <TournamentLeaderboard standings={standings} />
        )}
      </div>
    </div>
  );
}
