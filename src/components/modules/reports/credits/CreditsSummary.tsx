import React from 'react';
import { Credit } from '../../../../types/credits';
import { formatCurrency } from '../../../../utils/formatters';

interface CreditsSummaryProps {
  credits: Credit[];
}

export function CreditsSummary({ credits }: CreditsSummaryProps) {
  const statusSummary = credits.reduce((acc, credit) => {
    const status = credit.status;
    if (!acc[status]) {
      acc[status] = {
        count: 0,
        total: 0,
        paid: 0,
      };
    }
    acc[status].count++;
    acc[status].total += credit.totalAmount;
    acc[status].paid += credit.payments.reduce((sum, payment) => 
      payment.status === 'active' ? sum + payment.amount : sum, 0
    );
    return acc;
  }, {} as Record<string, { count: number; total: number; paid: number }>);

  const statusLabels = {
    pending: 'Pendientes',
    completed: 'Completados',
  };

  return (
    <div className="space-y-6">
      {Object.entries(statusLabels).map(([status, label]) => {
        const data = statusSummary[status] || { count: 0, total: 0, paid: 0 };
        const pending = data.total - data.paid;
        const progress = (data.paid / data.total) * 100 || 0;

        return (
          <div key={status} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">{label}</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Cantidad:</span>
                <p className="font-medium">{data.count}</p>
              </div>
              <div>
                <span className="text-gray-600">Total:</span>
                <p className="font-medium">{formatCurrency(data.total)}</p>
              </div>
              <div>
                <span className="text-gray-600">Pagado:</span>
                <p className="font-medium text-green-600">{formatCurrency(data.paid)}</p>
              </div>
              <div>
                <span className="text-gray-600">Pendiente:</span>
                <p className="font-medium text-red-600">{formatCurrency(pending)}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}