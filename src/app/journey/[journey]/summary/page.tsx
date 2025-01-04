"use client"

import { JourneyStepForm } from "@/components/journey-step-form"
import { getRoutesBeforeSummary, SUMMARY_STEP } from "@/config/journey-steps"
import { useJourneyNavigation } from "@/hooks/use-journey-navigation"
import { createJourneyReturnLink } from "@/lib/create-journey-return-link"
import Link from "next/link"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  const { journey } = useJourneyNavigation()
  const routeHistoryBeforeSummary = getRoutesBeforeSummary(journey)
  return (
    <JourneyStepForm
      schema={schema}
      render={() => (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Journey Summary</h1>
          <div className="space-y-4">
            {routeHistoryBeforeSummary.map((route) => (
              <div key={route} className="rounded-lg border p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{route}</h2>
                  <Link
                    href={createJourneyReturnLink({
                      route,
                      journey,
                      returnStep: SUMMARY_STEP,
                      returnText: "Back to Summary",
                    })}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
                {/* Add content summary here */}
              </div>
            ))}
          </div>
        </div>
      )}
    />
  )
}
