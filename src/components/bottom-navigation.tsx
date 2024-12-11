import { Button } from "@/components/ui/button"
import Link from "next/link"

export const BottomNavigation = ({
  isSubmitting,
  previousStepPathname,
}: {
  isSubmitting: boolean
  previousStepPathname?: string
}) => {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-x-8 p-4 rounded-md bg-blue-500">
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
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Continue"}
      </Button>
    </div>
  )
}
