import { createJourneyRoute, JourneyStep } from "@/config/journey-steps"
import { Journey } from "@/types"

interface CreateReturnLinkOptions {
  route: string
  journey: Journey
  returnStep: JourneyStep
  returnText: string
}

export function createJourneyReturnLink({
  route,
  journey,
  returnStep,
  returnText,
}: CreateReturnLinkOptions) {
  const returnTo = createJourneyRoute(journey, returnStep)
  return `${route}?returnTo=${returnTo}&returnText=${returnText}`
}
