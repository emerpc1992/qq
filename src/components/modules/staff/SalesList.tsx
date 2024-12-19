import React from 'react';
import { StaffSale } from '../../../types/staff';
import { formatCurrency } from '../../../utils/formatters';

interface SalesListProps {
  sales: StaffSale[];
}

export function SalesList({ sales }: SalesListProps) {
  const isPaidTransaction = (sale: StaffSale) => {
    return sale.reason?.toLowerCase().includes('pago de comisi') || sale.totalCommission < 0;
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Historial de Ventas</h4>
      <div className="grid gap-3">
        {sales.map((sale) => {
          const isPaid = isPaidTransaction(sale);
          
          return (
            <div
              key={sale.id}
              className={`p-4 rounded-lg ${
                isPaid ? 'bg-red-50' : 'bg-gray-50'
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Fecha:</span>{' '}
                  {new Date(sale.date).toLocaleDateString()}
                </div>
                {sale.amount !== 0 && (
                  <div className={`text-sm ${isPaid ? 'text-red-600' : ''}`}>
                    <span className="font-medium text-gray-700">Venta:</span>{' '}
                    {formatCurrency(Math.abs(sale.amount))}
                  </div>
                )}
                {sale.commission > 0 && (
                  <div className={`text-sm ${isPaid ? 'text-red-600' : ''}`}>
                    <span className="font-medium text-gray-700">Comisión:</span>{' '}
                    {sale.commission}%
                  </div>
                )}
                {sale.discount > 0 && (
                  <div className={`text-sm ${isPaid ? 'text-red-600' : ''}`}>
                    <span className="font-medium text-gray-700">Descuento:</span>{' '}
                    {formatCurrency(sale.discount)}
                  </div>
                )}
              </div>
              {sale.reason && (
                <div className={`mt-2 text-sm ${isPaid ? 'text-red-600' : ''}`}>
                  <span className="font-medium text-gray-700">Motivo:</span>{' '}
                  {sale.reason}
                </div>
              )}
              <div className={`mt-2 text-sm font-medium text-right ${
                isPaid ? 'text-red-600' : ''
              }`}>
                <span className="text-gray-700">Total:</span>{' '}
                {formatCurrency(Math.abs(sale.totalCommission))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}