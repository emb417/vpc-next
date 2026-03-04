import { logEvent } from "@/lib/logger";

export async function fetchWithLogging(
  url,
  options = {},
  operation = "unknown",
) {
  const start = Date.now();

  logEvent({ type: "fetch_start", operation, url });

  try {
    const response = await fetch(url, options);
    const durationMs = Date.now() - start;

    logEvent({
      type: "fetch_complete",
      operation,
      url,
      status: response.status,
      ok: response.ok,
      durationMs,
    });

    return response;
  } catch (error) {
    const durationMs = Date.now() - start;

    logEvent({
      type: "fetch_error",
      operation,
      url,
      durationMs,
      error: error.message,
    });

    throw error;
  }
}
