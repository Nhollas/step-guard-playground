import { Form } from "@/components/ui/form"
import { useJourneyStep, UseJourneyStepProps } from "@/hooks/use-journey-step"
import { useStepNavigation } from "@/hooks/use-step-navigation"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"
import { Schema, z } from "zod"
import { BottomNavigation } from "./bottom-navigation"

export interface JourneyFormStepProps<T extends Schema>
  extends UseJourneyStepProps<T> {
  render: (form: UseFormReturn<z.infer<T>>) => ReactNode
  hasActionErrored?: boolean
}

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
        className={cn("grid gap-16 w-full max-w-md mx-auto")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {render(form)}
        <BottomNavigation
          isLoading={isLoading}
          previousStepRoute={previousStepRoute}
        />
      </form>
    </Form>
  )
}
