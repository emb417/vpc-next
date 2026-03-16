"use client";

import Link from "next/link";
import { Tooltip } from "antd";
import { MdOpenInNew } from "react-icons/md";
import CopyButton from "@/components/shared/CopyButton";

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
        <div className="text-sm text-stone-100 leading-none py-0.5">
          Week #{weekNumber}
        </div>
      )}

      {showDateRange && (
        <div className="text-sm text-stone-100 leading-none py-0.5">
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
        className="text-lg text-stone-100 leading-none py-0.5 hover:text-orange-300 transition-colors duration-150"
      >
        {title}
        {version && (
          <span className="text-sm text-orange-300 ml-1">v{version}</span>
        )}
      </Link>

      {/* Author (HighScores only) */}
      {author && (
        <div className="text-md leading-none py-0.5 text-stone-200">
          {author}
        </div>
      )}

      {/* VPS ID + Download URL */}
      <div className="flex flex-row items-center justify-center gap-1 text-xs leading-none py-0.5 w-full">
        <span className="text-stone-200">VPS ID</span>
        <span className="font-mono text-stone-200">{vpsId}</span>
        <CopyButton text={vpsId} label="VPS ID" />
        <span className="text-stone-200 pl-2">Table URL</span>
        <CopyButton text={downloadUrl} label="URL" />
      </div>
    </div>
  );
}
