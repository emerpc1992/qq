import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Sale } from '../../../../types/sales';
import { Expense } from '../../../../types/expenses';
import { formatCurrency } from '../../../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CashRegisterChartProps {
  sales: Sale[];
  expenses: Expense[];
}

export function CashRegisterChart({ sales, expenses }: CashRegisterChartProps) {
  // Group cash transactions by date
  const transactionsByDate: Record<string, { income: number; expenses: number }> = {};

  // Add sales
  sales.forEach(sale => {
    if (sale.payment.method === 'cash') {
      const date = new Date(sale.date).toLocaleDateString();
      if (!transactionsByDate[date]) {
        transactionsByDate[date] = { income: 0, expenses: 0 };
      }
      transactionsByDate[date].income += sale.total;
    }
  });

  // Add expenses
  expenses.forEach(expense => {
    const date = new Date(expense.date).toLocaleDateString();
    if (!transactionsByDate[date]) {
      transactionsByDate[date] = { income: 0, expenses: 0 };
    }
    transactionsByDate[date].expenses += expense.amount;
  });

  const dates = Object.keys(transactionsByDate).sort();

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Ingresos en Efectivo',
        data: dates.map(date => transactionsByDate[date].income),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Gastos',
        data: dates.map(date => transactionsByDate[date].expenses),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${formatCurrency(context.raw)}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: number) => formatCurrency(value),
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}