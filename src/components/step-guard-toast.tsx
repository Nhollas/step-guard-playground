"use client"
import { useRedirectAlert } from "../hooks/useRedirectAlert"

export function StepGuardToast() {
  useRedirectAlert()
  return null
}
