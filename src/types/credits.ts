export interface Credit {
  code: string;
  clientName: string;
  clientPhone: string;
  products: CreditProduct[];
  dueDate: string;
  status: 'pending' | 'completed';
  totalAmount: number;
  notes?: string;
  payments: Payment[];
}

export interface CreditProduct {
  code: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export type PaymentMethod = 'cash' | 'card' | 'transfer';
export type PaymentStatus = 'active' | 'cancelled';

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  status: PaymentStatus;
  cancellationReason?: string;
}