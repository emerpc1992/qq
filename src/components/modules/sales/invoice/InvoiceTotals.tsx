import React from 'react';
import { Sale } from '../../../../types/sales';
import { formatCurrency } from '../../../../utils/formatters';

interface InvoiceTotalsProps {
  sale: Sale;
  totalDiscount: number;
}

export function InvoiceTotals({ sale, totalDiscount }: InvoiceTotalsProps) {
  return (
    <div className="mt-4 space-y-1 text-sm">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>{formatCurrency(sale.total + totalDiscount)}</span>
      </div>
      {totalDiscount > 0 && (
        <div className="flex justify-between">
          <span>Descuento:</span>
          <span>-{formatCurrency(totalDiscount)}</span>
        </div>
      )}
      <div className="flex justify-between font-bold text-base pt-2">
        <span>TOTAL:</span>
        <span>{formatCurrency(sale.total)}</span>
      </div>
    </div>
  );
}