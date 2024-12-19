import React from 'react';
import { useCredits } from '../../../../hooks/useCredits';
import { useProducts } from '../../../../hooks/useProducts';
import { formatCurrency } from '../../../../utils/formatters';
import { CreditsChart } from './CreditsChart';
import { CreditsSummary } from './CreditsSummary';
import { CreditsTable } from './CreditsTable';

interface CreditsReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export function CreditsReport({ dateRange }: CreditsReportProps) {
  const { credits } = useCredits();
  const { products } = useProducts();

  const filteredCredits = credits.filter(credit => {
    const creditDate = new Date(credit.dueDate);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59);
    return creditDate >= startDate && creditDate <= endDate;
  });

  // Calculate totals and profits
  const summary = filteredCredits.reduce((acc, credit) => {
    // Calculate total amount and payments
    acc.totalAmount += credit.totalAmount;
    acc.totalPaid += credit.payments.reduce((sum, payment) => 
      payment.status === 'active' ? sum + payment.amount : sum, 0
    );

    // Calculate cost and profit for each product
    credit.products.forEach(creditProduct => {
      const product = products.find(p => p.code === creditProduct.code);
      if (product) {
        const costPrice = product.costPrice;
        const totalCost = costPrice * creditProduct.quantity;
        const revenue = creditProduct.price * creditProduct.quantity;
        acc.totalCost += totalCost;
        acc.totalProfit += revenue - totalCost;
      }
    });

    return acc;
  }, {
    totalAmount: 0,
    totalPaid: 0,
    totalCost: 0,
    totalProfit: 0
  });

  const totalPending = summary.totalAmount - summary.totalPaid;
  const profitMargin = (summary.totalProfit / summary.totalAmount) * 100 || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Créditos</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalAmount)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Pagado</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalPaid)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Pendiente</h3>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalPending)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Ganancia Total</h3>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(summary.totalProfit)}</p>
          <p className="text-sm text-gray-500">Margen: {profitMargin.toFixed(1)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Desglose de Costos</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Costo Total:</span>
                <p className="text-lg font-medium text-red-600">{formatCurrency(summary.totalCost)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Ingresos:</span>
                <p className="text-lg font-medium text-green-600">{formatCurrency(summary.totalAmount)}</p>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Ganancia:</span>
              <p className="text-lg font-medium text-blue-600">{formatCurrency(summary.totalProfit)}</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${profitMargin}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Margen de ganancia: {profitMargin.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Gráfico de Créditos</h3>
          <CreditsChart credits={filteredCredits} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen de Créditos</h3>
          <CreditsSummary credits={filteredCredits} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Últimos Créditos</h3>
          <CreditsTable credits={filteredCredits.slice(0, 5)} showProfit={true} products={products} />
        </div>
      </div>
    </div>
  );
}