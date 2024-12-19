import { Journey } from "@/types"
import { PROGRESS_COOKIE_NAME } from "./route-guards"

export const ASSUMPTIONS_STEP = "assumptions"
export const USER_DETAILS_STEP = "user-details"
export const HOME_DETAILS_STEP = "home-details"
export const CAR_DETAILS_STEP = "car-details"
export const QUOTE_STEP = "quote"
export const PAYMENT_STEP = "payment"
export const SUCCESS_STEP = "success"

export type JourneyStep =
  | typeof ASSUMPTIONS_STEP
  | typeof USER_DETAILS_STEP
  | typeof HOME_DETAILS_STEP
  | typeof CAR_DETAILS_STEP
  | typeof QUOTE_STEP
  | typeof PAYMENT_STEP
  | typeof SUCCESS_STEP

export const createJourneyRoute = (journey: Journey, step: JourneyStep) =>
  `/journey/${journey}/${step}`

const journeySteps: Record<Journey, JourneyStep[]> = {
  apple: [
    ASSUMPTIONS_STEP,
    USER_DETAILS_STEP,
    HOME_DETAILS_STEP,
    CAR_DETAILS_STEP,
    QUOTE_STEP,
    PAYMENT_STEP,
    SUCCESS_STEP,
  ],
  orange: [
    ASSUMPTIONS_STEP,
    CAR_DETAILS_STEP,
    QUOTE_STEP,
    PAYMENT_STEP,
    SUCCESS_STEP,
  ],
}

/**
 * Returns an ordered array of journey step routes for a given journey
 *
 * @param journey - The journey for which to get the ordered step routes
 * @returns An array of strings representing the ordered journey step routes
 *
 * @example
 * getOrderedJourneyStepRoutes("apple")
 * → [
 *     "/journey/apple/assumptions",
 *     "/journey/apple/user-details",
 *     "/journey/apple/home-details",
 *     "/journey/apple/car-details",
 *     "/journey/apple/quote",
 *     "/journey/apple/payment",
 *     "/journey/apple/success"
 *   ]
 */
export const getOrderedJourneyStepRoutes = (journey: Journey): string[] => {
  return journeySteps[journey].map((step) => createJourneyRoute(journey, step))
}

export const getFirstJourneyRoute = (journey: Journey) =>
  createJourneyRoute(journey, journeySteps[journey][0])

export const getJourneyProgressCookieName = (journey: Journey) =>
  `${journey}-${PROGRESS_COOKIE_NAME}`
