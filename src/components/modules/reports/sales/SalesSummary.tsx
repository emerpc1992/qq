import React from 'react';
import { Sale } from '../../../../types/sales';
import { formatCurrency } from '../../../../utils/formatters';

interface SalesSummaryProps {
  sales: Sale[];
}

export function SalesSummary({ sales }: SalesSummaryProps) {
  // Group sales by payment method
  const byPaymentMethod = sales.reduce((acc, sale) => {
    const method = sale.payment.method;
    acc[method] = (acc[method] || 0) + sale.total;
    return acc;
  }, {} as Record<string, number>);

  const paymentMethods = {
    cash: 'Efectivo',
    card: 'Tarjeta',
    transfer: 'Transferencia'
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Por Método de Pago</h4>
        <div className="space-y-2">
          {Object.entries(paymentMethods).map(([key, label]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{label}</span>
              <span className="font-medium">{formatCurrency(byPaymentMethod[key] || 0)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}