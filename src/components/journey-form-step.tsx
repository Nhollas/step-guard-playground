import { Form } from "@/components/ui/form"
import { useJourneyForm, UseJourneyFormProps } from "@/hooks/use-journey-form"
import { useJourneyNavigation } from "@/hooks/use-journey-navigation"
import { useStepNavigation } from "@/hooks/use-step-navigation"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"
import { Schema, z } from "zod"
import { BottomNavigation } from "./bottom-navigation"

interface JourneyFormStepProps<T extends Schema>
  extends Pick<UseJourneyFormProps<T>, "schema"> {
  render: (form: UseFormReturn<z.infer<T>>) => ReactNode
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
  schema,
}: JourneyFormStepProps<T>) {
  const { previousStepRoute, nextStepRoute, journey, currentStepRoute } =
    useJourneyNavigation()
  const { form, onSubmit } = useJourneyForm({
    journey,
    schema,
    nextStepRoute,
    currentStepRoute,
  })
  const {
    formState: { isSubmitting: isFormSubmitting, isValid: isFormValid },
  } = form

  const { isLoading } = useStepNavigation({
    hasMadeSubmission: isFormSubmitting && isFormValid,
  })

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex flex-col w-full min-h-full *:px-10 md:*:px-20 max-w-screen-sm bg-gray-100 mx-auto",
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex-grow py-10 md:py-20">{render(form)}</div>
        <BottomNavigation
          isLoading={isLoading}
          previousStepRoute={previousStepRoute}
        />
      </form>
    </Form>
  )
}
