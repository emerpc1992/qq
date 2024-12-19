import { Client } from './clients';
import { Product } from './products';
import { Staff } from './staff';

export type PaymentMethod = 'cash' | 'card' | 'transfer';
export type SaleStatus = 'active' | 'cancelled';

export interface Sale {
  id: string;
  date: string;
  client: Client;
  products: SaleProduct[];
  total: number;
  notes?: string;
  staff?: {
    member: Staff;
    commission: number;
    commissionAmount: number;
  };
  payment: {
    method: PaymentMethod;
    reference?: string;
  };
  status?: SaleStatus;
  cancellationReason?: string;
}

export interface SaleProduct extends Omit<Product, 'quantity'> {
  quantity: number;
  subtotal: number;
  originalPrice?: number;
  discount?: number;
}