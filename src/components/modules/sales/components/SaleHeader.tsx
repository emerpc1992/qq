import React from 'react';
import { Sale } from '../../../../types/sales';
import { PaymentInfo } from './PaymentInfo';
import { CommissionInfo } from './CommissionInfo';

interface SaleHeaderProps {
  sale: Sale;
}

export function SaleHeader({ sale }: SaleHeaderProps) {
  return (
    <div>
      <div className="flex items-center space-x-3">
        <h3 className="text-lg font-medium text-gray-900">
          {sale.client.name}
        </h3>
        <span className="text-sm text-gray-500">
          {new Date(sale.date).toLocaleDateString()}
        </span>
        {sale.status === 'cancelled' ? (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Cancelada
          </span>
        ) : (
          <PaymentInfo payment={sale.payment} />
        )}
      </div>
      {sale.staff && (
        <div className="mt-1">
          <CommissionInfo staff={sale.staff} />
        </div>
      )}
    </div>
  );
}