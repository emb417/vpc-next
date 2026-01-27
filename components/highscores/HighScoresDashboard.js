import HighScoresLeaderboards from "@/components/highscores/HighScoresLeaderboards";

async function getData() {
  try {
    const url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_RECENT_TABLES}?limit=4&offset=0`;
    console.log(`🚀 SSR Fetch Req ${url}`);

    const response = await fetch(url, { next: { revalidate: 300 } });

    console.log(
      `${response.ok ? "✅" : "❌"} SSR Fetch Resp ${response.status} ${response.headers.get("Date")} `,
    );

    const raw = await response.json();

    let scoresData = [];
    let totalCount = 0;

    if (Array.isArray(raw) && raw.length > 0) {
      scoresData = raw[0].results;
      totalCount = Number(raw[0].totalCount ?? scoresData.length);
    } else {
      console.error(
        "SSR unexpected API shape, returning empty results. Raw:",
        raw,
      );
    }

    return { props: { scoresData, totalCount } };
  } catch (error) {
    console.error("SSR getData error:", error);
    return { props: { scoresData: [], totalCount: 0 } };
  }
}

export default async function HighScoresDashboard() {
  const { props } = await getData();
  const { scoresData, totalCount } = props;

  return (
    <HighScoresLeaderboards
      scoresData={scoresData}
      totalCount={totalCount}
      tablesPageAPI={`${process.env.CSR_BASE_URL}${process.env.VPC_API_RECENT_TABLES}`}
      tableImagesAPI={`${process.env.CSR_BASE_URL}${process.env.VPS_API_TABLES_PATH}`}
    />
  );
}
