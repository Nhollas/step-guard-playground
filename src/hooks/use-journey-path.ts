"use client"
import { Journey } from "@/types"
import { usePathname } from "next/navigation"

/**
 * Custom hook to extract the journey path from the URL
 *
 * This hook uses the current URL pathname to extract the journey segment.
 * It assumes the journey segment is the third part of the URL path.
 * The extracted journey is then cast to the Journey type and returned.
 *
 * @returns The journey name the customer is on.
 */
export function useJourneyPath() {
  const urlPath = usePathname()

  const [, , journey] = urlPath.split("/")

  return journey as Journey
}
