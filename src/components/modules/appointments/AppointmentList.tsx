import React, { useState } from 'react';
import { Appointment } from '../../../types/appointments';
import { AppointmentForm } from './AppointmentForm';
import { formatDate, formatTime, formatCurrency } from '../../../utils/formatters';
import { generateWhatsAppMessage, getWhatsAppLink } from '../../../utils/whatsapp';
import { Edit2, Trash2, MessageCircle } from 'lucide-react';

interface AppointmentListProps {
  appointments: Appointment[];
  onUpdate: (code: string, appointment: Appointment) => void;
  onDelete: (code: string) => void;
}

export function AppointmentList({ appointments, onUpdate, onDelete }: AppointmentListProps) {
  const [editingCode, setEditingCode] = useState<string | null>(null);

  const handleUpdate = (appointment: Appointment) => {
    onUpdate(appointment.code, appointment);
    setEditingCode(null);
  };

  const handleWhatsAppClick = (appointment: Appointment) => {
    const message = generateWhatsAppMessage(appointment);
    const whatsappLink = getWhatsAppLink(appointment.phone, message);
    window.open(whatsappLink, '_blank');
  };

  const getStatusBadgeClass = (status: Appointment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusLabel = (status: Appointment['status']) => {
    const labels = {
      pending: 'Pendiente',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };
    return labels[status];
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay citas programadas</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div 
          key={appointment.code} 
          className={`bg-white p-6 rounded-lg shadow-sm border ${
            appointment.status === 'cancelled' ? 'border-red-200' : 'border-gray-200'
          }`}
        >
          {editingCode === appointment.code ? (
            <AppointmentForm
              appointment={appointment}
              onSubmit={handleUpdate}
              onCancel={() => setEditingCode(null)}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {appointment.clientName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(appointment.status)}`}>
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Código: {appointment.code}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleWhatsAppClick(appointment)}
                    className="p-2 text-gray-400 hover:text-green-600 rounded-lg transition-colors flex items-center gap-2"
                    title="Enviar mensaje por WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setEditingCode(appointment.code)}
                    className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                    title="Editar cita"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(appointment.code)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Eliminar cita"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Teléfono:</span>{' '}
                  {appointment.phone}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Costo:</span>{' '}
                  {formatCurrency(appointment.reservationCost)}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Fecha:</span>{' '}
                  {formatDate(appointment.date)}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Hora:</span>{' '}
                  {formatTime(appointment.time)}
                </div>
              </div>

              {appointment.notes && (
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Nota:</span>{' '}
                  {appointment.notes}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}