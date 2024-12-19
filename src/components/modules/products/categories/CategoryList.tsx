import React, { useState } from 'react';
import { Category } from '../../../../types/categories';
import { CategoryForm } from './CategoryForm';
import { Edit2, Trash2 } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export function CategoryList({ categories, onUpdate, onDelete }: CategoryListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

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
          {editingId === category.id ? (
            <CategoryForm
              initialName={category.name}
              onSubmit={(name) => {
                onUpdate(category.id, name);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <span className="text-gray-700">{category.name}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingId(category.id)}
                  className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(category.id)}
                  className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}