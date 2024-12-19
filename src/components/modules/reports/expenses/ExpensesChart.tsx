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

interface ExpensesChartProps {
  expenses: Expense[];
}

export function ExpensesChart({ expenses }: ExpensesChartProps) {
  // Group expenses by date
  const expensesByDate = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(expensesByDate),
    datasets: [
      {
        label: 'Gastos',
        data: Object.values(expensesByDate),
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
          label: (context: any) => `Total: ${formatCurrency(context.raw)}`,
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