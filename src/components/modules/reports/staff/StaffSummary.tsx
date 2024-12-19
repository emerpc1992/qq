import React from 'react';
import { Staff } from '../../../../types/staff';
import { formatCurrency } from '../../../../utils/formatters';

interface StaffSummaryProps {
  staff: Staff[];
}

export function StaffSummary({ staff }: StaffSummaryProps) {
  return (
    <div className="space-y-4">
      {staff.filter(member => member.sales.length > 0).map((member) => {
        const totalSales = member.sales.reduce((sum, sale) => sum + sale.amount, 0);
        const totalCommissions = member.sales.reduce((sum, sale) => sum + sale.totalCommission, 0);
        const averageCommission = (totalCommissions / totalSales) * 100 || 0;

        return (
          <div key={member.code} className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">{member.name}</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Ventas:</span>
                <p className="font-medium">{formatCurrency(totalSales)}</p>
              </div>
              <div>
                <span className="text-gray-600">Total Comisiones:</span>
                <p className="font-medium">{formatCurrency(totalCommissions)}</p>
              </div>
              <div>
                <span className="text-gray-600">Comisión Promedio:</span>
                <p className="font-medium">{averageCommission.toFixed(2)}%</p>
              </div>
              <div>
                <span className="text-gray-600">Ventas Realizadas:</span>
                <p className="font-medium">{member.sales.length}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}