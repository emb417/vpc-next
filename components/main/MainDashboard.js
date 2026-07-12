import RecentStats from "@/lib/RecentStats";
import LeaderboardStats from "@/lib/LeaderboardStats";
import { isTournamentActive } from "@/lib/tournamentWindowStatus";
import { GiPinballFlipper, GiTrophy } from "react-icons/gi";
import DashboardCard from "@/components/main/DashboardCard";
import { fetchWithLogging } from "@/lib/fetchWithLogging";
import { logEvent } from "@/lib/logger";
import { formatDateRange } from "@/lib/formatDateRange";

async function getData() {
  const overallStart = Date.now();

  logEvent({ type: "main_dashboard_start" });

  try {
    const recentUrl = `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_WEEKS}?limit=13`;

    const recentResponse = await fetchWithLogging(
      recentUrl,
      { cache: "no-store" },
      "getRecentWeeks",
    );

    const data = await recentResponse.json();

    const positionWeeksData = LeaderboardStats(data);
    const recentPlayerStats = RecentStats(data);

    const vpsData = positionWeeksData?.[0]?.vpsData || null;

    logEvent({
      type: "main_dashboard_complete",
      durationMs: Date.now() - overallStart,
    });

    return {
      props: { recentPlayerStats, positionWeeksData, vpsData },
    };
  } catch (error) {
    logEvent({
      type: "main_dashboard_error",
      error: error.message,
    });

    return {
      props: { recentPlayerStats: [], positionWeeksData: [], vpsData: null },
    };
  }
}

async function getActiveTournaments() {
  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_TOURNAMENTS}?status=active`;
    const response = await fetchWithLogging(
      url,
      { cache: "no-store" },
      "getActiveTournaments",
    );
    if (!response.ok) return [];
    const raw = await response.json();
    if (Array.isArray(raw) && raw.length > 0) {
      const results = raw[0].results ?? [];
      return results.filter((t) => isTournamentActive(t.startDate, t.endDate));
    }
    return [];
  } catch (error) {
    logEvent({
      type: "main_dashboard_tournaments_error",
      error: error.message,
    });
    return [];
  }
}

export default async function Leaderboards() {
  const [{ props }, tournaments] = await Promise.all([
    getData(),
    getActiveTournaments(),
  ]);
  const { positionWeeksData, vpsData } = props;
  const weekData = positionWeeksData?.[0] ?? null;
  const hasTournaments = tournaments.length > 0;

  return (
    <div className="w-full min-h-full lg:h-full lg:min-h-0 lg:overflow-y-auto">
      <div
        className={
          hasTournaments
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 w-full max-w-screen-xl mx-auto"
            : "flex flex-wrap justify-center gap-8 p-4 w-full max-w-screen-xl mx-auto [&>*]:w-full [&>*]:sm:w-[360px]"
        }
      >
        {/* Current weekly competition */}
        {weekData && (
          <DashboardCard
            href={`/competitions?week=${weekData.weekNumber}`}
            icon={<GiPinballFlipper />}
            title={`Week ${weekData.weekNumber}`}
            subtitle={formatDateRange(weekData.periodStart, weekData.periodEnd)}
            imageSrc={vpsData?.imgUrl ?? null}
            imageAlt={weekData.table}
            tables={weekData.table ? [weekData.table] : undefined}
            channel={weekData.channelName}
          />
        )}

        {/* Active tournaments, most recent first */}
        {tournaments.map((tournament) => {
          const sortedTables = [...(tournament.tables ?? [])].sort(
            (a, b) => a.tableIndex - b.tableIndex,
          );
          const imageSrc =
            sortedTables.find((t) => t.vpsData?.imgUrl)?.vpsData?.imgUrl ??
            null;
          const tableNames = sortedTables.map((t) => t.table);

          return (
            <DashboardCard
              key={tournament._id ?? tournament.name}
              href={`/tournaments/${tournament._id}`}
              icon={<GiTrophy />}
              title={tournament.name}
              subtitle={formatDateRange(
                tournament.startDate,
                tournament.endDate,
              )}
              imageSrc={imageSrc}
              imageAlt={tournament.name}
              tables={tableNames}
              channel={tournament.channelName}
            />
          );
        })}
      </div>
    </div>
  );
}
