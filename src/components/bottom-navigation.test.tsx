import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { BottomNavigation } from "./bottom-navigation"

describe("BottomNavigation", () => {
  describe("Back button", () => {
    it("renders as a link when previousStepPathname is provided", () => {
      render(
        <BottomNavigation
          isLoading={false}
          previousStepRoute="/previous-step"
        />,
      )

      const backLink = screen.getByRole("link", { name: /back/i })

      expect(backLink).toBeInTheDocument()
      expect(backLink).toHaveAttribute("href", "/previous-step")
    })

    it("renders as disabled button when no previousStepPathname is provided", () => {
      render(<BottomNavigation isLoading={false} />)

      const backButton = screen.getByRole("button", { name: /back/i })

      expect(backButton).toBeInTheDocument()
      expect(backButton).toBeDisabled()
    })
  })

  describe("Next button states", () => {
    it('shows "Continue" when isLoading is false', () => {
      render(<BottomNavigation isLoading={false} />)

      const continueButton = screen.getByRole("button", { name: /continue/i })

      expect(continueButton).toBeInTheDocument()
      expect(continueButton).not.toBeDisabled()
    })

    it('shows "Loading..." when submitting', () => {
      render(<BottomNavigation isLoading={true} />)

      const loadingButton = screen.getByRole("button", { name: /loading/i })

      expect(loadingButton).toBeInTheDocument()
      expect(loadingButton).toBeDisabled()
    })
  })
})
