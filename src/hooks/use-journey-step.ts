"use client"
import { advanceJourneyStep } from "@/actions/advanceJourneyStep"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSyncFormWithStore } from "./use-sync-form-with-store"
import { useJourneyStore } from "@/providers/journey-store-provider"

export interface UseJourneyStepProps<T extends z.Schema> {
  schema: T
  nextStepPathname?: string
}

export function useJourneyStep<T extends z.Schema>({
  schema,
  nextStepPathname,
}: UseJourneyStepProps<T>) {
  const router = useRouter()
  const { storeData, data } = useJourneyStore((state) => state)

  useEffect(() => {
    if (nextStepPathname) {
      router.prefetch(nextStepPathname)
    }
  }, [nextStepPathname, router])

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    values: {
      ...data,
    },
  })

  useSyncFormWithStore(form, storeData, data)

  const onSubmit = async () => {
    if (nextStepPathname) {
      await advanceJourneyStep(nextStepPathname)

      router.push(nextStepPathname)
    }
  }

  return { form, onSubmit }
}
