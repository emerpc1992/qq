import React from 'react';
import { usePettyCash } from '../../../../hooks/usePettyCash';
import { formatCurrency } from '../../../../utils/formatters';
import { PettyCashChart } from './PettyCashChart';
import { PettyCashSummary } from './PettyCashSummary';
import { PettyCashTable } from './PettyCashTable';

interface PettyCashReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export function PettyCashReport({ dateRange }: PettyCashReportProps) {
  const { balance, transactions } = usePettyCash();

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59);
    return transactionDate >= startDate && transactionDate <= endDate;
  });

  const summary = filteredTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.totalDeposits += transaction.amount;
      acc.depositCount++;
    } else {
      acc.totalWithdrawals += transaction.amount;
      acc.withdrawalCount++;
    }
    return acc;
  }, {
    totalDeposits: 0,
    totalWithdrawals: 0,
    depositCount: 0,
    withdrawalCount: 0,
  });

  const netFlow = summary.totalDeposits - summary.totalWithdrawals;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Balance Actual</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(balance)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Ingresos</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalDeposits)}</p>
          <p className="text-sm text-gray-500">{summary.depositCount} movimientos</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Retiros</h3>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalWithdrawals)}</p>
          <p className="text-sm text-gray-500">{summary.withdrawalCount} movimientos</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Flujo Neto</h3>
          <p className={`text-2xl font-bold ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(netFlow)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen de Movimientos</h3>
          <PettyCashSummary transactions={filteredTransactions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Gráfico de Movimientos</h3>
          <PettyCashChart transactions={filteredTransactions} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Últimos Movimientos</h3>
        <PettyCashTable transactions={filteredTransactions} />
      </div>
    </div>
  );
}