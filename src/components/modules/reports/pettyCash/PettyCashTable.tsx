import React from 'react';
import { PettyCashTransaction } from '../../../../types/pettyCash';
import { formatCurrency } from '../../../../utils/formatters';

interface PettyCashTableProps {
  transactions: PettyCashTransaction[];
}

export function PettyCashTable({ transactions }: PettyCashTableProps) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-4 py-2 text-sm text-gray-600">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  transaction.type === 'deposit'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.type === 'deposit' ? 'Ingreso' : 'Retiro'}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">{transaction.reason}</td>
              <td className={`px-4 py-2 text-sm font-medium text-right ${
                transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
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