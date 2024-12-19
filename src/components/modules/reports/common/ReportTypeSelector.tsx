import React from 'react';
import { 
  BarChart3, 
  DollarSign, 
  Wallet, 
  Users, 
  CreditCard, 
  PiggyBank,
  Coins
} from 'lucide-react';

const REPORT_TYPES = [
  { id: 'sales', label: 'Ventas', icon: <DollarSign className="h-5 w-5" /> },
  { id: 'expenses', label: 'Gastos', icon: <Wallet className="h-5 w-5" /> },
  { id: 'credits', label: 'Créditos', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'cashRegister', label: 'Dinero en Caja', icon: <Coins className="h-5 w-5" /> },
  { id: 'pettyCash', label: 'Caja Chica', icon: <PiggyBank className="h-5 w-5" /> },
  { id: 'profit', label: 'Ganancias', icon: <BarChart3 className="h-5 w-5" /> },
  { id: 'staff', label: 'Comisiones', icon: <Users className="h-5 w-5" /> },
] as const;

interface ReportTypeSelectorProps {
  value: string;
  onChange: (type: any) => void;
}

export function ReportTypeSelector({ value, onChange }: ReportTypeSelectorProps) {
  return (
    <div className="flex space-x-2">
      {REPORT_TYPES.map((type) => (
        <button
          key={type.id}
          onClick={() => onChange(type.id)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
            value === type.id
              ? 'bg-blue-100 text-blue-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {type.icon}
          <span>{type.label}</span>
        </button>
      ))}
    </div>
  );
}