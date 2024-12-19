import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Product } from '../../../../types/products';
import { SaleProduct } from '../../../../types/sales';
import { formatCurrency } from '../../../../utils/formatters';

interface ProductSearchProps {
  products: Product[];
  selectedProducts: SaleProduct[];
  onProductSelect: (product: Product) => void;
}

export function ProductSearch({ products, selectedProducts, onProductSelect }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.code.toLowerCase().includes(searchLower) ||
      product.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Buscar Producto
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Buscar por nombre o código..."
        />
      </div>
      {searchTerm && filteredProducts.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border max-h-60 overflow-auto">
          {filteredProducts.map((product) => (
            <button
              key={product.code}
              type="button"
              onClick={() => {
                onProductSelect(product);
                setSearchTerm('');
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/40?text=No+Image';
                  }}
                />
              )}
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">
                  {product.code} - {formatCurrency(product.salePrice)}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}