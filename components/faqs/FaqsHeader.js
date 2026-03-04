import { FaDiscord } from "react-icons/fa";
import { BsTable } from "react-icons/bs";
import { MdAddAPhoto } from "react-icons/md";

const steps = [
  {
    icon: <FaDiscord size={28} />,
    step: "1",
    title: "Join the Discord",
    description:
      "Hardware. Software. Competition. VPC is the all-in-one community for virtual pinball enthusiasts.",
  },
  {
    icon: <BsTable size={28} />,
    step: "2",
    title: "Play Table of the Week",
    description:
      "The competition-corner channel chooses a new table every week for competition.",
  },
  {
    icon: <MdAddAPhoto size={28} />,
    step: "3",
    title: "Post Your Score",
    description:
      "Share a photo of your score in Discord to get on the leaderboard and enter the weekly raffle.",
  },
];

export default function FaqsHeader() {
  return (
    <div className="text-center space-y-10">
      <h1 className="text-3xl text-stone-200">How to Join</h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        {steps.map(({ icon, step, title, description }, i) => (
          <>
            <div
              key={step}
              className="flex flex-col items-center gap-3 bg-stone-800 rounded-2xl px-6 py-5 w-full sm:w-56 text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-300/10 text-orange-300">
                {icon}
              </div>
              <div>
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1">
                  Step {step}
                </div>
                <div className="text-white font-semibold">{title}</div>
                <div className="text-stone-400 text-sm mt-1">{description}</div>
              </div>
            </div>

            {i < steps.length - 1 && (
              <div className="text-stone-600 text-2xl rotate-90 sm:rotate-0">
                →
              </div>
            )}
          </>
        ))}
      </div>

      <a
        href="https://discord.gg/9WnaJHXg"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-full font-bold transition-colors duration-300"
      >
        <FaDiscord size={24} />
        Join our Discord
      </a>
    </div>
  );
}
