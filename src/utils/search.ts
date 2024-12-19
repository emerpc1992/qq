import { Appointment, AppointmentStatus } from '../types/appointments';

export function filterAppointments(
  appointments: Appointment[],
  searchTerm: string,
  statusFilter: AppointmentStatus | 'all'
): Appointment[] {
  return appointments.filter((appointment) => {
    // Status filter
    if (statusFilter !== 'all' && appointment.status !== statusFilter) {
      return false;
    }

    // Search term filter
    if (searchTerm.trim()) {
      const normalizedSearch = searchTerm.toLowerCase().trim();
      const matchesName = appointment.clientName.toLowerCase().includes(normalizedSearch);
      const matchesCode = appointment.code.toLowerCase().includes(normalizedSearch);
      return matchesName || matchesCode;
    }

    return true;
  });
}