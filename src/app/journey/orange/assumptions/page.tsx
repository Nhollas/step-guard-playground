"use client"

import { JourneyFormStep } from "@/components/form-step"
import { CAR_DETAILS_STEP } from "@/config/journey-steps"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return (
    <JourneyFormStep
      schema={schema}
      nextStepRouteSegment={CAR_DETAILS_STEP}
      render={() => <h1>Assumptions Step</h1>}
    />
  )
}
