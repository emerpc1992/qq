export type AppointmentStatus = 'pending' | 'completed' | 'cancelled';

export interface Appointment {
  code: string;
  clientName: string;
  phone: string;
  reservationCost: number;
  date: string;
  time: string;
  notes: string;
  status: AppointmentStatus;
}