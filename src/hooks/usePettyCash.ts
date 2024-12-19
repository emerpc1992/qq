import { useState, useEffect } from 'react';
import { PettyCashState, PettyCashTransaction } from '../types/pettyCash';
import { loadPettyCash, savePettyCash } from '../storage/pettyCash';
import { generateTransactionId } from '../utils/pettyCash';
import { USERS } from '../constants/users';

export function usePettyCash() {
  const [state, setState] = useState<PettyCashState>(() => {
    return loadPettyCash() || {
      balance: 0,
      transactions: [],
    };
  });

  useEffect(() => {
    savePettyCash(state);
  }, [state]);

  const addFunds = (amount: number, reason: string) => {
    const transaction: PettyCashTransaction = {
      id: generateTransactionId(),
      type: 'deposit',
      amount,
      reason,
      date: new Date().toISOString(),
    };

    setState(current => ({
      balance: current.balance + amount,
      transactions: [transaction, ...current.transactions],
    }));
  };

  const withdrawFunds = (amount: number, reason: string) => {
    if (amount > state.balance) {
      throw new Error('Fondos insuficientes');
    }

    const transaction: PettyCashTransaction = {
      id: generateTransactionId(),
      type: 'withdrawal',
      amount,
      reason,
      date: new Date().toISOString(),
    };

    setState(current => ({
      balance: current.balance - amount,
      transactions: [transaction, ...current.transactions],
    }));
  };

  const clearHistory = (adminPassword: string): boolean => {
    const adminUser = USERS.find(user => 
      user.role === 'admin' && user.password === adminPassword
    );

    if (!adminUser) {
      return false;
    }

    setState(current => ({
      ...current,
      transactions: [],
    }));
    return true;
  };

  return {
    balance: state.balance,
    transactions: state.transactions,
    addFunds,
    withdrawFunds,
    clearHistory,
  };
}