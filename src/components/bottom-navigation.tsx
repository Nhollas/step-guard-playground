import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BottomNavigationProps {
  isSubmitting: boolean
  previousStepPathname?: string
  nextStepPathname?: string
}

export const BottomNavigation = ({
  isSubmitting,
  previousStepPathname,
  nextStepPathname,
}: BottomNavigationProps) => {
  const nextButtonText = nextStepPathname
    ? isSubmitting
      ? "Loading..."
      : "Continue"
    : "Finished"

  return (
    <div className="grid w-full grid-cols-2 gap-x-8 p-4 rounded-md bg-blue-500">
      <Button
        variant="secondary"
        type="button"
        disabled={!previousStepPathname}
        asChild={!!previousStepPathname}
      >
        {previousStepPathname ? (
          <Link href={previousStepPathname}>Back</Link>
        ) : (
          "Back"
        )}
      </Button>
      <Button disabled={isSubmitting || !nextStepPathname} type="submit">
        {nextButtonText}
      </Button>
    </div>
  )
}
