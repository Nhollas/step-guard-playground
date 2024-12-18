import { GUARD_REDIRECT_REASON } from "@/config/route-guards"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useToast } from "./use-toast"

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
