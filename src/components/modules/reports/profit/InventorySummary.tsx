import React from 'react';
import { Product } from '../../../../types/products';
import { formatCurrency } from '../../../../utils/formatters';
import { useCategories } from '../../../../hooks/useCategories';

interface InventorySummaryProps {
  products: Product[];
}

export function InventorySummary({ products }: InventorySummaryProps) {
  const { categories } = useCategories();

  // Group products by category
  const inventoryByCategory = products.reduce((acc, product) => {
    const categoryId = product.category;
    if (!acc[categoryId]) {
      acc[categoryId] = {
        value: 0,
        items: 0,
      };
    }
    acc[categoryId].value += product.quantity * product.costPrice;
    acc[categoryId].items += product.quantity;
    return acc;
  }, {} as Record<string, { value: number; items: number }>);

  const totalValue = Object.values(inventoryByCategory)
    .reduce((sum, cat) => sum + cat.value, 0);

  const totalItems = Object.values(inventoryByCategory)
    .reduce((sum, cat) => sum + cat.items, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500">Valor Total</h4>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500">Total Artículos</h4>
          <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Por Categoría</h4>
        <div className="space-y-2">
          {categories.map((category) => {
            const categoryData = inventoryByCategory[category.id] || { value: 0, items: 0 };
            const percentage = (categoryData.value / totalValue) * 100 || 0;

            return (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{category.name}</span>
                    <span className="text-sm font-medium">{formatCurrency(categoryData.value)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}