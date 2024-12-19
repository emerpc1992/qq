import React from 'react';
import { Sale } from '../../../../types/sales';

interface InvoiceInfoProps {
  sale: Sale;
}

export function InvoiceInfo({ sale }: InvoiceInfoProps) {
  return (
    <div className="text-center space-y-1 text-sm">
      <p><span className="font-medium">Cliente:</span> {sale.client.name}</p>
      {sale.client.phone && <p><span className="font-medium">Tel:</span> {sale.client.phone}</p>}
      <p><span className="font-medium">Fecha:</span> {new Date(sale.date).toLocaleDateString()}</p>
      <p><span className="font-medium">Hora:</span> {new Date(sale.date).toLocaleTimeString()}</p>
      <p><span className="font-medium">Pago:</span> {
        sale.payment.method === 'cash' ? 'Efectivo' :
        sale.payment.method === 'card' ? 'Tarjeta' : 'Transferencia'
      }</p>
      {sale.payment.reference && <p><span className="font-medium">Ref:</span> {sale.payment.reference}</p>}
      <p><span className="font-medium">Venta:</span> {sale.id}</p>
    </div>
  );
}