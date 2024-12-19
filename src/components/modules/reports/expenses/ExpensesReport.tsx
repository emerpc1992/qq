import React from 'react';
import { useExpenses } from '../../../../hooks/useExpenses';
import { formatCurrency } from '../../../../utils/formatters';
import { ExpensesChart } from './ExpensesChart';
import { ExpensesSummary } from './ExpensesSummary';
import { ExpensesTable } from './ExpensesTable';

interface ExpensesReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export function ExpensesReport({ dateRange }: ExpensesReportProps) {
  const { expenses } = useExpenses();

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59);
    return expenseDate >= startDate && expenseDate <= endDate && expense.status !== 'cancelled';
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = totalExpenses / (filteredExpenses.length || 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Gastos</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Gastos Registrados</h3>
          <p className="text-2xl font-bold text-gray-900">{filteredExpenses.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Promedio por Gasto</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageExpense)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gráfico de Gastos</h3>
        <ExpensesChart expenses={filteredExpenses} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen por Categoría</h3>
          <ExpensesSummary expenses={filteredExpenses} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Últimos Gastos</h3>
          <ExpensesTable expenses={filteredExpenses.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}