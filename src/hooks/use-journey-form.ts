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
  /** The Zod schema for form validation */
  schema: T
  /** The journey the user is on. */
  journey: Journey
  /** The route to the next step if available */
  nextStepRoute?: string
  /** The route the user is currently on */
  currentStepRoute: string
}

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
    storeData(values)
    await advanceJourneyStepAction(journey, currentStepRoute)
  }

  return { form, onSubmit }
}
