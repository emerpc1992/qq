import React from 'react';
import { PettyCashTransaction } from '../../../types/pettyCash';
import { formatCurrency } from '../../../utils/formatters';
import { ArrowUpCircle, ArrowDownCircle, Trash2 } from 'lucide-react';

interface TransactionListProps {
  transactions: PettyCashTransaction[];
  onClearHistory: () => void;
}

export function TransactionList({ transactions, onClearHistory }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay transacciones registradas</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Historial de Movimientos</h3>
        <button
          onClick={onClearHistory}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          <span>Borrar Historial</span>
        </button>
      </div>
      
      <div className="grid gap-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`bg-white p-6 rounded-lg shadow-sm border ${
              transaction.type === 'deposit'
                ? 'border-green-200'
                : 'border-red-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {transaction.type === 'deposit' ? (
                  <ArrowUpCircle className="h-6 w-6 text-green-600 mt-1" />
                ) : (
                  <ArrowDownCircle className="h-6 w-6 text-red-600 mt-1" />
                )}
                <div>
                  <p className={`text-lg font-medium ${
                    transaction.type === 'deposit'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}{' '}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}{' '}
                    {new Date(transaction.date).toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {transaction.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}