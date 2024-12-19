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

interface ProfitChartProps {
  sales: Sale[];
  expenses: Expense[];
}

export function ProfitChart({ sales, expenses }: ProfitChartProps) {
  // Group sales and expenses by date
  const data: Record<string, { sales: number; expenses: number }> = {};

  sales.forEach(sale => {
    const date = new Date(sale.date).toLocaleDateString();
    if (!data[date]) data[date] = { sales: 0, expenses: 0 };
    data[date].sales += sale.total;
  });

  expenses.forEach(expense => {
    const date = new Date(expense.date).toLocaleDateString();
    if (!data[date]) data[date] = { sales: 0, expenses: 0 };
    data[date].expenses += expense.amount;
  });

  const dates = Object.keys(data).sort();
  const profits = dates.map(date => data[date].sales - data[date].expenses);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Ganancia',
        data: profits,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
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
          label: (context: any) => `Ganancia: ${formatCurrency(context.raw)}`,
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

  return <Line data={chartData} options={options} />;
}