import { getOrderedJourneyStepRoutes } from "@/config/journey-steps"
import { Journey } from "@/types"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type UseStepNavigationProps = {
  journey: Journey
  hasMadeSubmission: boolean
  hasActionErrored?: boolean
}

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
