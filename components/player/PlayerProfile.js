import { redirect } from "next/navigation";
import PlayerSummaryData from "@/lib/PlayerStats";
import PlayerBio from "@/components/player/PlayerBio";
import PlayerRivals from "@/components/player/PlayerRivals";
import PlayerCompetitions from "@/components/player/PlayerCompetitions";
import PlayerHighScores from "@/components/player/PlayerHighScores";
import PlayerInsights from "@/components/player/PlayerInsights";
import PlayerHighScoreInsights from "@/components/player/PlayerHighScoreInsights";
import PlayerCharts from "@/components/player/PlayerCharts";
import { fetchWithLogging } from "@/lib/fetchWithLogging";
import { logEvent } from "@/lib/logger";

async function getPlayerHighScores(username) {
  const start = Date.now();

  logEvent({
    type: "player_high_scores_start",
    username,
  });

  try {
    const url = `${process.env.SSR_BASE_URL}/vpc/api/v1/scoresByPlayer?username=${encodeURIComponent(username)}`;

    const response = await fetchWithLogging(
      url,
      { cache: "no-store" },
      "getPlayerHighScores",
    );

    if (!response.ok) {
      throw new Error(`Upstream error ${response.status}`);
    }

    const data = await response.json();

    logEvent({
      type: "player_high_scores_complete",
      username,
      durationMs: Date.now() - start,
    });

    return data;
  } catch (error) {
    logEvent({
      type: "player_high_scores_error",
      username,
      error: error.message,
      durationMs: Date.now() - start,
    });

    return [];
  }
}

async function getPlayerSummaryData(username) {
  const start = Date.now();

  logEvent({
    type: "player_profile_start",
    username,
  });

  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_WEEKS}?limit=9999`;

    const response = await fetchWithLogging(
      url,
      { cache: "no-store" },
      "getRecentWeeksForPlayerProfile",
    );

    if (!response.ok) {
      throw new Error(`Upstream error ${response.status}`);
    }

    const data = await response.json();

    const result = PlayerSummaryData(data, username);

    logEvent({
      type: "player_profile_complete",
      username,
      durationMs: Date.now() - start,
    });

    return result;
  } catch (error) {
    logEvent({
      type: "player_profile_error",
      username,
      error: error.message,
      durationMs: Date.now() - start,
    });

    throw new Error("Server Error");
  }
}

export default async function PlayerProfile({ username }) {
  const [
    { playerStats, playerRivals, user, userPositionData },
    highScores,
  ] = await Promise.all([
    getPlayerSummaryData(username),
    getPlayerHighScores(username),
  ]);

  if (!user) {
    logEvent({
      type: "player_profile_redirect",
      username,
      reason: "user_not_found",
    });

    redirect("/");
  }

  // Create vpsLookup from highScores for PlayerHighScoreInsights
  const vpsLookup = Object.fromEntries(
    highScores
      .filter((s) => s.vpsId && s.vpsData)
      .map((s) => [
        s.vpsId,
        {
          maker: s.vpsData.maker,
          year: s.vpsData.year,
          designer: s.vpsData.designer,
        },
      ]),
  );

  return (
    <div className="flex flex-col w-full items-center gap-4 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-4xl">
        <PlayerBio user={playerStats || user} />
        {playerRivals.some((rival) => rival !== undefined) && (
          <PlayerRivals playerRivals={playerRivals} />
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-4xl lg:max-w-full">
        <div className="lg:col-span-1">
          <PlayerCompetitions weeksData={userPositionData} />
        </div>
        <div className="lg:col-span-2">
          <PlayerHighScores highScores={highScores} />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full max-w-4xl xl:max-w-full">
        <div className="flex flex-col gap-4">
          <PlayerInsights user={user} />
          <PlayerCharts weeksData={userPositionData} username={user.username} />
        </div>
        <div>
          <PlayerHighScoreInsights
            highScores={highScores}
            vpsLookup={vpsLookup}
          />
        </div>
      </div>
    </div>
  );
}
