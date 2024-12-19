import React, { useState } from 'react';
import { StaffSale } from '../../../types/staff';
import { generateSaleId, calculateTotalCommission } from '../../../utils/staff';

interface SaleFormProps {
  onSubmit: (sale: StaffSale) => void;
  onCancel: () => void;
}

export function SaleForm({ onSubmit, onCancel }: SaleFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    commission: '',
    discount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = Number(formData.amount);
    const commission = Number(formData.commission);
    const discount = Number(formData.discount);
    
    const sale: StaffSale = {
      id: generateSaleId(),
      date: new Date().toISOString(),
      amount,
      commission,
      discount,
      totalCommission: calculateTotalCommission(amount, commission, discount),
    };

    onSubmit(sale);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monto de Venta
        </label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comisión (%)
        </label>
        <input
          type="number"
          value={formData.commission}
          onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
          required
          min="0"
          max="100"
          step="0.1"
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descuento
        </label>
        <input
          type="number"
          value={formData.discount}
          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
          required
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
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
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Registrar Venta
        </button>
      </div>
    </form>
  );
}