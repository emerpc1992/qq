import React from 'react';
import { Sale } from '../../../../types/sales';
import { InvoiceHeader } from './InvoiceHeader';
import { InvoiceInfo } from './InvoiceInfo';
import { InvoiceItems } from './InvoiceItems';
import { InvoiceTotals } from './InvoiceTotals';
import { InvoiceFooter } from './InvoiceFooter';

interface ThermalInvoiceProps {
  sale: Sale;
  businessName: string;
  invoiceNumber: string;
}

export function ThermalInvoice({ sale, businessName, invoiceNumber }: ThermalInvoiceProps) {
  const totalDiscount = sale.products.reduce((sum, product) => sum + (product.discount || 0), 0);

  return (
    <div id="printable-invoice" className="p-2">
      <InvoiceHeader
        businessName={businessName}
        invoiceNumber={invoiceNumber}
      />
      <div className="border-t border-dashed my-2" />
      <InvoiceInfo sale={sale} />
      <div className="border-t border-dashed my-2" />
      <InvoiceItems products={sale.products} />
      <InvoiceTotals
        sale={sale}
        totalDiscount={totalDiscount}
      />
      <div className="border-t border-dashed my-2" />
      <InvoiceFooter />
    </div>
  );
}