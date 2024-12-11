"use client"

import { JourneyFormStep } from "@/components/form-step"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return <JourneyFormStep schema={schema} render={() => <h1>Step Five</h1>} />
}
