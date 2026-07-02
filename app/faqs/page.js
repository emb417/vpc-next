import FaqsHeader from "@/components/faqs/FaqsHeader";
import CompetitionRules from "@/components/faqs/CompetitionRules";
import TournamentRules from "@/components/faqs/TournamentRules";
import WeeklyRaffle from "@/components/faqs/WeeklyRaffle";
import CompetitionCornerPoints from "@/components/faqs/CompetitionCornerPoints";
import TournamentPoints from "@/components/faqs/TournamentPoints";
import HighScoreCorner from "@/components/faqs/HighScoreCorner";
import FaqsFooter from "@/components/faqs/FaqsFooter";

export const metadata = {
  title: "How to Join | Virtual Pinball Chat",
  description:
    "How to join Virtual Pinball Chat and start competing: Competition Corner and tournament rules, points scoring, the weekly table raffle, and posting scores with the Discord bot.",
};

export default function FaqsPage() {
  return (
    <div className="flex flex-col w-full items-center mb-14 py-4 px-2">
      <div className="w-full max-w-5xl space-y-8">
        <FaqsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CompetitionRules />
          <TournamentRules />
          <CompetitionCornerPoints />
          <TournamentPoints />
          <WeeklyRaffle />
          <HighScoreCorner />
        </div>

        <FaqsFooter />
      </div>
    </div>
  );
}
