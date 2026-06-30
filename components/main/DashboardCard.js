import Link from "next/link";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";

/**
 * Spacious navigation card for the dashboard. A large hero
 * image sits above the title + subtitle, and the whole card is a single link
 * to that section's full page (weekly competition, a tournament, etc.).
 */
export default function DashboardCard({
  href,
  icon,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  tables,
  channel,
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col min-h-[434px] rounded-2xl border-2 border-orange-500 dark:border-orange-950 bg-stone-100 dark:bg-stone-900 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition duration-300"
    >
      <div className="relative w-full aspect-[4/3] bg-stone-300 dark:bg-stone-800 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-contain opacity-90 group-hover:opacity-100 transition duration-500"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex flex-col gap-1 pb-3 border-b border-stone-200 dark:border-stone-800">
          {channel ? (
            <span className="inline-flex w-fit max-w-full items-center gap-1 truncate rounded-full bg-indigo-100 px-2 py-0.5 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              <FaDiscord className="shrink-0" />#{channel}
            </span>
          ) : null}
          <div className="flex items-center gap-2 min-w-0">
            {icon ? (
              <span className="shrink-0 text-xl text-orange-600 dark:text-orange-300">
                {icon}
              </span>
            ) : null}
            <span className="truncate text-xl font-bold text-stone-800 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-300 duration-300">
              {title}
            </span>
          </div>
          <span className="truncate text-sm text-stone-500 dark:text-stone-400">
            {subtitle}
          </span>
          <span className="truncate text-sm uppercase text-stone-700 dark:text-stone-200">
            {tables?.length} {tables?.length === 1 ? "table" : "tables"}
          </span>
        </div>

        {tables?.length ? (
          <div className="mt-auto h-16 overflow-y-auto">
            <ul className="flex flex-col gap-0.5">
              {tables.map((table, i) => (
                <li
                  key={`${table}-${i}`}
                  className="truncate text-sm text-stone-600 dark:text-stone-300"
                >
                  {table}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
