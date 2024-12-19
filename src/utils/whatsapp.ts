import { Appointment } from '../types/appointments';
import { CreditProduct } from '../types/credits';
import { formatCurrency } from './formatters';

interface CreditMessageData {
  clientName: string;
  dueDate: string;
  amount: number;
  products: CreditProduct[];
}

export function generateClientWhatsAppMessage(clientName: string): string {
  const message = `¡Hola ${clientName}! 👋

Gracias por ser nuestro cliente. Estamos aquí para ayudarte en lo que necesites.

¿En qué podemos servirte hoy? 🤝`;

  return encodeURIComponent(message);
}

export function generateWhatsAppMessage(data: Appointment | CreditMessageData): string {
  if ('reservationCost' in data) {
    // It's an appointment
    return generateAppointmentMessage(data);
  } else {
    // It's a credit
    return generateCreditMessage(data);
  }
}

function generateAppointmentMessage(appointment: Appointment): string {
  const message = `¡Gracias por agendar tu cita con nosotros! 🙏

Detalles de tu cita:
📅 Fecha: ${appointment.date}
⏰ Hora: ${appointment.time}
💰 Costo de reserva: $${appointment.reservationCost}

Estamos encantados de poder atenderte y de ofrecerte la mejor experiencia posible. Te esperamos en el día y hora acordados.

Si necesitas cualquier cosa antes de la cita, no dudes en contactarnos. 😊`;

  return encodeURIComponent(message);
}

function generateCreditMessage(data: CreditMessageData): string {
  const productsDetail = data.products
    .map(p => `- ${p.name} (${p.quantity}x) - ${formatCurrency(p.subtotal)}`)
    .join('\n');

  const message = `¡Gracias por elegirnos para tu financiamiento! 🙏

Nos complace informarte que tu crédito ha sido aprobado y ya está disponible para que lo utilices de la manera que necesites. Estamos aquí para brindarte todo el apoyo que requieras durante este proceso.

Detalles del crédito:
👤 Cliente: ${data.clientName}
📅 Fecha de vencimiento: ${new Date(data.dueDate).toLocaleDateString()}
💰 Monto total: ${formatCurrency(data.amount)}

Productos financiados:
${productsDetail}

Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. ¡Estamos para servirte! 😊`;

  return encodeURIComponent(message);
}

export function getWhatsAppLink(phone: string, message: string): string {
  // Remove any non-numeric characters from phone number
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${message}`;
}