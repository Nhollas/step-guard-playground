"use server"
import {
  decodeProgressToken,
  encodeProgressToken,
} from "@/lib/token-encode-decode"
import { cookies } from "next/headers"
import { PROGRESS_COOKIE_NAME } from "@/config/route-guards"

export const advanceJourneyStep = async (nextStep: string) => {
  const cookieStore = await cookies()
  const currentProgress = cookieStore.get(PROGRESS_COOKIE_NAME)

  if (!currentProgress) {
    throw new Error("Bad!")
  }

  const progress = await decodeProgressToken(currentProgress.value)
  const updatedProgress = new Set<string>(progress)
  updatedProgress.add(nextStep)

  const progressToken = await encodeProgressToken(Array.from(updatedProgress))

  cookieStore.set(PROGRESS_COOKIE_NAME, progressToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  })
}
