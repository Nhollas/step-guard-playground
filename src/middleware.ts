import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { STEP_ONE } from "./config/journey-steps"
import { PROGRESS_COOKIE_NAME } from "./config/route-guards"
import {
  decodeProgressToken,
  encodeProgressToken,
} from "./lib/token-encode-decode"

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const progressCookie = cookieStore.get(PROGRESS_COOKIE_NAME)
  const [, , step] = request.nextUrl.pathname.split("/")
  console.log("Middleware Triggered!:", request.nextUrl.pathname)
  console.log("You are on step:", step)

  if (!progressCookie) {
    const progressToken = await encodeProgressToken([STEP_ONE])
    cookieStore.set(PROGRESS_COOKIE_NAME, progressToken)

    return NextResponse.redirect(new URL(`/steps/${STEP_ONE}`, request.url))
  }

  const progress = await decodeProgressToken(progressCookie.value)

  console.log("Progress in middleware:", progress)

  if (!progress.includes(step)) {
    const lastAddedStep = progress.at(-1)

    const redirectUrl = new URL(`/steps/${lastAddedStep}`, request.url)
    redirectUrl.searchParams.append("GUARD_ENFORCED", "true")

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/steps/:path*",
}
