"use client"

import { JourneyFormStep } from "@/components/form-step"
import { PAYMENT_STEP } from "@/config/journey-steps"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return (
    <JourneyFormStep
      schema={schema}
      nextStepRouteSegment={PAYMENT_STEP}
      render={() => <h1>Quote Step</h1>}
    />
  )
}
