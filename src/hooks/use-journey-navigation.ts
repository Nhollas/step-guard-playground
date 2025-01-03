"use client"
import {
  getNextJourneyRoute,
  getPreviousJourneyRoute,
} from "@/config/journey-steps"
import { extractJourneyFromPathname } from "@/lib/extract-journey-from-pathname"
import { Journey } from "@/types"
import { usePathname } from "next/navigation"

interface JourneyNavigation {
  journey: Journey
  nextStepRoute?: string
  previousStepRoute?: string
  currentStepRoute: string
}

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
  const journey = extractJourneyFromPathname(urlPathname)
  const nextStepRoute = getNextJourneyRoute(urlPathname, journey)
  const previousStepRoute = getPreviousJourneyRoute(urlPathname, journey)

  return {
    journey,
    nextStepRoute,
    previousStepRoute,
    currentStepRoute: urlPathname,
  }
}
