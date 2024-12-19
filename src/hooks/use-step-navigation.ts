import { getOrderedJourneyStepRoutes } from "@/config/journey-steps"
import { Journey } from "@/types"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type UseStepNavigationProps = {
  journey: Journey
  hasMadeSubmission: boolean
  hasActionErrored?: boolean
}

/**
 * Custom hook to manage step navigation state within a journey
 * @param journey - The journey the customer is on
 * @param hasMadeSubmission - Whether the customer has made a submission by submitting the step they are on
 * @param hasActionErrored - Whether the action has errored (optional)
 *
 * @returns An object containing:
 * - isLoading: A boolean indicating if a transition between steps is happening.
 * - previousStepRoute: The route of the previous step, or undefined if on the first step.
 * - hasNextStep: A boolean indicating if there is a next step available in the journey.
 */
export function useStepNavigation({
  journey,
  hasMadeSubmission,
  hasActionErrored,
}: UseStepNavigationProps) {
  const urlPathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (hasMadeSubmission) {
      setIsLoading(true)
    }
  }, [hasMadeSubmission])

  useEffect(() => {
    if (hasActionErrored) {
      setIsLoading(false)
    }
  }, [hasActionErrored])

  const orderedJourneyStepRoutes = getOrderedJourneyStepRoutes(journey)
  const currentStepIndex = orderedJourneyStepRoutes.indexOf(urlPathname)
  const previousStepRoute =
    currentStepIndex > 0
      ? orderedJourneyStepRoutes[currentStepIndex - 1]
      : undefined

  const hasNextStep = currentStepIndex < orderedJourneyStepRoutes.length - 1

  return {
    isLoading,
    previousStepRoute,
    hasNextStep,
  }
}
