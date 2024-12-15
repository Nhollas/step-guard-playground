"use client"

import { type ReactNode, createContext, useContext, useRef } from "react"
import { useStore } from "zustand"
import { createJourneyStore, JourneyStore } from "../stores/journey-store"

export type JourneyStoreApi = ReturnType<typeof createJourneyStore>

export const JourneyStoreContext = createContext<JourneyStoreApi | undefined>(
  undefined,
)

export interface JourneyStoreProviderProps {
  children: ReactNode
}

export const JourneyStoreProvider = ({
  children,
}: JourneyStoreProviderProps) => {
  const storeRef = useRef<JourneyStoreApi>(undefined)

  if (!storeRef.current) {
    storeRef.current = createJourneyStore()
  }

  return (
    <JourneyStoreContext.Provider value={storeRef.current}>
      {children}
    </JourneyStoreContext.Provider>
  )
}

export const useJourneyStore = <T,>(
  selector: (store: JourneyStore) => T,
): T => {
  const journeyStoreContext = useContext(JourneyStoreContext)

  if (!journeyStoreContext) {
    throw new Error(`useJourneyStore must be used within JourneyStoreProvider`)
  }

  return useStore(journeyStoreContext, selector)
}
