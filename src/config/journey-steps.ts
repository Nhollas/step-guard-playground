import { Journey } from "@/types"
import { PROGRESS_COOKIE_NAME } from "./route-guards"

export const ASSUMPTIONS_STEP = "assumptions"
export const USER_DETAILS_STEP = "user-details"
export const HOME_DETAILS_STEP = "home-details"
export const CAR_DETAILS_STEP = "car-details"
export const QUOTE_STEP = "quote"
export const PAYMENT_STEP = "payment"
export const SUCCESS_STEP = "success"
export const INTRODUCTION_STEP = "introduction"

export type JourneyStep =
  | typeof ASSUMPTIONS_STEP
  | typeof USER_DETAILS_STEP
  | typeof HOME_DETAILS_STEP
  | typeof CAR_DETAILS_STEP
  | typeof QUOTE_STEP
  | typeof PAYMENT_STEP
  | typeof SUCCESS_STEP
  | typeof INTRODUCTION_STEP

const journeySteps: Record<Journey, JourneyStep[]> = {
  apple: [
    INTRODUCTION_STEP,
    ASSUMPTIONS_STEP,
    USER_DETAILS_STEP,
    HOME_DETAILS_STEP,
    CAR_DETAILS_STEP,
    QUOTE_STEP,
    PAYMENT_STEP,
    SUCCESS_STEP,
  ],
  orange: [
    INTRODUCTION_STEP,
    ASSUMPTIONS_STEP,
    CAR_DETAILS_STEP,
    QUOTE_STEP,
    PAYMENT_STEP,
    SUCCESS_STEP,
  ],
}

const findRouteIndex = (routes: string[], currentPathname: string): number =>
  routes.findIndex((route) => route === currentPathname)

const createJourneyRoute = (journey: Journey, step: JourneyStep) =>
  `/journey/${journey}/${step}`

const getRelativeJourneyRoute = (
  currentPathname: string,
  journey: Journey,
  offset: number,
): string | undefined => {
  const orderedRoutes = getOrderedJourneyStepRoutes(journey)
  const currentIndex = findRouteIndex(orderedRoutes, currentPathname)

  const targetIndex = currentIndex + offset
  const isValidIndex = targetIndex >= 0 && targetIndex < orderedRoutes.length

  return isValidIndex ? orderedRoutes[targetIndex] : undefined
}

export const getNextJourneyRoute = (
  currentPathname: string,
  journey: Journey,
) => getRelativeJourneyRoute(currentPathname, journey, 1)

export const getPreviousJourneyRoute = (
  currentPathname: string,
  journey: Journey,
) => getRelativeJourneyRoute(currentPathname, journey, -1)

export const getOrderedJourneyStepRoutes = (journey: Journey): string[] =>
  journeySteps[journey].map((step) => createJourneyRoute(journey, step))

export const getFirstJourneyRoute = (journey: Journey) =>
  createJourneyRoute(journey, journeySteps[journey][0])

export const getJourneyProgressCookieName = (journey: Journey) =>
  `${journey}-${PROGRESS_COOKIE_NAME}`
