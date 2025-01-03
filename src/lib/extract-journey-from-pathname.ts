import { Journey } from "@/types"

/**
 * Extracts the journey segment from the given pathname
 * @param pathname - The URL pathname to extract the journey from
 * @returns The journey segment or undefined if the format is invalid
 */
export const extractJourneyFromPathname = (pathname: string): Journey => {
  const [, , journey] = pathname.split("/")

  return journey as Journey
}
