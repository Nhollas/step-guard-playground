import { act, renderHook } from "@testing-library/react"
import { useStepNavigation } from "./use-step-navigation"

describe("useStepNavigation", () => {
  it("should return initial state correctly", () => {
    const { result } = renderHook(() =>
      useStepNavigation({ hasMadeSubmission: false }),
    )

    expect(result.current.isLoading).toBe(false)
  })

  it("should set isLoading to true when hasMadeSubmission is true", () => {
    const { result, rerender } = renderHook(
      ({ hasMadeSubmission }) => useStepNavigation({ hasMadeSubmission }),
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
        useStepNavigation({ hasMadeSubmission, hasActionErrored }),
      {
        initialProps: { hasMadeSubmission: true, hasActionErrored: false },
      },
    )

    act(() => {
      rerender({ hasActionErrored: true, hasMadeSubmission: true })
    })

    expect(result.current.isLoading).toBe(false)
  })
})
