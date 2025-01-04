import { Button } from "@/components/ui/button"
import { NextNavigation } from "@/hooks/use-journey-navigation"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface BottomNavigationProps {
  isLoading: boolean
  isError?: boolean
  previousStepRoute?: string
  nextNavigation: NextNavigation
}

/**
 * BottomNavigation component to render navigation buttons
 * @param props.isLoading - Indicates if the next button should show a loading state
 * @param props.previousStepRoute - The route of the previous step, if any (optional)
 * @param props.isError - Indicates if an action has errored (optional)
 *
 * @returns A JSX element containing:
 * - A "Back" button that navigates to the previous step if available
 * - A "Continue" button that shows a loading state if `isLoading` is true
 */
export const BottomNavigation = ({
  isLoading,
  previousStepRoute,
  isError,
  nextNavigation,
}: BottomNavigationProps) => {
  const nextButtonText = isError
    ? "Action Errored"
    : isLoading
    ? "Loading..."
    : "Continue"

  return (
    <div className="grid w-full grid-cols-2 gap-x-4 bg-blue-500 py-4 sticky bottom-0">
      <Button
        variant="secondary"
        type="button"
        disabled={!previousStepRoute}
        asChild={!!previousStepRoute}
      >
        {previousStepRoute ? (
          <Link href={previousStepRoute}>Back</Link>
        ) : (
          "Back"
        )}
      </Button>
      <Button
        disabled={isLoading}
        type={nextNavigation.type === "return" ? "button" : "submit"}
        asChild={nextNavigation.type === "return"}
      >
        {nextNavigation.type === "return" && nextNavigation.route ? (
          <Link href={nextNavigation.route}>
            {nextNavigation.text} <ArrowRight />
          </Link>
        ) : (
          nextButtonText
        )}
      </Button>
    </div>
  )
}
