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
  const currentPathname = request.nextUrl.pathname

  try {
    if (!progressCookie) {
      return await redirectToStartWithFreshProgress(cookieStore, request.url)
    }

    const progress = await decodeProgressToken(progressCookie.value)

    if (!progress.includes(currentPathname)) {
      return redirectToPreviousValidStep(progress, request.url)
    }

    return NextResponse.next()
  } catch (e) {
    console.error("Error occurred in Middleware:", e)

    // Something went wrong, restart the users progress.
    return await redirectToStartWithFreshProgress(cookieStore, request.url)
  }
}

async function redirectToStartWithFreshProgress(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  baseUrl: string,
) {
  const progressToken = await encodeProgressToken([STEP_ONE])
  cookieStore.set(PROGRESS_COOKIE_NAME, progressToken)

  return NextResponse.redirect(new URL(STEP_ONE, baseUrl))
}

function redirectToPreviousValidStep(progress: string[], baseUrl: string) {
  const lastValidStep = progress.at(-1) ?? STEP_ONE

  const redirectUrl = new URL(lastValidStep, baseUrl)
  redirectUrl.searchParams.append(GUARD_REDIRECT_REASON, "true")

  return NextResponse.redirect(redirectUrl)
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
