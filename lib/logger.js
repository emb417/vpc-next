import "server-only";
import { headers } from "next/headers";

export async function logEvent(event) {
  let requestId = "unknown";
  try {
    const h = await headers();
    requestId = h.get("x-request-id") ?? "unknown";
  } catch (e) {}

  console.log(
    JSON.stringify({
      requestId,
      timestamp: new Date().toISOString(),
      ...event,
    }),
  );
}
