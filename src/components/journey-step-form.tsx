import { Form } from "@/components/ui/form"
import { useJourneyForm, UseJourneyFormProps } from "@/hooks/use-journey-form"
import { useJourneyNavigation } from "@/hooks/use-journey-navigation"
import { useStepNavigation } from "@/hooks/use-step-navigation"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"
import { Schema, z } from "zod"
import { BottomNavigation } from "./bottom-navigation"

interface JourneyStepFormProps<T extends Schema>
  extends Pick<UseJourneyFormProps<T>, "schema"> {
  /** Function to render the form fields */
  render: (form: UseFormReturn<z.infer<T>>) => ReactNode
  /** Function to optionally override the default form submission */
  onSubmitOverride?: (values: z.infer<T>) => void
  /** Indicates if an action has errored */
  hasActionErrored?: boolean
}

export function JourneyStepForm<T extends z.Schema>({
  render,
  schema,
  onSubmitOverride,
  hasActionErrored,
}: JourneyStepFormProps<T>) {
  const { previousStepRoute, nextNavigation, journey, currentStepRoute } =
    useJourneyNavigation()
  const { form, onSubmit: defaultOnSubmit } = useJourneyForm({
    journey,
    schema,
    nextStepRoute: nextNavigation.route,
    currentStepRoute,
  })
  const {
    formState: { isSubmitting: isFormSubmitting, isValid: isFormValid },
  } = form

  const { isLoading, isError } = useStepNavigation({
    hasMadeSubmission: isFormSubmitting && isFormValid,
    hasActionErrored,
  })

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex flex-col w-full min-h-full *:px-10 md:*:px-20 max-w-screen-sm bg-gray-100 mx-auto",
        )}
        onSubmit={form.handleSubmit(onSubmitOverride ?? defaultOnSubmit)}
      >
        <div className="flex-grow py-10 md:py-20">{render(form)}</div>
        <BottomNavigation
          isLoading={isLoading}
          previousStepRoute={previousStepRoute}
          isError={isError}
          nextNavigation={nextNavigation}
        />
      </form>
    </Form>
  )
}
