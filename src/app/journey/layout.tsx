"use client"
import { getOrderedJourneyStepRoutes } from "@/config/journey-steps"
import { useJourneyNavigation } from "@/hooks/use-journey-navigation"
import { ReactNode } from "react"

export default function JourneyLayout({ children }: { children: ReactNode }) {
  const { currentStepRoute, journey } = useJourneyNavigation()

  const allSteps = getOrderedJourneyStepRoutes(journey)
  const currentStepIndex = allSteps.indexOf(currentStepRoute)
  const progressPercentage = ((currentStepIndex + 1) / allSteps.length) * 100

  return (
    <div className="max-w-screen-sm mx-auto">
      <nav className="sticky top-0 w-full bg-blue-200 border-b border-gray-200 p-4">
        <div className="h-2 w-full bg-white rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </nav>
      {children}
    </div>
  )
}
