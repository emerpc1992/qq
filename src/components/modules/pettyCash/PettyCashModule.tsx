import React, { useState } from 'react';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { usePettyCash } from '../../../hooks/usePettyCash';
import { formatCurrency } from '../../../utils/formatters';
import { Plus, Minus } from 'lucide-react';
import { AdminPasswordModal } from '../shared/AdminPasswordModal';

export function PettyCashModule() {
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { balance, transactions, addFunds, withdrawFunds, clearHistory } = usePettyCash();

  const handleClearHistory = (password: string) => {
    const success = clearHistory(password);
    if (success) {
      setIsClearing(false);
      setPasswordError('');
    } else {
      setPasswordError('Contraseña incorrecta');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Caja Chica</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsDepositing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Agregar Fondos</span>
          </button>
          <button
            onClick={() => setIsWithdrawing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Minus className="h-5 w-5" />
            <span>Retirar Fondos</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Balance Actual</h3>
        <p className="text-3xl font-bold text-gray-900">{formatCurrency(balance)}</p>
      </div>

      {(isDepositing || isWithdrawing) && (
        <TransactionForm
          type={isDepositing ? 'deposit' : 'withdrawal'}
          maxAmount={isWithdrawing ? balance : undefined}
          onSubmit={(amount, reason) => {
            if (isDepositing) {
              addFunds(amount, reason);
            } else {
              withdrawFunds(amount, reason);
            }
            setIsDepositing(false);
            setIsWithdrawing(false);
          }}
          onCancel={() => {
            setIsDepositing(false);
            setIsWithdrawing(false);
          }}
        />
      )}

      <TransactionList 
        transactions={transactions}
        onClearHistory={() => setIsClearing(true)}
      />

      {isClearing && (
        <AdminPasswordModal
          onConfirm={handleClearHistory}
          onCancel={() => {
            setIsClearing(false);
            setPasswordError('');
          }}
          error={passwordError}
        />
      )}
    </div>
  );
}