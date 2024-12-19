import { useState, useEffect } from 'react';
import { Category } from '../types/categories';
import { loadCategories, saveCategories } from '../storage/categories';
import { generateCategoryId } from '../utils/categories';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() => {
    return loadCategories() || [];
  });

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: generateCategoryId(),
      name,
    };
    setCategories(current => [...current, newCategory]);
  };

  const updateCategory = (id: string, name: string) => {
    setCategories(current =>
      current.map(category =>
        category.id === id ? { ...category, name } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(current =>
      current.filter(category => category.id !== id)
    );
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}