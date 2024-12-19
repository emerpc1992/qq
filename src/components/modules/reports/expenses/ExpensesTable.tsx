import React from 'react';
import { Expense } from '../../../../types/expenses';
import { formatCurrency } from '../../../../utils/formatters';
import { useExpenseCategories } from '../../../../hooks/useExpenseCategories';

interface ExpensesTableProps {
  expenses: Expense[];
}

export function ExpensesTable({ expenses }: ExpensesTableProps) {
  const { categories } = useExpenseCategories();

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Sin categoría';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-4 py-2 text-sm text-gray-600">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {getCategoryName(expense.category)}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">
                {formatCurrency(expense.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}