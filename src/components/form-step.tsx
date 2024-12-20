import { Form } from "@/components/ui/form"
import { useJourneyStep, UseJourneyStepProps } from "@/hooks/use-journey-step"
import { useStepNavigation } from "@/hooks/use-step-navigation"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"
import { Schema, z } from "zod"
import { BottomNavigation } from "./bottom-navigation"

interface JourneyFormStepProps<T extends Schema>
  extends UseJourneyStepProps<T> {
  render: (form: UseFormReturn<z.infer<T>>) => ReactNode
  hasActionErrored?: boolean
}

/**
 * JourneyFormStep component to render a form step within a journey
 * @template T - The Zod schema type
 * @param props.render - Function to render the form fields
 * @param props.hasActionErrored - Indicates if an action has errored (optional)
 * @param props.schema - The Zod schema for form validation
 * @param props.nextStepRouteSegment - The next step route segment, e.g. `user-details` or `cover-details` (optional)
 * @param props.handlePurchaseProducts - Function to handle purchase products, pass this when the form is the last step (optional)
 *
 * @returns A JSX element containing:
 * - The form fields rendered by the `render` function
 * - The bottom navigation buttons
 */
export function JourneyFormStep<T extends z.Schema>({
  render,
  hasActionErrored,
  ...props
}: JourneyFormStepProps<T>) {
  const { form, onSubmit, journey } = useJourneyStep({ ...props })
  const {
    formState: { isSubmitting: isFormSubmitting, isValid: isFormValid },
  } = form

  const { isLoading, previousStepRoute } = useStepNavigation({
    journey,
    hasMadeSubmission: isFormSubmitting && isFormValid,
    hasActionErrored,
  })

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex flex-col w-full min-h-full *:px-4 md:*:px-8 max-w-screen-sm ring-2 ring-black/25 mx-auto sm:rounded-t-xl",
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex-grow pb-12 md:pb-20 pt-8 md:pt-16">
          {render(form)}
        </div>
        <BottomNavigation
          isLoading={isLoading}
          previousStepRoute={previousStepRoute}
        />
      </form>
    </Form>
  )
}
