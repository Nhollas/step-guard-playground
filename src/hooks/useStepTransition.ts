import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function useStepTransition(
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

  return isFormSubmitting || isNavigating
}
