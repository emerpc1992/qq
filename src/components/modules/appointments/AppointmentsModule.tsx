import React, { useState } from 'react';
import { AppointmentList } from './AppointmentList';
import { AppointmentForm } from './AppointmentForm';
import { AppointmentSearch } from './AppointmentSearch';
import { AppointmentStatusFilter } from './AppointmentStatusFilter';
import { Plus } from 'lucide-react';
import { useAppointments } from '../../../hooks/useAppointments';
import { Appointment, AppointmentStatus } from '../../../types/appointments';
import { filterAppointments } from '../../../utils/search';

export function AppointmentsModule() {
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments();

  const handleCreateAppointment = (appointment: Appointment) => {
    addAppointment(appointment);
    setIsCreating(false);
  };

  const filteredAppointments = filterAppointments(appointments, searchTerm, statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Citas</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nueva Cita</span>
        </button>
      </div>

      {isCreating && (
        <AppointmentForm
          onSubmit={handleCreateAppointment}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="md:w-64">
          <AppointmentSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
        <AppointmentStatusFilter
          selectedStatus={statusFilter}
          onStatusChange={setStatusFilter}
        />
      </div>

      <AppointmentList
        appointments={filteredAppointments}
        onUpdate={updateAppointment}
        onDelete={deleteAppointment}
      />
    </div>
  );
}