import { Product } from '../types/products';

const STORAGE_KEY = 'masterFactu:products';

export function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products:', error);
  }
}

export function loadProducts(): Product[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading products:', error);
    return null;
  }
}