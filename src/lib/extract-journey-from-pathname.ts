import { Journey } from "@/types"

export const extractJourneyFromPathname = (pathname: string): Journey => {
  const journeyPathnameRegex = /^\/journey\/([^\/]+)\/[^\/]+$/
  const match = pathname.match(journeyPathnameRegex)
  if (!match) {
    throw new Error("Invalid pathname format")
  }
  return match[1] as Journey
}
