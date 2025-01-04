"use client"

import { startJourneyAction } from "@/actions/startJourneyAction"
import { JourneyStepForm } from "@/components/journey-step-form"
import { useJourneyNavigation } from "@/hooks/use-journey-navigation"
import { useJourneyStore } from "@/providers/journey-store-provider"
import { z } from "zod"

const introductionStepSchema = z.object({
  name: z.string().nonempty("Name is required").default("Nicholas"),
  email: z
    .string()
    .email("Invalid email address")
    .default("nicholas.hollas@yahoo.co.uk"),
})

type IntroductionStepSchema = z.infer<typeof introductionStepSchema>

export default function IntroductionPage() {
  const { journey } = useJourneyNavigation()
  const storeData = useJourneyStore((state) => state.storeData)

  const onSubmit = async (values: IntroductionStepSchema) => {
    storeData(values)
    await startJourneyAction(journey)
  }

  return (
    <JourneyStepForm
      schema={introductionStepSchema}
      onSubmitOverride={onSubmit}
      render={() => <h1>Introduction Page</h1>}
    />
  )
}
