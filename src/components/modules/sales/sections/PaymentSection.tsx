import React from 'react';
import { PaymentMethod } from '../../../../types/sales';

interface PaymentSectionProps {
  paymentMethod: PaymentMethod;
  reference: string;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onReferenceChange: (reference: string) => void;
}

export function PaymentSection({
  paymentMethod,
  reference,
  onPaymentMethodChange,
  onReferenceChange
}: PaymentSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Método de Pago
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => onPaymentMethodChange(e.target.value as PaymentMethod)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="cash">Efectivo</option>
          <option value="card">Tarjeta</option>
          <option value="transfer">Transferencia</option>
        </select>
      </div>

      {paymentMethod !== 'cash' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {paymentMethod === 'card' ? 'Últimos 4 dígitos' : 'Número de referencia'}
          </label>
          <input
            type="text"
            value={reference}
            onChange={(e) => onReferenceChange(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder={paymentMethod === 'card' ? '1234' : 'Ref-123456'}
          />
        </div>
      )}
    </div>
  );
}