"use server"
import {
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

export const advanceJourneyStepAction = async (
  journey: Journey,
  currentStepRoute: string,
) => {
  const cookieStore = await cookies()
  const journeyProgressCookieName = getJourneyProgressCookieName(journey)
  const currentProgress = cookieStore.get(journeyProgressCookieName)

  if (!currentProgress) {
    throw new Error("No progress token found")
  }

  const progress = await decodeProgressToken(currentProgress.value)
  const nextStepRoute = getNextJourneyRoute(currentStepRoute, journey)

  if (!nextStepRoute) {
    throw new Error("No next step found")
  }

  const updatedProgress = new Set<string>([...progress, nextStepRoute])
  const progressToken = await encodeProgressToken(Array.from(updatedProgress))

  cookieStore.set(journeyProgressCookieName, progressToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  })

  return redirect(nextStepRoute)
}
