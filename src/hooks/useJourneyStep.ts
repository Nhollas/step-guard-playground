"use client"
import { moveJourneyProgress } from "@/actions/moveJourneyProgress"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export interface UseJourneyStepProps<T extends z.Schema> {
  schema: T
  nextStepPathname?: string
}

export function useJourneyStep<T extends z.Schema>({
  schema,
  nextStepPathname,
}: UseJourneyStepProps<T>) {
  const router = useRouter()

  useEffect(() => {
    if (nextStepPathname) {
      router.prefetch(nextStepPathname)
    }
  }, [nextStepPathname, router])

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  })

  const onSubmit = async () => {
    if (nextStepPathname) {
      await moveJourneyProgress(nextStepPathname)

      router.push(nextStepPathname)
    }
  }

  return { form, onSubmit }
}
