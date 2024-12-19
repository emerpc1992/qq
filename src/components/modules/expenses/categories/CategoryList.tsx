import React from 'react';
import { ExpenseCategory } from '../../../../types/expenses';
import { Trash2 } from 'lucide-react';

interface CategoryListProps {
  categories: ExpenseCategory[];
  onDelete: (id: string) => void;
}

export function CategoryList({ categories, onDelete }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay categorías creadas</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <span className="text-gray-700">{category.name}</span>
          <button
            onClick={() => onDelete(category.id)}
            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}