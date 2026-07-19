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
  romUrl,
  romName,
  b2sUrl,
  b2sName,
}) {
  const dateFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  const showDateRange =
    periodStart && periodEnd && periodStart !== "0NaN-aN-aN";

  const hasRom = romUrl && romUrl !== "N/A";
  const hasB2s = b2sUrl && b2sUrl !== "N/A";
  const romLabel =
    romName && romName !== "N/A"
      ? romName
      : version
        ? `v${version}`
        : "Download";
  const b2sLabel =
    b2sName && b2sName !== "N/A"
      ? b2sName
      : version
        ? `v${version}`
        : "Download";

  return (
    <div className="flex flex-col items-center gap-1 text-center w-full text-stone-800 dark:text-stone-200">
      {(weekNumber || showDateRange) && (
        <span className="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
          {weekNumber && `Week #${weekNumber}`}
          {weekNumber && showDateRange && " · "}
          {showDateRange &&
            `${new Date(periodStart).toLocaleDateString(
              undefined,
              dateFormatOptions,
            )} - ${new Date(periodEnd).toLocaleDateString(
              undefined,
              dateFormatOptions,
            )}`}
        </span>
      )}

      {/* Title + Version */}
      <Link
        href={downloadUrl}
        target="_blank"
        className="text-lg leading-tight hover:text-orange-600 dark:hover:text-orange-300 duration-150"
      >
        {title}
        {version && (
          <span className="text-sm text-orange-600 dark:text-orange-300 ml-1">
            v{version}
          </span>
        )}
      </Link>

      {/* Author */}
      {author && (
        <span
          title={author}
          className="block w-full truncate text-sm text-stone-600 dark:text-stone-300"
        >
          {author}
        </span>
      )}

      {/* VPS ID + ROM + B2S */}
      {(vpsId || hasRom || hasB2s) && (
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
          {vpsId && (
            <span className="flex items-center gap-1">
              <span className="text-stone-500 dark:text-stone-400">VPS ID</span>
              <span className="font-mono">{vpsId}</span>
              <CopyButton text={vpsId} label="VPS ID" />
            </span>
          )}
          {hasRom && (
            <span className="flex items-center gap-1">
              <span className="text-stone-500 dark:text-stone-400">ROM</span>
              <Link
                href={romUrl}
                target="_blank"
                className="text-orange-600 dark:text-orange-300 hover:underline"
              >
                {romLabel}
              </Link>
            </span>
          )}
          {hasB2s && (
            <span className="flex items-center gap-1">
              <span className="text-stone-500 dark:text-stone-400">B2S</span>
              <Link
                href={b2sUrl}
                target="_blank"
                className="text-orange-600 dark:text-orange-300 hover:underline"
              >
                {b2sLabel}
              </Link>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
