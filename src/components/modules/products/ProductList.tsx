import React, { useState } from 'react';
import { Product } from '../../../types/products';
import { Category } from '../../../types/categories';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface ProductListProps {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (code: string) => void;
}

export function ProductList({ products, categories, onEdit, onDelete }: ProductListProps) {
  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Sin categoría';
  };

  const getStockStatus = (product: Product) => {
    if (product.quantity <= 0) {
      return { label: 'Sin Stock', class: 'bg-red-100 text-red-800 border-red-200' };
    }
    if (product.quantity <= product.lowStockAlert) {
      return { label: 'Stock Bajo', class: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    }
    return { label: 'En Stock', class: 'bg-green-100 text-green-800 border-green-200' };
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay productos registrados</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {products.map((product) => {
        const stockStatus = getStockStatus(product);
        
        return (
          <div key={product.code} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/80?text=No+Image';
                    }}
                  />
                )}
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${stockStatus.class}`}>
                      {stockStatus.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Código: {product.code}</p>
                  <p className="text-sm text-gray-500">
                    Categoría: {getCategoryName(product.category)}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                  title="Editar producto"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(product.code)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                  title="Eliminar producto"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Cantidad:</span>{' '}
                {product.quantity} unidades
              </div>
              <div>
                <span className="font-medium text-gray-700">Precio de Costo:</span>{' '}
                {formatCurrency(product.costPrice)}
              </div>
              <div>
                <span className="font-medium text-gray-700">Precio de Venta:</span>{' '}
                {formatCurrency(product.salePrice)}
              </div>
            </div>

            {product.notes && (
              <div className="mt-2 text-sm">
                <span className="font-medium text-gray-700">Notas:</span>{' '}
                {product.notes}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}