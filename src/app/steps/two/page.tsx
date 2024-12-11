"use client"

import { JourneyFormStep } from "@/components/form-step"
import { STEP_THREE } from "@/config/journey-steps"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return (
    <JourneyFormStep
      schema={schema}
      nextStepRoute={STEP_THREE}
      render={() => <h1>Step Two</h1>}
    />
  )
}
