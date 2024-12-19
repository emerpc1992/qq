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

interface SalesChartProps {
  sales: Sale[];
}

export function SalesChart({ sales }: SalesChartProps) {
  // Group sales by date
  const salesByDate = sales.reduce((acc, sale) => {
    const date = new Date(sale.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + sale.total;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(salesByDate),
    datasets: [
      {
        label: 'Ventas',
        data: Object.values(salesByDate),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
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