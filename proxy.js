import { NextResponse } from "next/server";

export function proxy(req) {
  const { pathname, search } = req.nextUrl;

  if (req.headers.get("RSC") === "1" || req.nextUrl.searchParams.has("_rsc")) {
    return NextResponse.next();
  }

  const requestId = crypto.randomUUID();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-request-id", requestId);

  console.log(
    JSON.stringify({
      type: "request_start",
      requestId,
      method: req.method,
      path: pathname + search,
      timestamp: new Date().toISOString(),
    }),
  );

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
