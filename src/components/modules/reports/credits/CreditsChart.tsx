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
import { Credit } from '../../../../types/credits';
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

interface CreditsChartProps {
  credits: Credit[];
}

export function CreditsChart({ credits }: CreditsChartProps) {
  // Group credits by date
  const creditsByDate = credits.reduce((acc, credit) => {
    const date = new Date(credit.dueDate).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {
        total: 0,
        paid: 0,
      };
    }
    acc[date].total += credit.totalAmount;
    acc[date].paid += credit.payments.reduce((sum, payment) => 
      payment.status === 'active' ? sum + payment.amount : sum, 0
    );
    return acc;
  }, {} as Record<string, { total: number; paid: number }>);

  const dates = Object.keys(creditsByDate).sort();

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Total Créditos',
        data: dates.map(date => creditsByDate[date].total),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Total Pagado',
        data: dates.map(date => creditsByDate[date].paid),
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