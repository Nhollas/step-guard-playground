"use client"

import { JourneyFormStep } from "@/components/form-step"
import { STEP_FOUR } from "@/config/journey-steps"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return (
    <JourneyFormStep
      schema={schema}
      nextStepPathname={STEP_FOUR}
      render={() => <h1>Step Three</h1>}
    />
  )
}
