import { Product } from '../types/products';
import { SaleProduct } from '../types/sales';

export function hasEnoughStock(product: Product, quantity: number): boolean {
  return product.quantity >= quantity;
}

export function calculateNewStock(currentStock: number, quantity: number, isAddition: boolean): number {
  return isAddition ? currentStock + quantity : Math.max(0, currentStock - quantity);
}

export function validateStockAvailability(products: Product[], saleProducts: SaleProduct[]): boolean {
  return saleProducts.every(saleProduct => {
    const product = products.find(p => p.code === saleProduct.code);
    return product && hasEnoughStock(product, saleProduct.quantity);
  });
}