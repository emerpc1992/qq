import React, { useState } from 'react';
import { Product } from '../../../types/products';
import { Category } from '../../../types/categories';
import { generateProductCode } from '../../../utils/products';

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSubmit: (productData: Product) => void;
  onCancel: () => void;
}

export function ProductForm({ product, categories, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    code: product?.code || generateProductCode(),
    name: product?.name || '',
    quantity: product?.quantity || 0,
    costPrice: product?.costPrice || 0,
    salePrice: product?.salePrice || 0,
    category: product?.category || (categories[0]?.id || ''),
    lowStockAlert: product?.lowStockAlert || 5,
    notes: product?.notes || '',
    imageUrl: product?.imageUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Código del Producto
          </label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Producto
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            required
            min="0"
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alerta de Stock Bajo
          </label>
          <input
            type="number"
            value={formData.lowStockAlert}
            onChange={(e) => setFormData({ ...formData, lowStockAlert: Number(e.target.value) })}
            required
            min="0"
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio de Costo
          </label>
          <input
            type="number"
            value={formData.costPrice}
            onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio de Venta
          </label>
          <input
            type="number"
            value={formData.salePrice}
            onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de la Imagen (opcional)
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notas (opcional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          {product ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>
    </form>
  );
}