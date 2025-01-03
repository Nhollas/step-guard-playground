"use client"

import { advanceJourneyStepAction } from "@/actions/advanceJourneyStepAction"
import { JourneyFormStep } from "@/components/journey-form-step"
import { useJourneyNavigation } from "@/hooks/use-journey-navigation"
import { usePurchaseProductsMutation } from "@/hooks/use-purchase-products-mutation"
import { useJourneyStore } from "@/providers/journey-store-provider"
import { z } from "zod"

const paymentStepSchema = z.object({})
type PaymentStepSchema = z.infer<typeof paymentStepSchema>

export default function PaymentPage() {
  const { mutateAsync: purchaseProductsAsync, isError } =
    usePurchaseProductsMutation()
  const storeData = useJourneyStore((state) => state.storeData)

  const { journey, currentStepRoute } = useJourneyNavigation()

  const onSubmit = async (values: PaymentStepSchema) => {
    storeData(values)
    await purchaseProductsAsync(values)
    await advanceJourneyStepAction(journey, currentStepRoute)
  }

  return (
    <JourneyFormStep
      schema={paymentStepSchema}
      onSubmitOverride={onSubmit}
      hasActionErrored={isError}
      render={() => (
        <div className="flex flex-col">
          <h1>Payment Page (50%) error chance</h1>
          {isError && (
            <p className="text-red-500">An error occurred, please try again</p>
          )}
        </div>
      )}
    />
  )
}
