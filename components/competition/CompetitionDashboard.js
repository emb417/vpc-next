import CompetitionLeaderboards from "@/components/competition/CompetitionLeaderboards";

async function getData(searchTerm) {
  try {
    let url = `${process.env.SSR_BASE_URL}${process.env.VPC_API_COMPETITION_WEEKS}`;
    if (searchTerm) {
      url += `?searchTerm=${searchTerm}`;
    }
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

export default async function CompetitionDashboard({ searchTerm }) {
  const { props } = await getData(searchTerm);
  const { scoresData, totalCount } = props;
  return (
    <CompetitionLeaderboards
      scoresData={scoresData}
      totalCount={totalCount}
      weeksPageAPI={`${process.env.CSR_BASE_URL}${process.env.VPC_API_COMPETITION_WEEKS}`}
      tableImagesAPI={`${process.env.CSR_BASE_URL}${process.env.VPS_API_TABLES_PATH}`}
    />
  );
}
