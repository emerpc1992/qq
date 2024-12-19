import React from 'react';
import { useSales } from '../../../../hooks/useSales';
import { formatCurrency } from '../../../../utils/formatters';
import { SalesChart } from './SalesChart';
import { SalesSummary } from './SalesSummary';
import { SalesTable } from './SalesTable';

interface SalesReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export function SalesReport({ dateRange }: SalesReportProps) {
  const { sales } = useSales();

  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59);
    return saleDate >= startDate && saleDate <= endDate && sale.status !== 'cancelled';
  });

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const averageSale = totalSales / (filteredSales.length || 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Ventas</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSales)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Ventas Realizadas</h3>
          <p className="text-2xl font-bold text-gray-900">{filteredSales.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Promedio por Venta</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageSale)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gráfico de Ventas</h3>
        <SalesChart sales={filteredSales} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen</h3>
          <SalesSummary sales={filteredSales} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Últimas Ventas</h3>
          <SalesTable sales={filteredSales.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}