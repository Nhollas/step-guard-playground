"use server"
import {
  getIntroductionRoute,
  getJourneyProgressCookieName,
  getNextJourneyRoute,
} from "@/config/journey-steps"
import { encodeProgressToken } from "@/lib/token-encode-decode"
import { Journey } from "@/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const startJourneyAction = async (journey: Journey) => {
  const cookieStore = await cookies()
  const introductionRoute = getIntroductionRoute(journey)
  const nextStepRoute = getNextJourneyRoute(introductionRoute, journey)!

  const progressToken = await encodeProgressToken([
    introductionRoute,
    nextStepRoute,
  ])
  const journeyProgressCookieName = getJourneyProgressCookieName(journey)
  cookieStore.set(journeyProgressCookieName, progressToken)

  return redirect(nextStepRoute)
}
