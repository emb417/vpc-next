import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import Leaderboards from "@/components/pinball/Leaderboards";

export const metadata = {
  title: "Virtual Pinball Chat",
  description: "Virtual Pinball Chat Leaderboards, History, and Stats",
  alternates: {
    canonical: "/",
  },
};

export default function PinballPage() {
  return (
    <div className="flex w-full justify-center items-start">
      <Suspense
        fallback={<LoadingMessage message={`Loading ${metadata.title}...`} />}
      >
        <Leaderboards />
      </Suspense>
    </div>
  );
}
