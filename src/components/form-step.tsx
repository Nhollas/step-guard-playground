import { Form } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"
import { Schema, z } from "zod"
import { BottomNavigation } from "./bottom-navigation"
import { useJourneyStep, UseJourneyStepProps } from "@/hooks/use-journey-step"
import { useStepNavigation } from "@/hooks/use-step-navigation"

export interface JourneyFormStepProps<T extends Schema>
  extends UseJourneyStepProps<T> {
  render: (form: UseFormReturn<z.infer<T>>) => ReactNode
}

export function JourneyFormStep<T extends z.Schema>({
  render,
  ...props
}: JourneyFormStepProps<T>) {
  const { form, onSubmit } = useJourneyStep({ ...props })
  const {
    formState: { isSubmitting: isFormSubmitting },
  } = form
  const { nextStepPathname } = props

  const { isSubmitting, previousStepPathname } = useStepNavigation(
    isFormSubmitting,
    nextStepPathname,
  )

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-16 w-full max-w-md mx-auto")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {render(form)}
        <BottomNavigation
          isSubmitting={isSubmitting}
          previousStepPathname={previousStepPathname}
        />
      </form>
    </Form>
  )
}
