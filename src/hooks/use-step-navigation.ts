import { useEffect, useState } from "react"

type UseStepNavigationProps = {
  hasMadeSubmission: boolean
  hasActionErrored?: boolean
}

/**
 * Custom hook to manage step navigation state within a journey
 * @param hasMadeSubmission - Whether the customer has made a submission by submitting the step they are on
 * @param hasActionErrored - Whether the action has errored (optional)
 *
 * @returns An object containing:
 * - isLoading: A boolean indicating if a transition between steps is happening.
 */
export function useStepNavigation({
  hasMadeSubmission,
  hasActionErrored,
}: UseStepNavigationProps) {
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

  return {
    isLoading,
  }
}
