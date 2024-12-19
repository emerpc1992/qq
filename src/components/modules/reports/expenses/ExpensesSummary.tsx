import React from 'react';
import { Expense } from '../../../../types/expenses';
import { formatCurrency } from '../../../../utils/formatters';
import { useExpenseCategories } from '../../../../hooks/useExpenseCategories';

interface ExpensesSummaryProps {
  expenses: Expense[];
}

export function ExpensesSummary({ expenses }: ExpensesSummaryProps) {
  const { categories } = useExpenseCategories();

  // Group expenses by category
  const byCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Por Categoría</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{category.name}</span>
              <span className="font-medium">{formatCurrency(byCategory[category.id] || 0)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}