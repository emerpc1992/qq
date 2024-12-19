import React from 'react';

interface InvoiceHeaderProps {
  businessName: string;
  invoiceNumber: string;
}

export function InvoiceHeader({ businessName, invoiceNumber }: InvoiceHeaderProps) {
  return (
    <div className="text-center mb-4">
      <h1 className="text-xl font-bold mb-1">{businessName}</h1>
      <p className="text-sm">Comprobante de Venta</p>
      <p className="text-sm">N° {invoiceNumber}</p>
    </div>
  );
}