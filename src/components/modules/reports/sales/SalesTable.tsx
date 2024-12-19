import React from 'react';
import { Sale } from '../../../../types/sales';
import { formatCurrency } from '../../../../utils/formatters';

interface SalesTableProps {
  sales: Sale[];
}

export function SalesTable({ sales }: SalesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td className="px-4 py-2 text-sm text-gray-600">
                {new Date(sale.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">{sale.client.name}</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">
                {formatCurrency(sale.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}