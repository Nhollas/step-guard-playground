import { GUARD_REDIRECT_REASON } from "@/config/route-guards"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useToast } from "./use-toast"

/**
 * Custom hook to display a toast alert when a user is redirected for skipping steps
 *
 * This hook checks the URL search parameters for a specific redirect reason.
 * If the reason is found, it displays a toast notification to the user
 * informing them not to skip steps. It then removes the redirect reason
 * from the URL to prevent the alert from showing again on subsequent renders.
 */
export function useRedirectAlert() {
  const urlPathname = usePathname()
  const params = useSearchParams()
  const redirectParam = params.get(GUARD_REDIRECT_REASON)
  const { toast } = useToast()

  useEffect(() => {
    if (!redirectParam) {
      return
    }

    toast({
      variant: "destructive",
      title: "Hey! Don't skip steps please",
      description: "Please finish this step's questions before continuing.",
    })

    window.history.replaceState({}, "", urlPathname)
  }, [urlPathname, redirectParam, toast])
}
