"use client"
import { moveJourneyProgress } from "@/actions/moveJourneyProgress"
import { zodResolver } from "@hookform/resolvers/zod"
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export interface UseJourneyStepProps<T extends z.Schema> {
  schema: T
  nextStepRoute?: string
}

export function useJourneyStep<T extends z.Schema>({
  schema,
  nextStepRoute,
}: UseJourneyStepProps<T>) {
  const router = useRouter()

  useEffect(() => {
    if (nextStepRoute) {
      router.prefetch(`/steps/${nextStepRoute}`, {
        kind: PrefetchKind.FULL,
      })
    }
  }, [nextStepRoute, router])

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  })

  const onSubmit = async () => {
    if (nextStepRoute) {
      await moveJourneyProgress(nextStepRoute)

      router.push(`/steps/${nextStepRoute}`)
    }
  }

  return { form, onSubmit }
}
