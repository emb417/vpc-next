"use client";

import Link from "next/link";
import { Tooltip } from "antd";
import { MdOpenInNew } from "react-icons/md";
import CopyButton from "@/components/shared/CopyButton";

/**
 * LeaderboardTitleCardContent
 *
 * Shared children content for LeaderboardTitleCard across all leaderboard types.
 *
 * Props:
 *   title        - string              – table display name
 *   vpsId        - string              – VPS ID
 *   downloadUrl  - string              – download link
 *   weekNumber   - number | undefined  – shows "Week #N" if provided
 *   periodStart  - string | undefined  – ISO date string
 *   periodEnd    - string | undefined  – ISO date string
 *   version      - string | undefined  – shows "vX.X.X" if provided
 *   author       - string | undefined  – shows author name if provided
 */
export default function LeaderboardTitleCardContent({
  title,
  vpsId,
  downloadUrl = "#",
  weekNumber,
  periodStart,
  periodEnd,
  version,
  author,
}) {
  const dateFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  const showDateRange =
    periodStart && periodEnd && periodStart !== "0NaN-aN-aN";

  return (
    <div className="flex flex-col items-center gap-0 w-full">
      {weekNumber && (
        <div className="text-sm leading-none py-0.5">Week #{weekNumber}</div>
      )}

      {showDateRange && (
        <div className="text-sm leading-none py-0.5">
          {new Date(periodStart).toLocaleDateString(
            undefined,
            dateFormatOptions,
          )}
          {" to "}
          {new Date(periodEnd).toLocaleDateString(undefined, dateFormatOptions)}
        </div>
      )}

      {/* Title + Version */}
      <Link
        href={downloadUrl}
        target="_blank"
        className="text-xl leading-none py-0.5 hover:text-orange-300 transition-colors duration-150"
      >
        {title}
        {version && (
          <span className="text-sm text-stone-400 ml-1">v{version}</span>
        )}
      </Link>

      {/* Author (HighScores only) */}
      {author && (
        <div className="text-md leading-none py-0.5 text-stone-300">
          {author}
        </div>
      )}

      {/* VPS ID + Download URL */}
      <div className="flex flex-row items-center justify-center gap-2 text-xs leading-none py-0.5 w-full">
        <span className="text-stone-400">VPS ID</span>
        <span className="font-mono text-stone-300">{vpsId}</span>
        <CopyButton text={vpsId} label="VPS ID" />
        <Tooltip title={downloadUrl} color="rgba(41, 37, 36, 0.9)">
          <Link
            href={downloadUrl}
            target="_blank"
            className="flex items-center gap-0.5 text-orange-400 hover:text-orange-300 transition-colors duration-150"
          >
            <MdOpenInNew className="shrink-0" />
            <span>Download</span>
          </Link>
        </Tooltip>
        <CopyButton text={downloadUrl} label="URL" />
      </div>
    </div>
  );
}
