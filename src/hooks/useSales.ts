import { useState, useEffect } from 'react';
import { Sale } from '../types/sales';
import { loadSales, saveSales } from '../storage/sales';
import { migrateSaleData } from '../utils/sales';
import { USERS } from '../constants/users';
import { useProducts } from './useProducts';
import { useStaff } from './useStaff';
import { validateStockAvailability } from '../utils/inventory';

export function useSales() {
  const [sales, setSales] = useState<Sale[]>(() => {
    const savedSales = loadSales() || [];
    return savedSales.map(sale => migrateSaleData(sale));
  });

  const { products, updateProduct } = useProducts();
  const { addSaleToStaff, removeSaleFromStaff } = useStaff();

  useEffect(() => {
    saveSales(sales);
  }, [sales]);

  const updateInventory = (sale: Sale, isAddition: boolean) => {
    sale.products.forEach(saleProduct => {
      const product = products.find(p => p.code === saleProduct.code);
      if (product) {
        const newQuantity = isAddition
          ? product.quantity + saleProduct.quantity
          : product.quantity - saleProduct.quantity;

        updateProduct(product.code, {
          ...product,
          quantity: Math.max(0, newQuantity)
        });
      }
    });
  };

  const addSale = (sale: Sale) => {
    // Validate stock availability
    if (!validateStockAvailability(products, sale.products)) {
      throw new Error('No hay suficiente stock disponible para algunos productos');
    }

    // Update inventory (decrease stock)
    updateInventory(sale, false);

    // Add staff commission if applicable
    if (sale.staff) {
      addSaleToStaff(sale);
    }

    // Add the sale
    setSales(current => [migrateSaleData(sale), ...current]);
  };

  const cancelSale = (id: string, reason: string) => {
    setSales(current => {
      const saleToCancel = current.find(s => s.id === id);
      if (saleToCancel && saleToCancel.status !== 'cancelled') {
        // Restore inventory for cancelled sale
        updateInventory(saleToCancel, true);
        // Remove commission from staff member
        removeSaleFromStaff(id);
      }

      return current.map(sale =>
        sale.id === id
          ? { ...sale, status: 'cancelled', cancellationReason: reason }
          : sale
      );
    });
  };

  const deleteSale = (id: string, adminPassword: string): boolean => {
    const adminUser = USERS.find(user => 
      user.role === 'admin' && user.password === adminPassword
    );

    if (!adminUser) {
      return false;
    }

    setSales(current => {
      const saleToDelete = current.find(s => s.id === id);
      if (saleToDelete && saleToDelete.status !== 'cancelled') {
        // Restore inventory for deleted active sale
        updateInventory(saleToDelete, true);
        // Remove commission from staff member
        removeSaleFromStaff(id);
      }

      return current.filter(sale => sale.id !== id);
    });
    return true;
  };

  const clearHistory = (adminPassword: string): boolean => {
    const adminUser = USERS.find(user => 
      user.role === 'admin' && user.password === adminPassword
    );

    if (!adminUser) {
      return false;
    }

    // Restore inventory for all active sales before clearing
    sales.forEach(sale => {
      if (sale.status !== 'cancelled') {
        updateInventory(sale, true);
        // Remove commission from staff member
        removeSaleFromStaff(sale.id);
      }
    });

    setSales([]);
    return true;
  };

  return {
    sales,
    addSale,
    cancelSale,
    deleteSale,
    clearHistory,
  };
}