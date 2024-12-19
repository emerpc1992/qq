import React, { useState } from 'react';
import { Payment, PaymentMethod } from '../../../../types/credits';
import { generatePaymentId } from '../../../../utils/payments';
import { formatCurrency } from '../../../../utils/formatters';

interface PaymentFormProps {
  maxAmount: number;
  onSubmit: (payment: Payment) => void;
  onCancel: () => void;
}

export function PaymentForm({ maxAmount, onSubmit, onCancel }: PaymentFormProps) {
  const [formData, setFormData] = useState<Omit<Payment, 'id' | 'status'>>({
    date: new Date().toISOString().split('T')[0],
    amount: maxAmount,
    method: 'cash' as PaymentMethod,
    reference: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0 || formData.amount > maxAmount) return;

    const payment: Payment = {
      ...formData,
      id: generatePaymentId(),
      status: 'active',
    };
    onSubmit(payment);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      // Ensure the amount doesn't exceed the remaining balance
      const newAmount = Math.min(value, maxAmount);
      setFormData(prev => ({ ...prev, amount: newAmount }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monto a Pagar
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.amount}
            onChange={handleAmountChange}
            required
            min="0.01"
            max={maxAmount}
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="mt-1 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Saldo pendiente: {formatCurrency(maxAmount)}</span>
              {formData.amount > maxAmount && (
                <span className="text-red-600">El monto no puede exceder el saldo pendiente</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Método de Pago
        </label>
        <select
          value={formData.method}
          onChange={(e) => setFormData(prev => ({ ...prev, method: e.target.value as PaymentMethod }))}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="cash">Efectivo</option>
          <option value="card">Tarjeta</option>
          <option value="transfer">Transferencia</option>
        </select>
      </div>

      {formData.method !== 'cash' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Referencia
          </label>
          <input
            type="text"
            value={formData.reference}
            onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder={formData.method === 'card' ? 'Últimos 4 dígitos' : 'Número de referencia'}
          />
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={formData.amount <= 0 || formData.amount > maxAmount}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
        >
          Registrar Pago
        </button>
      </div>
    </form>
  );
}