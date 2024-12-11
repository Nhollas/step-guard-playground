"use client"

import { JourneyFormStep } from "@/components/form-step"
import { STEP_FIVE } from "@/config/journey-steps"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return (
    <JourneyFormStep
      schema={schema}
      nextStepPathname={STEP_FIVE}
      render={() => <h1>Step Four</h1>}
    />
  )
}
