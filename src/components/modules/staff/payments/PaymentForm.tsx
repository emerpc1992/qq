import React, { useState } from 'react';
import { StaffSale } from '../../../../types/staff';
import { generateSaleId } from '../../../../utils/staff';
import { formatCurrency } from '../../../../utils/formatters';

interface PaymentFormProps {
  maxAmount: number;
  onSubmit: (payment: StaffSale) => void;
  onCancel: () => void;
}

export function PaymentForm({ maxAmount, onSubmit, onCancel }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    amount: maxAmount.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = Number(formData.amount);
    if (amount <= 0 || amount > maxAmount) return;
    
    const payment: StaffSale = {
      id: generateSaleId(),
      date: new Date().toISOString(),
      amount: 0, // Reset amount
      commission: 0,
      discount: 0,
      totalCommission: -amount, // Negative because it's a payment
      reason: 'Pago de comisión',
    };

    onSubmit(payment);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monto a Pagar
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            min="0.01"
            max={maxAmount}
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="mt-1 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Comisión disponible: {formatCurrency(maxAmount)}</span>
              {Number(formData.amount) > maxAmount && (
                <span className="text-red-600">El monto no puede exceder la comisión disponible</span>
              )}
            </div>
          </div>
        </div>
      </div>

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
          disabled={Number(formData.amount) <= 0 || Number(formData.amount) > maxAmount}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
        >
          Realizar Pago
        </button>
      </div>
    </form>
  );
}