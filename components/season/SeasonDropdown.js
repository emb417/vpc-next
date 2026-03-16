"use client";

import { Select } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SeasonDropdown({ currentSeasonId, seasonOptions }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("season", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={currentSeasonId.toString()}
      size="small"
      style={{ minWidth: 200 }}
      onChange={handleChange}
      options={seasonOptions}
      variant="filled"
      className="bg-stone-200 dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:text-orange-700 dark:hover:text-orange-300 duration-300"
    />
  );
}
