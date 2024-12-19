import { Journey } from "@/types"

/**
 * Extracts the journey segment from the given pathname
 * @param pathname - The URL pathname to extract the journey from
 * @returns The journey segment or undefined if the format is invalid
 */
export const extractJourneyFromPathname = (
  pathname: string,
): Journey | undefined => {
  const journeyPathnameRegex = /^\/journey\/([^\/]+)\/[^\/]+$/
  const match = pathname.match(journeyPathnameRegex)
  if (!match) {
    return undefined
  }
  return match[1] as Journey
}
