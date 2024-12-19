import React from 'react';
import { Sale } from '../../../../types/sales';
import { Expense } from '../../../../types/expenses';
import { formatCurrency } from '../../../../utils/formatters';

interface CashRegisterTableProps {
  sales: Sale[];
  expenses: Expense[];
}

type Transaction = {
  date: string;
  type: 'sale' | 'expense';
  description: string;
  amount: number;
};

export function CashRegisterTable({ sales, expenses }: CashRegisterTableProps) {
  // Combine and sort all cash transactions
  const transactions: Transaction[] = [
    ...sales
      .filter(sale => sale.payment.method === 'cash')
      .map(sale => ({
        date: sale.date,
        type: 'sale' as const,
        description: `Venta a ${sale.client.name}`,
        amount: sale.total,
      })),
    ...expenses.map(expense => ({
      date: expense.date,
      type: 'expense' as const,
      description: expense.reason,
      amount: expense.amount,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-sm text-gray-600">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  transaction.type === 'sale'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.type === 'sale' ? 'Venta' : 'Gasto'}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">{transaction.description}</td>
              <td className={`px-4 py-2 text-sm font-medium text-right ${
                transaction.type === 'sale' ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}