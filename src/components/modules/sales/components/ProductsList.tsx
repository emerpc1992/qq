import React from 'react';
import { SaleProduct } from '../../../../types/sales';
import { formatCurrency } from '../../../../utils/formatters';

interface ProductsListProps {
  products: SaleProduct[];
}

export function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-medium text-gray-700">Productos:</h4>
      {products.map((product, index) => (
        <div key={index} className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/48?text=No+Image';
                }}
              />
            )}
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-600">
                {product.quantity}x {formatCurrency(product.salePrice)}
              </p>
            </div>
          </div>
          <span className="font-medium">{formatCurrency(product.subtotal)}</span>
        </div>
      ))}
    </div>
  );
}