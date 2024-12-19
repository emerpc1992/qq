import { Appointment } from '../types/appointments';

const STORAGE_KEY = 'masterFactu:appointments';

export function saveAppointments(appointments: Appointment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error('Error saving appointments:', error);
  }
}

export function loadAppointments(): Appointment[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading appointments:', error);
    return null;
  }
}