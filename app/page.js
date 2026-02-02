import { Suspense } from "react";
import LoadingMessage from "@/components/nav/LoadingMessage";
import MainDashboard from "@/components/main/MainDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Virtual Pinball Chat",
  description:
    "The hub for the Virtual Pinball Chat Competition League. Track weekly standings and power rankings, view global high scores, and dive into detailed player profiles and performance statistics.",
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
        <MainDashboard />
      </Suspense>
    </div>
  );
}
