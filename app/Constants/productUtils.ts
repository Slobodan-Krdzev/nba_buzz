import { Product } from "@/app/Types/Types";

/**
 * Gets the effective price for a product.
 * If the product is on promotion and has a salePrice, returns salePrice.
 * Otherwise, returns the regular price.
 */
export function getEffectivePrice(product: Product): number {
  if (product.isPromotion && product.salePrice !== undefined && product.salePrice !== null) {
    return product.salePrice;
  }
  return product.price;
}

