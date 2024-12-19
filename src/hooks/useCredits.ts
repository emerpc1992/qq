import { useState, useEffect } from 'react';
import { Credit, Payment } from '../types/credits';
import { loadCredits, saveCredits } from '../storage/credits';
import { USERS } from '../constants/users';
import { calculateRemainingAmount } from '../utils/payments';
import { useProducts } from './useProducts';
import { validateStockAvailability } from '../utils/inventory';

export function useCredits() {
  const [credits, setCredits] = useState<Credit[]>(() => {
    const savedCredits = loadCredits() || [];
    return savedCredits.map(credit => ({
      ...credit,
      payments: credit.payments || []
    }));
  });

  const { products, updateProduct } = useProducts();

  useEffect(() => {
    saveCredits(credits);
  }, [credits]);

  const updateInventory = (credit: Credit, isAddition: boolean) => {
    credit.products.forEach(creditProduct => {
      const product = products.find(p => p.code === creditProduct.code);
      if (product) {
        const newQuantity = isAddition
          ? product.quantity + creditProduct.quantity
          : product.quantity - creditProduct.quantity;

        updateProduct(product.code, {
          ...product,
          quantity: Math.max(0, newQuantity)
        });
      }
    });
  };

  const addCredit = (creditData: Omit<Credit, 'payments'>) => {
    // Validate stock availability
    if (!validateStockAvailability(products, creditData.products)) {
      throw new Error('No hay suficiente stock disponible para algunos productos');
    }

    // Update inventory (decrease stock)
    updateInventory(creditData as Credit, false);

    const newCredit: Credit = {
      ...creditData,
      payments: []
    };
    setCredits(current => [...current, newCredit]);
  };

  const updateCredit = (code: string, creditData: Credit) => {
    setCredits(current =>
      current.map(credit =>
        credit.code === code ? creditData : credit
      )
    );
  };

  const deleteCredit = (code: string, adminPassword: string): boolean => {
    const adminUser = USERS.find(user => 
      user.role === 'admin' && user.password === adminPassword
    );

    if (!adminUser) {
      return false;
    }

    setCredits(current => {
      const creditToDelete = current.find(c => c.code === code);
      if (creditToDelete && creditToDelete.status !== 'completed') {
        // Restore inventory for deleted pending credit
        updateInventory(creditToDelete, true);
      }
      return current.filter(credit => credit.code !== code);
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

    // Restore inventory for all pending credits before clearing
    credits.forEach(credit => {
      if (credit.status !== 'completed') {
        updateInventory(credit, true);
      }
    });

    setCredits([]);
    return true;
  };

  const addPayment = (creditCode: string, payment: Payment) => {
    setCredits(current =>
      current.map(credit => {
        if (credit.code !== creditCode) return credit;

        const updatedPayments = [...credit.payments, payment];
        const remainingAmount = calculateRemainingAmount(credit.totalAmount, updatedPayments);
        
        return {
          ...credit,
          payments: updatedPayments,
          status: remainingAmount <= 0 ? 'completed' : 'pending'
        };
      })
    );
  };

  const cancelPayment = (creditCode: string, paymentId: string, reason: string) => {
    setCredits(current =>
      current.map(credit => {
        if (credit.code !== creditCode) return credit;

        const updatedPayments = credit.payments.map(payment =>
          payment.id === paymentId
            ? { ...payment, status: 'cancelled', cancellationReason: reason }
            : payment
        );

        const remainingAmount = calculateRemainingAmount(credit.totalAmount, updatedPayments);
        
        return {
          ...credit,
          payments: updatedPayments,
          status: remainingAmount <= 0 ? 'completed' : 'pending'
        };
      })
    );
  };

  const deletePayment = (creditCode: string, paymentId: string, adminPassword: string): boolean => {
    const adminUser = USERS.find(user => 
      user.role === 'admin' && user.password === adminPassword
    );

    if (!adminUser) {
      return false;
    }

    setCredits(current =>
      current.map(credit => {
        if (credit.code !== creditCode) return credit;

        const updatedPayments = credit.payments.filter(payment => payment.id !== paymentId);
        const remainingAmount = calculateRemainingAmount(credit.totalAmount, updatedPayments);

        return {
          ...credit,
          payments: updatedPayments,
          status: remainingAmount <= 0 ? 'completed' : 'pending'
        };
      })
    );

    return true;
  };

  return {
    credits,
    addCredit,
    updateCredit,
    deleteCredit,
    clearHistory,
    addPayment,
    cancelPayment,
    deletePayment,
  };
}