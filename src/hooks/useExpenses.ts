import { useState, useEffect } from 'react';
import { Expense } from '../types/expenses';
import { loadExpenses, saveExpenses } from '../storage/expenses';
import { generateExpenseId } from '../utils/expenses';
import { USERS } from '../constants/users';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    return loadExpenses() || [];
  });

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (expenseData: Omit<Expense, 'id' | 'status'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateExpenseId(),
      status: 'active',
    };
    setExpenses(current => [...current, newExpense]);
  };

  const cancelExpense = (id: string, cancellationReason: string) => {
    setExpenses(current =>
      current.map(expense =>
        expense.id === id
          ? { ...expense, status: 'cancelled', cancellationReason }
          : expense
      )
    );
  };

  const deleteExpense = (id: string, adminPassword: string): boolean => {
    const adminUser = USERS.find(user => 
      user.role === 'admin' && user.password === adminPassword
    );

    if (!adminUser) {
      return false;
    }

    setExpenses(current =>
      current.filter(expense => expense.id !== id)
    );
    return true;
  };

  return {
    expenses,
    addExpense,
    cancelExpense,
    deleteExpense,
  };
}