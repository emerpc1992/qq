import React from 'react';
import { PettyCashTransaction } from '../../../../types/pettyCash';
import { formatCurrency } from '../../../../utils/formatters';

interface PettyCashSummaryProps {
  transactions: PettyCashTransaction[];
}

export function PettyCashSummary({ transactions }: PettyCashSummaryProps) {
  const summary = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = {
        deposits: 0,
        withdrawals: 0,
      };
    }
    if (transaction.type === 'deposit') {
      acc[month].deposits += transaction.amount;
    } else {
      acc[month].withdrawals += transaction.amount;
    }
    return acc;
  }, {} as Record<string, { deposits: number; withdrawals: number }>);

  return (
    <div className="space-y-4">
      {Object.entries(summary).map(([month, data]) => {
        const netFlow = data.deposits - data.withdrawals;
        const netPercentage = ((netFlow) / (data.deposits || 1)) * 100;

        return (
          <div key={month} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">{month}</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Ingresos:</span>
                <p className="font-medium text-green-600">{formatCurrency(data.deposits)}</p>
              </div>
              <div>
                <span className="text-gray-600">Retiros:</span>
                <p className="font-medium text-red-600">{formatCurrency(data.withdrawals)}</p>
              </div>
            </div>
            <div>
              <span className="text-gray-600">Flujo Neto:</span>
              <p className={`font-medium ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(netFlow)}
              </p>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${netFlow >= 0 ? 'bg-green-600' : 'bg-red-600'}`}
                  style={{ width: `${Math.abs(netPercentage)}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}