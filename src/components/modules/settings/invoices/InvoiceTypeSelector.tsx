import React from 'react';
import { Receipt, CreditCard } from 'lucide-react';

interface InvoiceTypeSelectorProps {
  value: 'sales' | 'credits';
  onChange: (type: 'sales' | 'credits') => void;
}

export function InvoiceTypeSelector({ value, onChange }: InvoiceTypeSelectorProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onChange('sales')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          value === 'sales'
            ? 'bg-blue-100 text-blue-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Receipt className="h-5 w-5" />
        <span>Ventas</span>
      </button>
      <button
        onClick={() => onChange('credits')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          value === 'credits'
            ? 'bg-blue-100 text-blue-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <CreditCard className="h-5 w-5" />
        <span>Créditos</span>
      </button>
    </div>
  );
}