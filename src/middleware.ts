import { Journey } from "@/types"
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import {
  getFirstJourneyRoute,
  getIntroductionRoute,
  getJourneyProgressCookieName,
} from "./config/journey-steps"
import { GUARD_REDIRECT_REASON } from "./config/route-guards"
import { extractJourneyFromPathname } from "./lib/extract-journey-from-pathname"
import { decodeProgressToken } from "./lib/token-encode-decode"

/**
 * Middleware to manage journey progress and ensure users follow the correct steps
 *
 * @param request - The incoming Next.js request object
 * @returns A NextResponse object to either continue the request or redirect the user
 */
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const currentPathname = request.nextUrl.pathname
  const journey = extractJourneyFromPathname(currentPathname)
  const journeyProgressCookieName = getJourneyProgressCookieName(journey)
  const introductionRoute = getIntroductionRoute(journey)

  try {
    if (currentPathname === introductionRoute) {
      return NextResponse.next()
    }

    const progressCookie = cookieStore.get(journeyProgressCookieName)

    if (!progressCookie) {
      return NextResponse.redirect(
        new URL(introductionRoute, request.url).toString(),
      )
    }

    const progress = await decodeProgressToken(progressCookie.value)

    if (!progress.includes(currentPathname)) {
      return redirectToPreviousValidStep(progress, request.url, journey)
    }

    return NextResponse.next()
  } catch (e) {
    // Something went wrong, restart the users progress.
    console.error("Error occurred in Middleware:", e)
    cookieStore.delete(journeyProgressCookieName)

    return NextResponse.error()
  }
}

function redirectToPreviousValidStep(
  progress: string[],
  baseUrl: string,
  journey: Journey,
) {
  const lastValidStep = progress.at(-1) ?? getFirstJourneyRoute(journey)

  const redirectUrl = new URL(lastValidStep, baseUrl)
  redirectUrl.searchParams.append(GUARD_REDIRECT_REASON, "true")

  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: [
    {
      // Match any URL that starts with /journey/ followed by any number of path segments
      // Example: /journey/1, /journey/1/2, /journey/profile etc.
      source: "/journey/:path*",

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
