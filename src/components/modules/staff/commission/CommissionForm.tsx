import React, { useState } from 'react';
import { StaffSale } from '../../../../types/staff';
import { generateSaleId } from '../../../../utils/staff';

interface CommissionFormProps {
  onSubmit: (commission: StaffSale) => void;
  onCancel: () => void;
}

export function CommissionForm({ onSubmit, onCancel }: CommissionFormProps) {
  const [formData, setFormData] = useState({
    commission: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const commission = Number(formData.commission);
    
    const sale: StaffSale = {
      id: generateSaleId(),
      date: new Date().toISOString(),
      amount: 0,
      commission,
      discount: 0,
      totalCommission: commission,
    };

    onSubmit(sale);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          Agregar Comisión
        </button>
      </div>
    </form>
  );
}