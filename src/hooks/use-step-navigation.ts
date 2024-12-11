import { JOURNEY_STEPS_ORDERED } from "@/config/journey-steps"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function useStepNavigation(
  isFormSubmitting: boolean,
  nextStepPathname?: string,
) {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    if (isFormSubmitting && nextStepPathname) {
      setIsNavigating(true)
    }
  }, [isFormSubmitting, nextStepPathname])

  useEffect(() => {
    if (isNavigating && pathname === nextStepPathname) {
      setIsNavigating(false)
    }
  }, [isNavigating, nextStepPathname, pathname])

  const currentStepIndex = JOURNEY_STEPS_ORDERED.indexOf(pathname)
  const previousStepPathname =
    currentStepIndex > 0
      ? JOURNEY_STEPS_ORDERED[currentStepIndex - 1]
      : undefined

  return {
    isSubmitting: isFormSubmitting || isNavigating,
    previousStepPathname,
  }
}
