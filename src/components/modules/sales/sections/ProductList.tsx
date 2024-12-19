import React from 'react';
import { Trash2 } from 'lucide-react';
import { SaleProduct } from '../../../../types/sales';
import { formatCurrency } from '../../../../utils/formatters';

interface ProductListProps {
  products: SaleProduct[];
  onUpdateProduct: (product: SaleProduct) => void;
  onRemoveProduct: (code: string) => void;
}

export function ProductList({ products, onUpdateProduct, onRemoveProduct }: ProductListProps) {
  const handleUpdateQuantity = (product: SaleProduct, quantity: number) => {
    if (quantity <= 0) {
      onRemoveProduct(product.code);
      return;
    }

    const effectivePrice = product.originalPrice! - (product.discount || 0);
    onUpdateProduct({
      ...product,
      quantity,
      subtotal: quantity * effectivePrice
    });
  };

  const handleUpdatePrice = (product: SaleProduct, price: number) => {
    onUpdateProduct({
      ...product,
      originalPrice: price,
      salePrice: price,
      discount: 0,
      subtotal: product.quantity * price
    });
  };

  const handleUpdateDiscount = (product: SaleProduct, discount: number) => {
    const effectivePrice = Math.max(0, product.originalPrice! - discount);
    onUpdateProduct({
      ...product,
      discount,
      subtotal: product.quantity * effectivePrice
    });
  };

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.code} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
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
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.code}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-24">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Cantidad
              </label>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleUpdateQuantity(product, parseInt(e.target.value) || 0)}
                min="1"
                className="w-full px-2 py-1 text-sm border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-32">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Precio
              </label>
              <input
                type="number"
                value={product.originalPrice}
                onChange={(e) => handleUpdatePrice(product, parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                className="w-full px-2 py-1 text-sm border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-32">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Descuento
              </label>
              <input
                type="number"
                value={product.discount || 0}
                onChange={(e) => handleUpdateDiscount(product, parseFloat(e.target.value) || 0)}
                min="0"
                max={product.originalPrice}
                step="0.01"
                className="w-full px-2 py-1 text-sm border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-32 text-right">
              <div className="text-xs font-medium text-gray-700 mb-1">
                Subtotal
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(product.subtotal)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onRemoveProduct(product.code)}
              className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}