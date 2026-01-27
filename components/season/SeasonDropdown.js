"use client";

import { Select } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SeasonDropdown({ currentSeason }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("season", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-stone-200">Season</span>
      <Select
        defaultValue={currentSeason.toString()}
        size="small"
        style={{ width: 60 }}
        onChange={handleChange}
        options={[
          { value: "5", label: "5" },
          { value: "4", label: "4" },
          { value: "3", label: "3" },
          { value: "2", label: "2" },
          { value: "1", label: "1" },
        ]}
        variant="filled"
        className="bg-white text-stone-700 hover:text-stone-700 duration-300"
      />
    </div>
  );
}
