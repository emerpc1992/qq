import React, { useState } from 'react';
import { ExpenseList } from './ExpenseList';
import { ExpenseForm } from './ExpenseForm';
import { CategoryManagement } from './categories/CategoryManagement';
import { Plus } from 'lucide-react';
import { useExpenses } from '../../../hooks/useExpenses';
import { useExpenseCategories } from '../../../hooks/useExpenseCategories';

export function ExpensesModule() {
  const [isCreating, setIsCreating] = useState(false);
  const { expenses, addExpense, cancelExpense, deleteExpense } = useExpenses();
  const { categories, addCategory, deleteCategory } = useExpenseCategories();

  const handleCreateExpense = (expenseData: any) => {
    addExpense(expenseData);
    setIsCreating(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Gastos</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Gasto</span>
        </button>
      </div>

      <CategoryManagement
        categories={categories}
        onAddCategory={addCategory}
        onDeleteCategory={deleteCategory}
      />

      {isCreating && (
        <ExpenseForm
          categories={categories}
          onSubmit={handleCreateExpense}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <ExpenseList
        expenses={expenses}
        categories={categories}
        onCancelExpense={cancelExpense}
        onDeleteExpense={deleteExpense}
      />
    </div>
  );
}