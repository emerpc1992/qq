import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Staff } from '../../../../types/staff';
import { formatCurrency } from '../../../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StaffChartProps {
  staff: Staff[];
}

export function StaffChart({ staff }: StaffChartProps) {
  const activeStaff = staff.filter(member => member.sales.length > 0);
  
  const data = {
    labels: activeStaff.map(member => member.name),
    datasets: [
      {
        label: 'Ventas',
        data: activeStaff.map(member => 
          member.sales.reduce((sum, sale) => sum + sale.amount, 0)
        ),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Comisiones',
        data: activeStaff.map(member => 
          member.sales.reduce((sum, sale) => sum + sale.totalCommission, 0)
        ),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
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

  return <Bar data={data} options={options} />;
}