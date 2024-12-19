import React from 'react';
import { useSales } from '../../../../hooks/useSales';
import { useExpenses } from '../../../../hooks/useExpenses';
import { usePettyCash } from '../../../../hooks/usePettyCash';
import { useProducts } from '../../../../hooks/useProducts';
import { useCredits } from '../../../../hooks/useCredits';
import { formatCurrency } from '../../../../utils/formatters';
import { CashRegisterChart } from './CashRegisterChart';
import { CashRegisterSummary } from './CashRegisterSummary';
import { CashRegisterTable } from './CashRegisterTable';
import { ExportButton } from '../common/ExportButton';

interface CashRegisterReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export function CashRegisterReport({ dateRange }: CashRegisterReportProps) {
  const { sales } = useSales();
  const { expenses } = useExpenses();
  const { balance: pettyCashBalance } = usePettyCash();
  const { products } = useProducts();
  const { credits } = useCredits();

  // Filter transactions by date range
  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59);
    return saleDate >= startDate && saleDate <= endDate && sale.status !== 'cancelled';
  });

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59);
    return expenseDate >= startDate && expenseDate <= endDate && expense.status !== 'cancelled';
  });

  const filteredCredits = credits.filter(credit => {
    const creditDate = new Date(credit.dueDate);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59);
    return creditDate >= startDate && creditDate <= endDate;
  });

  // Calculate totals
  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  
  const cashSales = filteredSales.reduce((sum, sale) => 
    sale.payment.method === 'cash' ? sum + sale.total : sum, 0
  );

  const cardSales = filteredSales.reduce((sum, sale) => 
    sale.payment.method === 'card' ? sum + sale.total : sum, 0
  );

  const transferSales = filteredSales.reduce((sum, sale) => 
    sale.payment.method === 'transfer' ? sum + sale.total : sum, 0
  );

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate total commissions
  const totalCommissions = filteredSales.reduce((sum, sale) => 
    sale.staff ? sum + sale.staff.commissionAmount : sum, 0
  );

  // Calculate cost of goods sold and gross profit
  const costOfGoodsSold = filteredSales.reduce((sum, sale) => {
    return sum + sale.products.reduce((productSum, saleProduct) => {
      const product = products.find(p => p.code === saleProduct.code);
      if (product) {
        return productSum + (product.costPrice * saleProduct.quantity);
      }
      return productSum;
    }, 0);
  }, 0);

  const grossProfit = totalSales - costOfGoodsSold;
  const netProfit = grossProfit - totalExpenses - totalCommissions;

  // Calculate cash in register
  const cashInRegister = cashSales - totalExpenses - totalCommissions + pettyCashBalance;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reporte de Caja</h2>
        <ExportButton
          title="Reporte de Caja"
          dateRange={dateRange}
          sales={filteredSales}
          expenses={filteredExpenses}
          credits={filteredCredits}
          summary={{
            totalSales,
            totalExpenses,
            totalCommissions,
            grossProfit,
            netProfit,
            cashInRegister,
          }}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Dinero en Caja</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(cashInRegister)}</p>
          <div className="mt-1 text-xs text-gray-500">
            Efectivo - Gastos - Comisiones + Caja Chica
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Ventas</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalSales)}</p>
          <div className="mt-1 text-xs text-gray-500">
            Todos los métodos de pago
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Gastos y Comisiones</h3>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses + totalCommissions)}</p>
          <div className="mt-1 text-xs text-gray-500">
            Gastos: {formatCurrency(totalExpenses)} | Comisiones: {formatCurrency(totalCommissions)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Ganancia Neta</h3>
          <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {formatCurrency(netProfit)}
          </p>
          <div className="mt-1 text-xs text-gray-500">
            Ventas - Costos - Gastos - Comisiones
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen por Método de Pago</h3>
          <CashRegisterSummary
            cashSales={cashSales}
            cardSales={cardSales}
            transferSales={transferSales}
            expenses={totalExpenses}
            commissions={totalCommissions}
            pettyCashBalance={pettyCashBalance}
            costOfGoodsSold={costOfGoodsSold}
            grossProfit={grossProfit}
            netProfit={netProfit}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Flujo de Caja</h3>
          <CashRegisterChart
            sales={filteredSales}
            expenses={filteredExpenses}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Movimientos de Caja</h3>
        <CashRegisterTable
          sales={filteredSales}
          expenses={filteredExpenses}
        />
      </div>
    </div>
  );
}