"use client"

import { JourneyStepForm } from "@/components/journey-step-form"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return (
    <JourneyStepForm schema={schema} render={() => <h1>Car Details Step</h1>} />
  )
}
