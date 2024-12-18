import { Journey } from "@/types"
import { PROGRESS_COOKIE_NAME } from "./route-guards"

export const ASSUMPTIONS_STEP = "assumptions"
export const USER_DETAILS_STEP = "user-details"
export const HOME_DETAILS_STEP = "home-details"
export const CAR_DETAILS_STEP = "car-details"
export const QUOTE_STEP = "quote"
export const PAYMENT_STEP = "payment"
export const SUCCESS_STEP = "success"

export const createJourneyRoute = (journey: Journey, step: string) =>
  `/journey/${journey}/${step}`

export const journeys: Record<Journey, string[]> = {
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

export const getOrderedJourneyStepRoutes = (journey: Journey): string[] => {
  return journeys[journey].map((step) => createJourneyRoute(journey, step))
}

export const getFirstJourneyRoute = (journey: Journey) =>
  createJourneyRoute(journey, journeys[journey][0])

export const getJourneyProgressCookieName = (journey: Journey) =>
  `${journey}-${PROGRESS_COOKIE_NAME}`
