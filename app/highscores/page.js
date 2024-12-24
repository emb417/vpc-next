import { Suspense } from "react";
import HighScoresDashboard from "@/components/pinball/HighScoresDashboard";

export const metadata = {
  title: "High Score Corner",
  description: "VPC High Score Corner",
  alternates: {
    canonical: "/highscores",
  },
};

export default function HighScoreCornerPage() {
  return (
    <div className="flex flex-col flex-grow w-full px-4 max-h-screen">
      <Suspense
        fallback={
          <div className="w-full text-2xl text-stone-50 text-center flex justify-center items-center animate-pulse">
            Loading {metadata.title}...
          </div>
        }
      >
        <HighScoresDashboard />
      </Suspense>
    </div>
  );
}
