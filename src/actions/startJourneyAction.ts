"use server"
import {
  getFirstJourneyRoute,
  getJourneyProgressCookieName,
  getNextJourneyRoute,
} from "@/config/journey-steps"
import {
  decodeProgressToken,
  encodeProgressToken,
} from "@/lib/token-encode-decode"
import { Journey } from "@/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const startJourneyAction = async (journey: Journey) => {
  const cookieStore = await cookies()
  const startingJourneyRoute = getFirstJourneyRoute(journey)
  const nextStepRoute = getNextJourneyRoute(startingJourneyRoute, journey)!
  const journeyProgressCookieName = getJourneyProgressCookieName(journey)

  const currentProgress = cookieStore.get(journeyProgressCookieName)
  const existingSteps = currentProgress
    ? await decodeProgressToken(currentProgress.value)
    : []

  /*
      The user has likely navigated back to the start of the journey so we
      check if we already have the required steps in the progress array
      to avoid having to update the cookie unnecessarily.
    */
  const hasRequiredSteps =
    existingSteps.includes(startingJourneyRoute) &&
    existingSteps.includes(nextStepRoute)

  if (!hasRequiredSteps) {
    const updatedProgress = Array.from(
      new Set([...existingSteps, startingJourneyRoute, nextStepRoute]),
    )
    const progressToken = await encodeProgressToken(updatedProgress)
    cookieStore.set(journeyProgressCookieName, progressToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    })
  }

  return redirect(nextStepRoute)
}
