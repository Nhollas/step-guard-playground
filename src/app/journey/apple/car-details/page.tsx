"use client"

import { JourneyFormStep } from "@/components/form-step"
import { QUOTE_STEP } from "@/config/journey-steps"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return (
    <JourneyFormStep
      schema={schema}
      nextStepRouteSegment={QUOTE_STEP}
      render={() => <h1>Car Details Step</h1>}
    />
  )
}
