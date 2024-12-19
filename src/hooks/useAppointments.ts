import { useState, useEffect } from 'react';
import { Appointment } from '../types/appointments';
import { loadAppointments, saveAppointments } from '../storage/appointments';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    return loadAppointments() || [];
  });

  useEffect(() => {
    saveAppointments(appointments);
  }, [appointments]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments(current => [...current, appointment]);
  };

  const updateAppointment = (code: string, updatedAppointment: Appointment) => {
    setAppointments(current =>
      current.map(appointment =>
        appointment.code === code ? updatedAppointment : appointment
      )
    );
  };

  const deleteAppointment = (code: string) => {
    setAppointments(current =>
      current.filter(appointment => appointment.code !== code)
    );
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };
}