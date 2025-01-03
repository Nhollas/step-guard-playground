"use client"

import { startJourneyAction } from "@/actions/startJourneyAction"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Form } from "@/components/ui/form"
import { useJourneyForm } from "@/hooks/use-journey-form"
import { useJourneyNavigation } from "@/hooks/use-journey-navigation"
import { useStepNavigation } from "@/hooks/use-step-navigation"
import { cn } from "@/lib/utils"
import { z } from "zod"

const introductionStepSchema = z.object({})

export default function IntroductionPage() {
  const { journey, previousStepRoute, nextStepRoute, currentStepRoute } =
    useJourneyNavigation()
  const { form } = useJourneyForm({
    journey,
    schema: introductionStepSchema,
    nextStepRoute,
    currentStepRoute,
  })
  const {
    formState: { isSubmitting: isFormSubmitting, isValid: isFormValid },
  } = form

  const { isLoading } = useStepNavigation({
    hasMadeSubmission: isFormSubmitting && isFormValid,
  })

  const onSubmit = async () => {
    await startJourneyAction(journey)
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex flex-col w-full min-h-full *:px-10 md:*:px-20 max-w-screen-sm bg-gray-100 mx-auto",
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex-grow py-10 md:py-20">
          <h1>Introduction Page</h1>
        </div>
        <BottomNavigation
          isLoading={isLoading}
          previousStepRoute={previousStepRoute}
        />
      </form>
    </Form>
  )
}
