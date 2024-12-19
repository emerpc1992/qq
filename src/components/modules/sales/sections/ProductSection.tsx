import React from 'react';
import { Product } from '../../../../types/products';
import { SaleProduct } from '../../../../types/sales';
import { ProductSearch } from './ProductSearch';
import { ProductList } from './ProductList';

interface ProductSectionProps {
  products: Product[];
  selectedProducts: SaleProduct[];
  onProductsChange: (products: SaleProduct[]) => void;
}

export function ProductSection({ products, selectedProducts, onProductsChange }: ProductSectionProps) {
  const handleAddProduct = (product: Product) => {
    const existingProduct = selectedProducts.find(p => p.code === product.code);
    if (existingProduct) {
      onProductsChange(
        selectedProducts.map(p =>
          p.code === product.code
            ? { ...p, quantity: p.quantity + 1, subtotal: (p.quantity + 1) * p.salePrice }
            : p
        )
      );
    } else {
      onProductsChange([
        ...selectedProducts,
        {
          ...product,
          quantity: 1,
          subtotal: product.salePrice,
          originalPrice: product.salePrice,
          discount: 0
        }
      ]);
    }
  };

  const handleUpdateProduct = (updatedProduct: SaleProduct) => {
    onProductsChange(
      selectedProducts.map(p => 
        p.code === updatedProduct.code ? updatedProduct : p
      )
    );
  };

  const handleRemoveProduct = (code: string) => {
    onProductsChange(selectedProducts.filter(p => p.code !== code));
  };

  return (
    <div className="space-y-4">
      <ProductSearch
        products={products}
        selectedProducts={selectedProducts}
        onProductSelect={handleAddProduct}
      />

      <ProductList
        products={selectedProducts}
        onUpdateProduct={handleUpdateProduct}
        onRemoveProduct={handleRemoveProduct}
      />
    </div>
  );
}