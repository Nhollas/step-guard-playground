import { useEffect } from "react"
import { UseFormReturn } from "react-hook-form"

export function useSyncFormWithStore<
  TStoreData extends Record<string, unknown>,
>(
  form: UseFormReturn,
  storeData: (data: Partial<TStoreData>) => void,
  currentData: TStoreData,
) {
  const { watch } = form

  useEffect(() => {
    const { unsubscribe } = watch((formValues) =>
      storeData({ ...currentData, ...formValues }),
    )

    return () => unsubscribe()
  }, [storeData, currentData, watch])
}
