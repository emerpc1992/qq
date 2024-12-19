import React from 'react';
import { AppointmentStatus } from '../../../types/appointments';

interface StatusOption {
  value: AppointmentStatus | 'all';
  label: string;
  color: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: 'all', label: 'Todas', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  { value: 'pending', label: 'Pendientes', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'completed', label: 'Completadas', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'cancelled', label: 'Canceladas', color: 'bg-red-100 text-red-800 border-red-200' },
];

interface AppointmentStatusFilterProps {
  selectedStatus: AppointmentStatus | 'all';
  onStatusChange: (status: AppointmentStatus | 'all') => void;
}

export function AppointmentStatusFilter({ selectedStatus, onStatusChange }: AppointmentStatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onStatusChange(option.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            option.color
          } ${
            selectedStatus === option.value
              ? 'ring-2 ring-offset-2 ring-blue-500'
              : 'hover:opacity-80'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}