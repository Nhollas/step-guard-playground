"use client"

import { JourneyFormStep } from "@/components/form-step"
import { usePurchaseProductsMutation } from "@/hooks/usePurchaseProductsMutation"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  const { mutateAsync: purchaseProductsAsync, isError } =
    usePurchaseProductsMutation()
  return (
    <JourneyFormStep
      schema={schema}
      hasActionErrored={isError}
      handlePurchaseProducts={purchaseProductsAsync}
      render={() => (
        <div>
          <h1>Payment Step</h1>
          {isError && <div>There was an error</div>}
        </div>
      )}
    />
  )
}
