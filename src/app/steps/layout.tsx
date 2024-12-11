"use client"
import { useRedirectAlert } from "@/hooks/useRedirectAlert"
import { ReactNode } from "react"

export default function StepsLayout({ children }: { children: ReactNode }) {
  useRedirectAlert()

  return children
}
