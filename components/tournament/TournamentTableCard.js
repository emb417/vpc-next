import Link from "next/link";
import Image from "next/image";
import CopyButton from "@/components/shared/CopyButton";

export default function TournamentTableCard({ data }) {
  const imgUrl = data.vpsData?.imgUrl;
  const hasRom = data.romUrl && data.romUrl !== "N/A";
  const hasB2s = data.b2sUrl && data.b2sUrl !== "N/A";
  const romLabel =
    data.romName && data.romName !== "N/A" ? data.romName : "Download";
  const b2sLabel =
    data.b2sName && data.b2sName !== "N/A" ? data.b2sName : "Download";

  return (
    <div className="flex flex-col items-center w-[320px]">
      <div className="relative w-[316px] aspect-[3/2] bg-stone-950 rounded-xl border-2 border-orange-500 dark:border-orange-950 overflow-hidden">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={data.table}
            fill
            sizes="316px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="mt-2 flex flex-col items-center gap-1 text-center w-full text-stone-800 dark:text-stone-200">
        <span className="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
          Table {data.tableIndex}
        </span>

        <Link
          href={data.tableUrl || "#"}
          target="_blank"
          className="text-lg leading-tight hover:text-orange-600 dark:hover:text-orange-300 duration-150"
        >
          {data.table}
          {data.versionNumber && (
            <span className="text-sm text-orange-600 dark:text-orange-300 ml-1">
              v{data.versionNumber}
            </span>
          )}
        </Link>

        {data.authorName && (
          <span
            title={data.authorName}
            className="block w-full truncate px-2 text-sm text-stone-600 dark:text-stone-300"
          >
            {data.authorName}
          </span>
        )}

        <div className="flex flex-row items-center justify-center gap-1 text-xs">
          <span className="text-stone-500 dark:text-stone-400">VPS ID</span>
          <span className="font-mono">{data.vpsId}</span>
          <CopyButton text={data.vpsId} label="VPS ID" />
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-0.5 text-xs">
          <span className="flex items-center gap-1">
            <span className="text-stone-500 dark:text-stone-400">ROM</span>
            {hasRom ? (
              <Link
                href={data.romUrl}
                target="_blank"
                className="text-orange-600 dark:text-orange-300 hover:underline"
              >
                {romLabel}
              </Link>
            ) : (
              <span className="text-stone-500 dark:text-stone-400">N/A</span>
            )}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-stone-500 dark:text-stone-400">B2S</span>
            {hasB2s ? (
              <Link
                href={data.b2sUrl}
                target="_blank"
                className="text-orange-600 dark:text-orange-300 hover:underline"
              >
                {b2sLabel}
              </Link>
            ) : (
              <span className="text-stone-500 dark:text-stone-400">N/A</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
