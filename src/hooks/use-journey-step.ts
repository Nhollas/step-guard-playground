"use client"
import { advanceJourneyStep } from "@/actions/advanceJourneyStep"
import { createJourneyRoute, SUCCESS_STEP } from "@/config/journey-steps"
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
  nextStepRouteSegment?: string
  handlePurchaseProducts?: (values: Record<string, unknown>) => Promise<unknown>
}

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
    // Simulate a delay for the user to see the loading state
    await new Promise((resolve) => setTimeout(resolve, 750))

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
