import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { STEP_ONE } from "./config/journey-steps"
import {
  GUARD_REDIRECT_REASON,
  PROGRESS_COOKIE_NAME,
} from "./config/route-guards"
import {
  decodeProgressToken,
  encodeProgressToken,
} from "./lib/token-encode-decode"

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const progressCookie = cookieStore.get(PROGRESS_COOKIE_NAME)
  const step = request.nextUrl.pathname
  console.log("Middleware Triggered!:", request.nextUrl.pathname)
  console.log("You are on step:", step)

  if (!progressCookie) {
    const progressToken = await encodeProgressToken([STEP_ONE])
    cookieStore.set(PROGRESS_COOKIE_NAME, progressToken)

    return NextResponse.redirect(new URL(STEP_ONE, request.url))
  }

  const progress = await decodeProgressToken(progressCookie.value)

  console.log("Progress in middleware:", progress)

  if (!progress.includes(step)) {
    const lastAddedStep = progress.at(-1)

    const redirectUrl = new URL(lastAddedStep, request.url)
    redirectUrl.searchParams.append(GUARD_REDIRECT_REASON, "true")

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    {
      // Match any URL that starts with /steps/ followed by any number of path segments
      // Example: /steps/1, /steps/1/2, /steps/profile etc.
      source: "/steps/:path*",

      // "missing" specifies headers that must NOT be present for the middleware to run
      missing: [
        // Next.js automatically adds this header to prefetch requests
        // If this header exists, it means it's a prefetch request, so skip middleware
        { type: "header", key: "next-router-prefetch" },

        // Another standard prefetch indicator header
        // Modern browsers use this to indicate prefetch requests
        { type: "header", key: "purpose", value: "prefetch" },
      ],

      // "has" specifies headers that MUST be present for the middleware to run
      has: [
        // sec-fetch-mode is a modern browser header that indicates the type of request
        // "navigate" means this is a real user navigation (clicking a link or typing URL)
        // rather than a background request like prefetch
        { type: "header", key: "sec-fetch-mode", value: "navigate" },
      ],
    },
  ],
}
