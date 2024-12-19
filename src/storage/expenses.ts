import { Expense } from '../types/expenses';

const STORAGE_KEY = 'masterFactu:expenses';

export function saveExpenses(expenses: Expense[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
}

export function loadExpenses(): Expense[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading expenses:', error);
    return null;
  }
}