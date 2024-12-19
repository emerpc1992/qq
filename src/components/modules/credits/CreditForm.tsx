import React, { useState, useEffect } from 'react';
import { Credit, CreditProduct } from '../../../types/credits';
import { Product } from '../../../types/products';
import { generateCreditCode } from '../../../utils/credits';
import { formatCurrency } from '../../../utils/formatters';
import { Trash2 } from 'lucide-react';

interface CreditFormProps {
  products: Product[];
  onSubmit: (creditData: Omit<Credit, 'payments' | 'remainingAmount'>) => void;
  onCancel: () => void;
}

export function CreditForm({ products, onSubmit, onCancel }: CreditFormProps) {
  const [formData, setFormData] = useState<Omit<Credit, 'payments' | 'remainingAmount'>>({
    code: generateCreditCode(),
    clientName: '',
    clientPhone: '',
    products: [],
    dueDate: '',
    status: 'pending',
    totalAmount: 0,
    notes: '',
  });

  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customPrice, setCustomPrice] = useState<number | ''>('');

  // Update custom price when a new product is selected
  useEffect(() => {
    if (selectedProduct) {
      const product = products.find(p => p.code === selectedProduct);
      if (product) {
        setCustomPrice(product.salePrice);
      }
    } else {
      setCustomPrice('');
    }
  }, [selectedProduct, products]);

  const handleAddProduct = () => {
    const product = products.find(p => p.code === selectedProduct);
    if (!product || !customPrice) return;

    const newProduct: CreditProduct = {
      code: product.code,
      name: product.name,
      quantity,
      price: Number(customPrice),
      subtotal: Number(customPrice) * quantity,
    };

    const updatedProducts = [...formData.products, newProduct];
    const newTotalAmount = updatedProducts.reduce((sum, p) => sum + p.subtotal, 0);

    setFormData({
      ...formData,
      products: updatedProducts,
      totalAmount: newTotalAmount,
    });

    setSelectedProduct('');
    setQuantity(1);
    setCustomPrice('');
  };

  const handleRemoveProduct = (code: string) => {
    const updatedProducts = formData.products.filter(p => p.code !== code);
    const newTotalAmount = updatedProducts.reduce((sum, p) => sum + p.subtotal, 0);

    setFormData({
      ...formData,
      products: updatedProducts,
      totalAmount: newTotalAmount,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Código del Crédito
          </label>
          <input
            type="text"
            value={formData.code}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Vencimiento
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Cliente
          </label>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono del Cliente
          </label>
          <input
            type="tel"
            value={formData.clientPhone}
            onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Productos</h4>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Producto
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar producto</option>
              {products.map((product) => (
                <option key={product.code} value={product.code}>
                  {product.name}
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
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio Unitario
            </label>
            <input
              type="number"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value === '' ? '' : Number(e.target.value))}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          disabled={!selectedProduct || !customPrice}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
        >
          Agregar Producto
        </button>

        <div className="mt-4 space-y-2">
          {formData.products.map((product) => (
            <div
              key={`${product.code}-${product.price}`}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">
                  {product.quantity} x {formatCurrency(product.price)} = {formatCurrency(product.subtotal)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveProduct(product.code)}
                className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {formData.products.length > 0 && (
            <div className="flex justify-end pt-2 border-t">
              <p className="text-lg font-medium">
                Total: {formatCurrency(formData.totalAmount)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
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

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={formData.products.length === 0}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
        >
          Crear Crédito
        </button>
      </div>
    </form>
  );
}