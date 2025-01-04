"use client"
import {
  getNextJourneyRoute,
  getPreviousJourneyRoute,
} from "@/config/journey-steps"
import { extractJourneyFromPathname } from "@/lib/extract-journey-from-pathname"
import { Journey } from "@/types"
import { usePathname, useSearchParams } from "next/navigation"

interface JourneyNavigation {
  journey: Journey
  nextNavigation: NextNavigation
  previousStepRoute?: string
  currentStepRoute: string
}

interface ContinueNavigation {
  type: "continue"
  route?: string
}

interface ReturnNavigation {
  type: "return"
  route: string
  text: string
}

export type NextNavigation = ContinueNavigation | ReturnNavigation

/**
 * Custom hook for journey navigation management
 *
 * This hook provides navigation context for multi-step journeys based on the current URL.
 * It extracts the journey type and provides navigation helpers for moving between steps.
 *
 * @returns
 *  Navigation context object containing:
 * - journey: The current journey type extracted from the URL
 * - nextStepRoute: The route to the next step in the journey
 * - previousStepRoute: The route to the previous step in the journey, if any
 * - currentStepRoute: The current URL pathname
 */
export function useJourneyNavigation(): JourneyNavigation {
  const urlPathname = usePathname()
  const searchParams = useSearchParams()
  const journey = extractJourneyFromPathname(urlPathname)
  const returnTo = searchParams.get("returnTo")
  const returnText = searchParams.get("returnText")
  const nextStepRoute = getNextJourneyRoute(urlPathname, journey)
  const previousStepRoute = getPreviousJourneyRoute(urlPathname, journey)

  const nextNavigation: NextNavigation =
    returnTo && returnText
      ? {
          route: returnTo,
          type: "return",
          text: returnText,
        }
      : {
          route: nextStepRoute,
          type: "continue",
        }

  return {
    journey,
    nextNavigation,
    previousStepRoute,
    currentStepRoute: urlPathname,
  }
}
