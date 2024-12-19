import React, { useState } from 'react';
import { TransactionType } from '../../../types/pettyCash';
import { formatCurrency } from '../../../utils/formatters';

interface TransactionFormProps {
  type: TransactionType;
  maxAmount?: number;
  onSubmit: (amount: number, reason: string) => void;
  onCancel: () => void;
}

export function TransactionForm({ type, maxAmount, onSubmit, onCancel }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(formData.amount);
    if (amount <= 0) return;
    if (maxAmount !== undefined && amount > maxAmount) return;
    onSubmit(amount, formData.reason.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        {type === 'deposit' ? 'Agregar Fondos' : 'Retirar Fondos'}
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monto
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            min="0.01"
            step="0.01"
            max={maxAmount}
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {maxAmount !== undefined && (
            <div className="mt-1 text-sm text-gray-500">
              Máximo disponible: {formatCurrency(maxAmount)}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Motivo
        </label>
        <textarea
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
          rows={3}
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
            type === 'deposit'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {type === 'deposit' ? 'Agregar' : 'Retirar'}
        </button>
      </div>
    </form>
  );
}