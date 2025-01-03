"use server"

import {
  PurchaseProductsRequest,
  PurchaseProductsResponse,
} from "./purchaseProductsAction.types"

export async function purchaseProductsAction(
  request: PurchaseProductsRequest,
): Promise<PurchaseProductsResponse> {
  console.log("purchaseProducts request:", request)

  if (Math.random() < 0.5) {
    throw new Error("A purchase error occurred")
  }

  return {}
}
