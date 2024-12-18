import { purchaseProducts } from "@/actions/purchaseProducts"
import { useMutation } from "@tanstack/react-query"

export const usePurchaseProductsMutation = (onSuccessCb?: () => void) => {
  return useMutation({
    mutationKey: ["purchase"],
    mutationFn: purchaseProducts,
    onSuccess: onSuccessCb,
  })
}
