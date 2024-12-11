"use client"
import { zodResolver } from "@hookform/resolvers/zod"
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
      router.prefetch(`/steps/${nextStepRoute}`)
    }
  }, [nextStepRoute, router])

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  })

  const onSubmit = async () => {
    if (nextStepRoute) {
      router.push(`/steps/${nextStepRoute}`)
    }
  }

  return { form, onSubmit }
}
