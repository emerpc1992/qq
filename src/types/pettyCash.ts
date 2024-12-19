export type TransactionType = 'deposit' | 'withdrawal';

export interface PettyCashTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  reason: string;
  date: string;
}

export interface PettyCashState {
  balance: number;
  transactions: PettyCashTransaction[];
}