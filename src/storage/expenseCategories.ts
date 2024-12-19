import { ExpenseCategory } from '../types/expenses';

const STORAGE_KEY = 'masterFactu:expenseCategories';

export function saveExpenseCategories(categories: ExpenseCategory[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving expense categories:', error);
  }
}

export function loadExpenseCategories(): ExpenseCategory[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading expense categories:', error);
    return null;
  }
}