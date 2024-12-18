"use client"

import { JourneyFormStep } from "@/components/form-step"
import { HOME_DETAILS_STEP } from "@/config/journey-steps"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return (
    <JourneyFormStep
      schema={schema}
      nextStepRouteSegment={HOME_DETAILS_STEP}
      render={() => <h1>User Details Step</h1>}
    />
  )
}
