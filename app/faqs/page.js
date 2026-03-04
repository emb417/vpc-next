import FaqsHeader from "@/components/faqs/FaqsHeader";
import CompetitionRules from "@/components/faqs/CompetitionRules";
import ScoreBotUsage from "@/components/faqs/ScoreBotUsage";
import WeeklyRaffle from "@/components/faqs/WeeklyRaffle";
import LeagueInfo from "@/components/faqs/LeagueInfo";
import HighScoreCorner from "@/components/faqs/HighScoreCorner";
import FaqsFooter from "@/components/faqs/FaqsFooter";

export const metadata = {
  title: "How to Join | Virtual Pinball Chat",
  description:
    "Learn how to join the Virtual Pinball Chat community, participate in weekly competitions, and use our Discord bot for score tracking.",
};

export default function FaqsPage() {
  return (
    <div className="flex flex-col w-full items-center mb-14 py-4 px-2">
      <div className="w-full max-w-5xl space-y-8">
        <FaqsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CompetitionRules />
          <ScoreBotUsage />
          <WeeklyRaffle />
          <LeagueInfo />
          <HighScoreCorner />
        </div>

        <FaqsFooter />
      </div>
    </div>
  );
}
