"use client"

import { JourneyFormStep } from "@/components/journey-form-step"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return (
    <JourneyFormStep
      schema={schema}
      render={() => <h1>User Details Step</h1>}
    />
  )
}
