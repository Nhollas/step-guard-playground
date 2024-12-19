"use client"
import { advanceJourneyStep } from "@/actions/advanceJourneyStep"
import {
  createJourneyRoute,
  JourneyStep,
  SUCCESS_STEP,
} from "@/config/journey-steps"
import { useJourneyStore } from "@/providers/journey-store-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useJourneyPath } from "./use-journey-path"
import { useSyncFormWithStore } from "./use-sync-form-with-store"

export interface UseJourneyStepProps<T extends z.Schema> {
  schema: T
  nextStepRouteSegment?: JourneyStep
  handlePurchaseProducts?: (values: Record<string, unknown>) => Promise<unknown>
}

/**
 * Custom hook to manage journey steps
 * @template T - The Zod schema type
 * @param props.schema - The Zod schema for this forms validation
 * @param props.nextStepRouteSegment - The next step route segment, e.g. `user-details` or `cover-details` (optional)
 * @param props.handlePurchaseProducts - Function to handle purchase products, pass this when the form is the last step (optional)
 *
 * @returns An object containing:
 * - form: The form object back from [useForm](https://www.react-hook-form.com/api/useform).
 * - onSubmit: The submit handler for the form.
 * - journey: The journey the customer is on.
 */

export function useJourneyStep<T extends z.Schema>({
  schema,
  nextStepRouteSegment,
  handlePurchaseProducts,
}: UseJourneyStepProps<T>) {
  const router = useRouter()
  const { storeData, data } = useJourneyStore((state) => state)
  const journey = useJourneyPath()

  const nextStepRoute = nextStepRouteSegment
    ? createJourneyRoute(journey, nextStepRouteSegment)
    : undefined

  useEffect(() => {
    if (nextStepRoute) {
      router.prefetch(nextStepRoute)
    }
  }, [journey, nextStepRoute, router])

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    values: {
      ...data,
    },
  })

  useSyncFormWithStore(form, storeData, data)

  const onSubmit = async () => {
    if (nextStepRoute) {
      await advanceJourneyStep(nextStepRoute, journey)

      router.push(nextStepRoute)
    }

    if (handlePurchaseProducts) {
      await handlePurchaseProducts(form.getValues())
      const successRoute = createJourneyRoute(journey, SUCCESS_STEP)

      await advanceJourneyStep(successRoute, journey)

      router.push(successRoute)
    }
  }

  return { form, onSubmit, journey }
}
