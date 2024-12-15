import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type JourneyState = {
  data: Record<string, unknown>
  _hasHydrated: boolean
}

export type JourneyActions = {
  storeData: (data: Record<string, unknown>) => void
  setHasHydrated: (state: boolean) => void
}

export type JourneyStore = JourneyState & JourneyActions

const storage = createJSONStorage(() => sessionStorage)

export const createJourneyStore = () =>
  create<JourneyStore>()(
    persist(
      (set) => ({
        data: {},
        _hasHydrated: false,
        storeData: (updates) =>
          set((state) => ({
            data: {
              ...state.data,
              ...updates,
            },
          })),
        setHasHydrated: (state) => set({ _hasHydrated: state }),
      }),
      {
        name: "journeys-store",
        storage,
        onRehydrateStorage: (state) => {
          return () => state.setHasHydrated(true)
        },
      },
    ),
  )