"use client"

import { advanceJourneyStepAction } from "@/actions/advanceJourneyStepAction"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Form } from "@/components/ui/form"
import { useJourneyForm } from "@/hooks/use-journey-form"
import { useJourneyNavigation } from "@/hooks/use-journey-navigation"
import { usePurchaseProductsMutation } from "@/hooks/use-purchase-products-mutation"
import { useStepNavigation } from "@/hooks/use-step-navigation"
import { cn } from "@/lib/utils"
import { z } from "zod"

const paymentStepSchema = z.object({})
type PaymentStepSchema = z.infer<typeof paymentStepSchema>

export default function PaymentPage() {
  const { mutateAsync: purchaseProductsAsync, isError } =
    usePurchaseProductsMutation()

  const { journey, previousStepRoute, nextStepRoute, currentStepRoute } =
    useJourneyNavigation()
  const { form } = useJourneyForm({
    journey,
    schema: paymentStepSchema,
    nextStepRoute,
    currentStepRoute,
  })
  const {
    formState: { isSubmitting: isFormSubmitting, isValid: isFormValid },
  } = form

  const { isLoading } = useStepNavigation({
    hasMadeSubmission: isFormSubmitting && isFormValid,
    hasActionErrored: isError,
  })

  const onSubmit = async (values: PaymentStepSchema) => {
    await purchaseProductsAsync(values)
    await advanceJourneyStepAction(journey, currentStepRoute)
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
          <h1>Payment Page (50%) error chance</h1>
          {isError && (
            <p className="text-red-500">An error occurred, please try again</p>
          )}
        </div>
        <BottomNavigation
          isLoading={isLoading}
          previousStepRoute={previousStepRoute}
        />
      </form>
    </Form>
  )
}
