import React from 'react';
import { formatCurrency } from '../../../../utils/formatters';

interface CashRegisterSummaryProps {
  cashSales: number;
  cardSales: number;
  transferSales: number;
  expenses: number;
  commissions: number;
  pettyCashBalance: number;
  costOfGoodsSold: number;
  grossProfit: number;
  netProfit: number;
}

export function CashRegisterSummary({
  cashSales,
  cardSales,
  transferSales,
  expenses,
  commissions,
  pettyCashBalance,
  costOfGoodsSold,
  grossProfit,
  netProfit,
}: CashRegisterSummaryProps) {
  const totalSales = cashSales + cardSales + transferSales;
  const cashPercentage = (cashSales / totalSales) * 100 || 0;
  const cardPercentage = (cardSales / totalSales) * 100 || 0;
  const transferPercentage = (transferSales / totalSales) * 100 || 0;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-4">Ventas por Método de Pago</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Efectivo</span>
              <span className="text-sm font-medium">{formatCurrency(cashSales)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${cashPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{cashPercentage.toFixed(1)}% del total</p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Tarjeta</span>
              <span className="text-sm font-medium">{formatCurrency(cardSales)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${cardPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{cardPercentage.toFixed(1)}% del total</p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Transferencia</span>
              <span className="text-sm font-medium">{formatCurrency(transferSales)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${transferPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{transferPercentage.toFixed(1)}% del total</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Resumen de Ganancias</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Ventas Totales:</span>
            <span className="text-sm font-medium text-green-600">{formatCurrency(totalSales)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Costo de Productos:</span>
            <span className="text-sm font-medium text-red-600">{formatCurrency(costOfGoodsSold)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Ganancia Bruta:</span>
            <span className={`text-sm font-medium ${grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(grossProfit)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Gastos:</span>
            <span className="text-sm font-medium text-red-600">{formatCurrency(expenses)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Comisiones:</span>
            <span className="text-sm font-medium text-red-600">{formatCurrency(commissions)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm font-medium text-gray-700">Ganancia Neta:</span>
            <span className={`text-sm font-medium ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(netProfit)}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Balance de Efectivo</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600">Ingresos en Efectivo:</span>
            <p className="text-lg font-medium text-green-600">{formatCurrency(cashSales)}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Gastos + Comisiones:</span>
            <p className="text-lg font-medium text-red-600">{formatCurrency(expenses + commissions)}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Caja Chica:</span>
            <p className="text-lg font-medium text-blue-600">{formatCurrency(pettyCashBalance)}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Balance Final:</span>
            <p className="text-lg font-medium">{formatCurrency(cashSales - expenses - commissions + pettyCashBalance)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}