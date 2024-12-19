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
import { PettyCashTransaction } from '../../../../types/pettyCash';
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

interface PettyCashChartProps {
  transactions: PettyCashTransaction[];
}

export function PettyCashChart({ transactions }: PettyCashChartProps) {
  // Group transactions by date
  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {
        deposits: 0,
        withdrawals: 0,
      };
    }
    if (transaction.type === 'deposit') {
      acc[date].deposits += transaction.amount;
    } else {
      acc[date].withdrawals += transaction.amount;
    }
    return acc;
  }, {} as Record<string, { deposits: number; withdrawals: number }>);

  const dates = Object.keys(transactionsByDate).sort();

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Ingresos',
        data: dates.map(date => transactionsByDate[date].deposits),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Retiros',
        data: dates.map(date => transactionsByDate[date].withdrawals),
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