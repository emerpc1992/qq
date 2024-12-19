import React from 'react';
import { Banknote, CreditCard, ArrowUpRight } from 'lucide-react';
import { PaymentMethod } from '../../../../types/sales';

interface PaymentInfoProps {
  payment: {
    method: PaymentMethod;
    reference?: string;
  };
}

export function PaymentInfo({ payment }: PaymentInfoProps) {
  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'cash':
        return <Banknote className="h-4 w-4 text-green-600" />;
      case 'card':
        return <CreditCard className="h-4 w-4 text-blue-600" />;
      case 'transfer':
        return <ArrowUpRight className="h-4 w-4 text-purple-600" />;
    }
  };

  return (
    <div className="flex items-center space-x-1 text-sm text-gray-600">
      {getPaymentIcon(payment.method)}
      <span>
        {payment.method === 'cash' ? 'Efectivo' : 
         payment.method === 'card' ? 'Tarjeta' : 'Transferencia'}
      </span>
      {payment.reference && (
        <span className="text-gray-500">
          ({payment.reference})
        </span>
      )}
    </div>
  );
}