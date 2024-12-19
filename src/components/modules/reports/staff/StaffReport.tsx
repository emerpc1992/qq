import React from 'react';
import { useStaff } from '../../../../hooks/useStaff';
import { formatCurrency } from '../../../../utils/formatters';
import { StaffChart } from './StaffChart';
import { StaffSummary } from './StaffSummary';
import { StaffTable } from './StaffTable';

interface StaffReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export function StaffReport({ dateRange }: StaffReportProps) {
  const { staff } = useStaff();

  const filteredStaff = staff.map(member => ({
    ...member,
    sales: member.sales.filter(sale => {
      const saleDate = new Date(sale.date);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59);
      return saleDate >= startDate && saleDate <= endDate;
    })
  }));

  const totalCommissions = filteredStaff.reduce((sum, member) => 
    sum + member.sales.reduce((total, sale) => total + sale.totalCommission, 0)
  , 0);

  const totalSales = filteredStaff.reduce((sum, member) => 
    sum + member.sales.reduce((total, sale) => total + sale.amount, 0)
  , 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Comisiones</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCommissions)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Ventas</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSales)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Colaboradores Activos</h3>
          <p className="text-2xl font-bold text-gray-900">
            {filteredStaff.filter(member => member.sales.length > 0).length}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gráfico de Comisiones</h3>
        <StaffChart staff={filteredStaff} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen por Colaborador</h3>
          <StaffSummary staff={filteredStaff} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Últimas Comisiones</h3>
          <StaffTable staff={filteredStaff} />
        </div>
      </div>
    </div>
  );
}