import React, { useState } from 'react';
import { CategoryManagement } from './categories/CategoryManagement';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';
import { Plus } from 'lucide-react';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import { Product } from '../../../types/products';

export function ProductsModule() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();

  const handleCreateProduct = (productData: Product) => {
    addProduct(productData);
    setIsCreating(false);
  };

  const handleUpdateProduct = (productData: Product) => {
    updateProduct(productData.code, productData);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Productos</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      <CategoryManagement
        categories={categories}
        onAddCategory={addCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
      />

      {(isCreating || editingProduct) && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          onCancel={() => {
            setIsCreating(false);
            setEditingProduct(null);
          }}
        />
      )}

      <ProductList
        products={products}
        categories={categories}
        onEdit={setEditingProduct}
        onDelete={deleteProduct}
      />
    </div>
  );
}