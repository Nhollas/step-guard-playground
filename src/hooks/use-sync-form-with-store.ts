import { useEffect } from "react"
import { UseFormReturn } from "react-hook-form"

export function useSyncFormWithStore(
  form: UseFormReturn,
  storeData: (data: Record<string, unknown>) => void,
) {
  const { watch } = form

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      console.log("formValues:", formValues)
      storeData(formValues)
    })

    return () => unsubscribe()
  }, [storeData, watch])
}
