import React, { useState } from 'react';
import { StaffSale } from '../../../../types/staff';
import { generateSaleId } from '../../../../utils/staff';

interface DiscountFormProps {
  onSubmit: (discount: StaffSale) => void;
  onCancel: () => void;
}

export function DiscountForm({ onSubmit, onCancel }: DiscountFormProps) {
  const [formData, setFormData] = useState({
    discount: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reason.trim()) {
      return;
    }
    
    const discount = Number(formData.discount);
    
    const sale: StaffSale = {
      id: generateSaleId(),
      date: new Date().toISOString(),
      amount: 0,
      commission: 0,
      discount,
      totalCommission: -discount, // Negative because it's a discount
      reason: formData.reason.trim(),
    };

    onSubmit(sale);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descuento
        </label>
        <input
          type="number"
          value={formData.discount}
          onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
          required
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Motivo del Descuento
        </label>
        <textarea
          value={formData.reason}
          onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
          required
          rows={3}
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingrese el motivo del descuento..."
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
          Agregar Descuento
        </button>
      </div>
    </form>
  );
}