import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BottomNavigationProps {
  isLoading: boolean
  previousStepRoute?: string
  hasActionErrored?: boolean
}

export const BottomNavigation = ({
  isLoading,
  previousStepRoute,
}: BottomNavigationProps) => {
  const nextButtonText = isLoading ? "Loading..." : "Continue"

  return (
    <div className="grid w-full grid-cols-2 gap-x-8 p-4 rounded-md bg-blue-500">
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
      <Button disabled={isLoading} type="submit">
        {nextButtonText}
      </Button>
    </div>
  )
}
