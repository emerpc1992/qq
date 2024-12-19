import { Payment } from '../types/credits';

export function generatePaymentId(): string {
  const prefix = 'PAY';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function calculateRemainingAmount(totalAmount: number, payments: Payment[]): number {
  if (!payments || payments.length === 0) return totalAmount;
  
  const activePayments = payments.filter(p => p.status === 'active');
  const totalPaid = activePayments.reduce((sum, payment) => sum + payment.amount, 0);
  return Math.max(0, totalAmount - totalPaid);
}