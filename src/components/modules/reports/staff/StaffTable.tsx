import React from 'react';
import { Staff } from '../../../../types/staff';
import { formatCurrency } from '../../../../utils/formatters';

interface StaffTableProps {
  staff: Staff[];
}

export function StaffTable({ staff }: StaffTableProps) {
  // Get all sales from all staff members and sort by date
  const allSales = staff
    .flatMap(member => 
      member.sales.map(sale => ({
        ...sale,
        staffName: member.name
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Colaborador</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Venta</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Comisión</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {allSales.map((sale) => (
            <tr key={sale.id}>
              <td className="px-4 py-2 text-sm text-gray-600">
                {new Date(sale.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">{sale.staffName}</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">
                {formatCurrency(sale.amount)}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">
                {formatCurrency(sale.totalCommission)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}