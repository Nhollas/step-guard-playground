"use client"
import { useRedirectAlert } from "../hooks/use-redirect-alert"

export function StepGuardToast() {
  useRedirectAlert()
  return null
}
