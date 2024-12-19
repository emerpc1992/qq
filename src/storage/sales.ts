import { Sale } from '../types/sales';

const STORAGE_KEY = 'masterFactu:sales';

export function saveSales(sales: Sale[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
  } catch (error) {
    console.error('Error saving sales:', error);
  }
}

export function loadSales(): Sale[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading sales:', error);
    return null;
  }
}