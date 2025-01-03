"use client"
import { advanceJourneyStepAction } from "@/actions/advanceJourneyStepAction"
import { useJourneyStore } from "@/providers/journey-store-provider"
import { Journey } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSyncFormWithStore } from "./use-sync-form-with-store"

export interface UseJourneyFormProps<T extends z.Schema> {
  schema: T
  journey: Journey
  nextStepRoute?: string
  currentStepRoute: string
}

/**
 * Custom hook to manage journey form state and submission
 * @template T - The Zod schema type
 * @param props.schema - The Zod schema for form validation
 * @param props.journey - The journey object containing step information
 * @param props.nextStepRoute - The full route to the next step (optional)
 * @param props.currentStepRoute - The full route to the current step
 *
 * @returns An object containing:
 * - form: The form object from react-hook-form
 * - onSubmit: The submit handler for advancing to the next step
 */
export function useJourneyForm<T extends z.Schema>({
  schema,
  journey,
  nextStepRoute,
  currentStepRoute,
}: UseJourneyFormProps<T>) {
  const router = useRouter()
  const { storeData, data } = useJourneyStore((state) => state)

  useEffect(() => {
    if (nextStepRoute) {
      router.prefetch(nextStepRoute)
    }
  }, [nextStepRoute, router])

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    values: {
      ...data,
    },
  })

  useSyncFormWithStore(form, storeData)

  const onSubmit = async (values: z.infer<T>) => {
    console.log("values:", values)
    await advanceJourneyStepAction(journey, currentStepRoute)
  }

  return { form, onSubmit }
}
