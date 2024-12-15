import { isLongString } from "@/lib/utils"
import { isValid, parseISO } from "date-fns"
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

const storage = createJSONStorage(() => sessionStorage, {
  reviver: (_, value) => {
    if (isLongString(value)) {
      const parsed = parseISO(value)
      if (isValid(parsed)) {
        return parsed
      }
    }
    return value
  },
})

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
