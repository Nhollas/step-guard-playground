import { Form } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"
import { Schema, z } from "zod"
import { BottomNavigation } from "./bottom-navigation"
import { useJourneyStep, UseJourneyStepProps } from "@/hooks/useJourneyStep"
import { useStepTransition } from "@/hooks/useStepTransition"

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

  const isSubmitting = useStepTransition(isFormSubmitting, nextStepPathname)

  return (
    <Form {...form}>
      <form
        className={cn(
          "grid grid-cols-1 tablet:grid-cols-2 w-full gap-48 max-w-md tablet:max-w-4xl desktop:max-w-7xl mx-auto",
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {render(form)}
        <BottomNavigation isSubmitting={isSubmitting} />
      </form>
    </Form>
  )
}
