export type ExpenseStatus = 'active' | 'cancelled';

export interface Expense {
  id: string;
  category: string;
  reason: string;
  amount: number;
  notes?: string;
  status: ExpenseStatus;
  cancellationReason?: string;
  date: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
}