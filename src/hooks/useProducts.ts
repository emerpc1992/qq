import { useState, useEffect } from 'react';
import { Product } from '../types/products';
import { loadProducts, saveProducts } from '../storage/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => {
    return loadProducts() || [];
  });

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(current => [...current, product]);
  };

  const updateProduct = (code: string, productData: Product) => {
    setProducts(current =>
      current.map(product =>
        product.code === code ? productData : product
      )
    );
  };

  const deleteProduct = (code: string) => {
    setProducts(current =>
      current.filter(product => product.code !== code)
    );
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}