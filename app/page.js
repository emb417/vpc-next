import { Suspense } from "react";
import { GiAncientColumns, GiChart, GiProgression } from "react-icons/gi";
import Leaderboards from "@/components/pinball/Leaderboards";

export const metadata = {
  title: "Virtual Pinball Chat",
  description: "Virtual Pinball Chat Leaderboards, History, and Stats",
  alternates: {
    canonical: "/",
  }
};

const navItems = [
  {
    id: 1,
    icon: <GiChart className="text-xl" />,
    href: "/season",
    text: "Season",
  },
  {
    id: 2,
    icon: <GiAncientColumns className="text-xl" />,
    href: "/history",
    text: "History",
  },
  {
    id: 3,
    icon: <GiProgression className="text-2xl" />,
    href: "/stats",
    text: "Stats",
  },
];

export default function PinballPage() {
  return (
    <div className="flex flex-wrap w-full px-4">
      <div className="flex w-full justify-center items-start">
        <Suspense
          fallback={
            <div className="w-full text-2xl text-stone-50 text-center flex justify-center items-center animate-pulse">
              Loading {metadata.title}...
            </div>
          }
        >
          <Leaderboards />
        </Suspense>
      </div>
    </div>
  );
}
