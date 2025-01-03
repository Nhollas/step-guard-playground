"use server"
import {
  getFirstJourneyRoute,
  getJourneyProgressCookieName,
  getNextJourneyRoute,
} from "@/config/journey-steps"
import { encodeProgressToken } from "@/lib/token-encode-decode"
import { Journey } from "@/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const startJourneyAction = async (journey: Journey) => {
  const cookieStore = await cookies()
  const startingJourneyRoute = getFirstJourneyRoute(journey)
  const nextStepRoute = getNextJourneyRoute(startingJourneyRoute, journey)!

  const progressToken = await encodeProgressToken([
    startingJourneyRoute,
    nextStepRoute,
  ])
  const journeyProgressCookieName = getJourneyProgressCookieName(journey)
  cookieStore.set(journeyProgressCookieName, progressToken)

  return redirect(nextStepRoute)
}
