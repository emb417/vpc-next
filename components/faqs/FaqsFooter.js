import { FaDiscord } from "react-icons/fa";

export default function FaqsFooter() {
  return (
    <div className="text-center pt-8 border-t border-orange-500/30 dark:border-orange-950/30 space-y-6">
      <p className="text-stone-500 text-sm">
        Still have questions?{" "}
        <a
          href="https://discord.gg/9WnaJHXg"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#5865F2] hover:text-[#4752C4] font-medium transition-colors"
        >
          <FaDiscord size={14} />
          Ask in Discord
        </a>
      </p>

      <div className="inline-block font-mono text-xs leading-tight text-orange-600 dark:text-orange-300 hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-500 select-none">
        <p>+-------------------+</p>
        <p>| KEEP ON FLIPPING! |</p>
        <p>+-------------------+</p>
        <p className="mt-1 text-center">*** INSERT COIN ***</p>
      </div>
    </div>
  );
}
