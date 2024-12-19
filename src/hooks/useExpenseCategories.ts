import { useState, useEffect } from 'react';
import { ExpenseCategory } from '../types/expenses';
import { loadExpenseCategories, saveExpenseCategories } from '../storage/expenseCategories';
import { generateCategoryId } from '../utils/categories';

export function useExpenseCategories() {
  const [categories, setCategories] = useState<ExpenseCategory[]>(() => {
    return loadExpenseCategories() || [];
  });

  useEffect(() => {
    saveExpenseCategories(categories);
  }, [categories]);

  const addCategory = (name: string) => {
    const newCategory: ExpenseCategory = {
      id: generateCategoryId(),
      name,
    };
    setCategories(current => [...current, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories(current =>
      current.filter(category => category.id !== id)
    );
  };

  return {
    categories,
    addCategory,
    deleteCategory,
  };
}