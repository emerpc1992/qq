import { Category } from './categories';

export interface Product {
  code: string;
  name: string;
  quantity: number;
  costPrice: number;
  salePrice: number;
  category: string;
  lowStockAlert: number;
  notes?: string;
  imageUrl?: string;
}

export interface ProductFormData extends Omit<Product, 'code'> {
  code?: string;
}