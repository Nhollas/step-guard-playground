import { getOrderedJourneyStepRoutes } from "@/config/journey-steps"
import { Journey } from "@/types"
import { act, renderHook } from "@testing-library/react"
import { usePathname } from "next/navigation"
import { MockedFunction, vi } from "vitest"
import { useStepNavigation } from "./use-step-navigation"

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}))

vi.mock("@/config/journey-steps", async () => {
  const actualModule = await vi.importActual("@/config/journey-steps")
  return {
    ...actualModule,
    getOrderedJourneyStepRoutes: vi.fn(),
  }
})

const mockedUsePathnameFn = usePathname as MockedFunction<typeof usePathname>
const mockedGetOrderedJourneyStepRoutes =
  getOrderedJourneyStepRoutes as MockedFunction<
    typeof getOrderedJourneyStepRoutes
  >

describe("useStepNavigation", () => {
  const journey: Journey = "apple"

  beforeEach(() => {
    mockedGetOrderedJourneyStepRoutes.mockReturnValue([
      "/journey/apple/assumptions",
      "/journey/apple/user-details",
      "/journey/apple/home-details",
      "/journey/apple/car-details",
      "/journey/apple/quote",
      "/journey/apple/payment",
    ])
  })

  it("should return initial state correctly", () => {
    const { result } = renderHook(() =>
      useStepNavigation({ journey, hasMadeSubmission: false }),
    )

    expect(result.current.isLoading).toBe(false)
    expect(result.current.previousStepRoute).toBeUndefined()
    expect(result.current.hasNextStep).toBe(true)
  })

  it("should set isLoading to true when hasMadeSubmission is true", () => {
    const { result, rerender } = renderHook(
      ({ hasMadeSubmission }) =>
        useStepNavigation({ journey, hasMadeSubmission }),
      {
        initialProps: { hasMadeSubmission: false },
      },
    )

    act(() => {
      rerender({ hasMadeSubmission: true })
    })

    expect(result.current.isLoading).toBe(true)
  })

  it("should set isLoading to false when hasActionErrored is true", () => {
    const { result, rerender } = renderHook(
      ({ hasMadeSubmission, hasActionErrored }) =>
        useStepNavigation({ journey, hasMadeSubmission, hasActionErrored }),
      {
        initialProps: { hasMadeSubmission: true, hasActionErrored: false },
      },
    )

    act(() => {
      rerender({ hasActionErrored: true, hasMadeSubmission: true })
    })

    expect(result.current.isLoading).toBe(false)
  })

  it("should return correct previousStepRoute and hasNextStep", () => {
    mockedUsePathnameFn.mockReturnValue("/journey/apple/user-details")

    const { result } = renderHook(() =>
      useStepNavigation({ journey, hasMadeSubmission: false }),
    )

    expect(result.current.previousStepRoute).toBe("/journey/apple/assumptions")
    expect(result.current.hasNextStep).toBe(true)
  })

  it("should return undefined for previousStepRoute if on first step", () => {
    mockedUsePathnameFn.mockReturnValue("/journey/apple/assumptions")

    const { result } = renderHook(() =>
      useStepNavigation({ journey, hasMadeSubmission: false }),
    )

    expect(result.current.previousStepRoute).toBeUndefined()
    expect(result.current.hasNextStep).toBe(true)
  })

  it("should return false for hasNextStep if on last step", () => {
    mockedUsePathnameFn.mockReturnValue("/journey/apple/payment")

    const { result } = renderHook(() =>
      useStepNavigation({ journey, hasMadeSubmission: false }),
    )

    expect(result.current.previousStepRoute).toBe("/journey/apple/quote")
    expect(result.current.hasNextStep).toBe(false)
  })
})
