import { Category } from '../types/categories';

const STORAGE_KEY = 'masterFactu:categories';

export function saveCategories(categories: Category[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories:', error);
  }
}

export function loadCategories(): Category[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading categories:', error);
    return null;
  }
}