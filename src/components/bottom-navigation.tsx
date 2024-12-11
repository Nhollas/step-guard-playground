import { Button } from "@/components/ui/button"

export const BottomNavigation = ({
  isSubmitting,
}: {
  isSubmitting: boolean
}) => {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-x-20 tablet:col-span-2">
      <Button type="submit">{isSubmitting ? "Loading..." : "Continue"}</Button>
    </div>
  )
}
