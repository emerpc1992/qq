import React from 'react';
import { FileDown } from 'lucide-react';
import { generateFinancialReport } from '../../../../utils/pdf';
import { Sale } from '../../../../types/sales';
import { Expense } from '../../../../types/expenses';
import { Credit } from '../../../../types/credits';

interface ExportButtonProps {
  title: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  sales: Sale[];
  expenses: Expense[];
  credits: Credit[];
  summary: {
    totalSales: number;
    totalExpenses: number;
    totalCommissions: number;
    grossProfit: number;
    netProfit: number;
    cashInRegister: number;
  };
}

export function ExportButton({ title, dateRange, sales, expenses, credits, summary }: ExportButtonProps) {
  const handleExport = () => {
    generateFinancialReport(title, dateRange, sales, expenses, credits, summary);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <FileDown className="h-5 w-5" />
      <span>Exportar PDF</span>
    </button>
  );
}