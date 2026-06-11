export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto my-12 p-6 sans text-stone-800 dark:text-stone-200">
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-orange-500 pb-2 inline-block">
        Privacy Policy
      </h1>
      <div className="space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
          <p>
            The Discord bot collects and stores the following information from users who participate in the league:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Discord User ID</li>
            <li>Discord Username</li>
            <li>Discord Avatar URL</li>
            <li>Scores and raffle entries posted in the Discord channel</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Purpose of Processing</h2>
          <p>
            This data is used exclusively to associate scores with the correct player, track league progress, and display accurate leaderboards and statistics on the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Data Storage & Security</h2>
          <p>
            All data is stored securely in MongoDB Atlas. Access to this data is strictly limited to site administrators.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">No Tracking or Sharing</h2>
          <p>
            This website does not use tracking cookies, telemetry, or analytics. We do not sell, lease, or share any user data with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Data Control</h2>
          <p>
            Users wishing to have their data removed or corrected should contact a moderator in the <a href="https://discord.gg/9WnaJHXg" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-300 hover:underline">Discord server</a> or reach out to <code>@emb417</code>.
          </p>
        </section>
      </div>
    </main>
  );
}
