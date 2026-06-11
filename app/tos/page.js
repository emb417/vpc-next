export default function TosPage() {
  return (
    <main className="max-w-4xl mx-auto my-12 p-6 sans text-stone-800 dark:text-stone-200">
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-orange-500 pb-2 inline-block">
        Terms of Service
      </h1>
      <div className="space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">Scope</h2>
          <p>
            These terms apply to the Virtual Pinball Chat (VPC) statistics website and the associated Discord bot.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Service Purpose</h2>
          <p>
            The service provides leaderboards and statistics for the VPC league based on scores and data posted in the official Discord channel.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">League Rules</h2>
          <p>
            All participants are expected to adhere to the league rules. Detailed rules and guidelines can be found on our <a href="/faqs" className="text-orange-600 dark:text-orange-300 hover:underline">FAQ page</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">User Agreement</h2>
          <p>
            By using the Discord bot or participating in the league, users agree to have their basic Discord profile information, posted scores, and raffle entries displayed on the website for statistics and leaderboard purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p>
            For any inquiries regarding these terms, please contact a moderator in the <a href="https://discord.gg/9WnaJHXg" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-300 hover:underline">Discord server</a> or reach out to <code>@emb417</code>.
          </p>
        </section>
      </div>
    </main>
  );
}
