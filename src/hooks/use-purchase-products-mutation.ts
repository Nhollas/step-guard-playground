import { purchaseProductsAction } from "@/actions/purchaseProductsAction"
import { useMutation } from "@tanstack/react-query"

export const usePurchaseProductsMutation = (onSuccessCb?: () => void) => {
  return useMutation({
    mutationKey: ["purchase"],
    mutationFn: purchaseProductsAction,
    onSuccess: onSuccessCb,
  })
}
