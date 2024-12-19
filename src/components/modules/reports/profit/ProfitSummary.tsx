import React from 'react';
import { Sale } from '../../../../types/sales';
import { Expense } from '../../../../types/expenses';
import { formatCurrency } from '../../../../utils/formatters';

interface ProfitSummaryProps {
  sales: Sale[];
  expenses: Expense[];
  costOfGoodsSold: number;
  inventoryValue: number;
}

export function ProfitSummary({ sales, expenses, costOfGoodsSold, inventoryValue }: ProfitSummaryProps) {
  // Calculate monthly totals
  const monthlyData = sales.reduce((acc, sale) => {
    const date = new Date(sale.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        sales: 0,
        expenses: 0,
        cogs: 0,
      };
    }

    acc[monthKey].sales += sale.total;
    acc[monthKey].cogs += sale.products.reduce((sum, product) => {
      const costPrice = product.originalPrice || 0;
      return sum + (costPrice * product.quantity);
    }, 0);

    return acc;
  }, {} as Record<string, { sales: number; expenses: number; cogs: number }>);

  // Add expenses to monthly data
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = { sales: 0, expenses: 0, cogs: 0 };
    }
    
    acc[monthKey].expenses += expense.amount;
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mes</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Ingresos</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Costo de Ventas</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Ganancia Bruta</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Gastos</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Ganancia Neta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.entries(monthlyData).map(([monthKey, data]) => {
              const [year, month] = monthKey.split('-');
              const grossProfit = data.sales - data.cogs;
              const netProfit = grossProfit - data.expenses;
              const grossMargin = (grossProfit / data.sales) * 100 || 0;
              const netMargin = (netProfit / data.sales) * 100 || 0;

              return (
                <tr key={monthKey}>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {new Date(Number(year), Number(month) - 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-2 text-sm text-green-600 text-right">
                    {formatCurrency(data.sales)}
                  </td>
                  <td className="px-4 py-2 text-sm text-red-600 text-right">
                    {formatCurrency(data.cogs)}
                  </td>
                  <td className="px-4 py-2 text-sm text-right">
                    <div className={grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(grossProfit)}
                      <span className="text-xs ml-1">({grossMargin.toFixed(1)}%)</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-red-600 text-right">
                    {formatCurrency(data.expenses)}
                  </td>
                  <td className="px-4 py-2 text-sm text-right">
                    <div className={netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(netProfit)}
                      <span className="text-xs ml-1">({netMargin.toFixed(1)}%)</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Resumen de Inventario</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600">Valor Actual del Inventario:</span>
            <p className="text-lg font-medium">{formatCurrency(inventoryValue)}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Costo de Productos Vendidos:</span>
            <p className="text-lg font-medium">{formatCurrency(costOfGoodsSold)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}