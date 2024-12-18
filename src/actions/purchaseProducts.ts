"use server"

import {
  PurchaseProductsRequest,
  PurchaseProductsResponse,
} from "./purchaseProducts.types"

export async function purchaseProducts(
  request: PurchaseProductsRequest,
): Promise<PurchaseProductsResponse> {
  console.log("purchaseProducts request:", request)

  if (Math.random() < 0.5) {
    throw new Error("A purchase error occurred")
  }

  return {}
}
