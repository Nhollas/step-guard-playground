"use client"
import { Journey } from "@/types"
import { usePathname } from "next/navigation"

export function useJourneyPath() {
  const urlPath = usePathname()

  const [, , journey] = urlPath.split("/")

  return journey as Journey
}
