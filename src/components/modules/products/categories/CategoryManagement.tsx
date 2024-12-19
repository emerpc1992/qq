import React, { useState } from 'react';
import { Category } from '../../../../types/categories';
import { CategoryForm } from './CategoryForm';
import { CategoryList } from './CategoryList';
import { Plus } from 'lucide-react';

interface CategoryManagementProps {
  categories: Category[];
  onAddCategory: (name: string) => void;
  onUpdateCategory: (id: string, name: string) => void;
  onDeleteCategory: (id: string) => void;
}

export function CategoryManagement({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoryManagementProps) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Categorías</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {isCreating && (
        <CategoryForm
          onSubmit={(name) => {
            onAddCategory(name);
            setIsCreating(false);
          }}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <CategoryList
        categories={categories}
        onUpdate={onUpdateCategory}
        onDelete={onDeleteCategory}
      />
    </section>
  );
}