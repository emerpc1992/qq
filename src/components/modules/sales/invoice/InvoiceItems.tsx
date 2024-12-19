import React from 'react';
import { SaleProduct } from '../../../../types/sales';
import { formatCurrency } from '../../../../utils/formatters';

interface InvoiceItemsProps {
  products: SaleProduct[];
}

export function InvoiceItems({ products }: InvoiceItemsProps) {
  return (
    <div className="space-y-3">
      {products.map((product, index) => (
        <div key={`${index}-${product.code}`} className="text-sm">
          <div className="text-center font-bold">{product.name}</div>
          <div className="flex justify-between text-gray-600">
            <span>{product.quantity} x {formatCurrency(product.salePrice)}</span>
            <span>{formatCurrency(product.subtotal)}</span>
          </div>
          {product.discount && product.discount > 0 && (
            <div className="flex justify-between text-gray-500 text-xs">
              <span>Descuento</span>
              <span>-{formatCurrency(product.discount)}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}