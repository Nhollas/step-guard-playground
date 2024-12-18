"use server"
import {
  decodeProgressToken,
  encodeProgressToken,
} from "@/lib/token-encode-decode"
import { cookies } from "next/headers"
import { Journey } from "@/types"
import { getJourneyProgressCookieName } from "@/config/journey-steps"

export const advanceJourneyStep = async (
  nextStepRoute: string,
  journey: Journey,
) => {
  const cookieStore = await cookies()
  const journeyProgressCookieName = getJourneyProgressCookieName(journey)
  const currentProgress = cookieStore.get(journeyProgressCookieName)

  if (!currentProgress) {
    throw new Error("No progress token found")
  }

  const progress = await decodeProgressToken(currentProgress.value)
  const updatedProgress = new Set<string>(progress)
  updatedProgress.add(nextStepRoute)

  const progressToken = await encodeProgressToken(Array.from(updatedProgress))

  cookieStore.set(journeyProgressCookieName, progressToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  })
}
