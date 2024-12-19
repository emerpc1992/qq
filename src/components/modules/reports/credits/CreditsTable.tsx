import React from 'react';
import { Credit } from '../../../../types/credits';
import { Product } from '../../../../types/products';
import { formatCurrency } from '../../../../utils/formatters';

interface CreditsTableProps {
  credits: Credit[];
  showProfit?: boolean;
  products?: Product[];
}

export function CreditsTable({ credits, showProfit = false, products = [] }: CreditsTableProps) {
  const calculateProfit = (credit: Credit) => {
    return credit.products.reduce((profit, creditProduct) => {
      const product = products.find(p => p.code === creditProduct.code);
      if (product) {
        const cost = product.costPrice * creditProduct.quantity;
        const revenue = creditProduct.price * creditProduct.quantity;
        return profit + (revenue - cost);
      }
      return profit;
    }, 0);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Pagado</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Pendiente</th>
            {showProfit && (
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Ganancia</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {credits.map((credit) => {
            const totalPaid = credit.payments.reduce((sum, payment) => 
              payment.status === 'active' ? sum + payment.amount : sum, 0
            );
            const pending = credit.totalAmount - totalPaid;
            const profit = showProfit ? calculateProfit(credit) : 0;

            return (
              <tr key={credit.code}>
                <td className="px-4 py-2 text-sm text-gray-900">{credit.clientName}</td>
                <td className="px-4 py-2 text-sm text-gray-900 text-right">
                  {formatCurrency(credit.totalAmount)}
                </td>
                <td className="px-4 py-2 text-sm text-green-600 text-right">
                  {formatCurrency(totalPaid)}
                </td>
                <td className="px-4 py-2 text-sm text-red-600 text-right">
                  {formatCurrency(pending)}
                </td>
                {showProfit && (
                  <td className="px-4 py-2 text-sm text-blue-600 text-right">
                    {formatCurrency(profit)}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}