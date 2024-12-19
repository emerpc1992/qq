import React, { useState } from 'react';
import { SaleList } from './SaleList';
import { SaleForm } from './SaleForm';
import { Plus, Trash2 } from 'lucide-react';
import { useSales } from '../../../hooks/useSales';
import { useProducts } from '../../../hooks/useProducts';
import { useClients } from '../../../hooks/useClients';
import { useStaff } from '../../../hooks/useStaff';
import { Sale } from '../../../types/sales';
import { AdminPasswordModal } from '../shared/AdminPasswordModal';

export function SalesModule() {
  const [isCreating, setIsCreating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { sales, addSale, deleteSale, cancelSale, clearHistory } = useSales();
  const { products } = useProducts();
  const { clients, addClient } = useClients();
  const { staff } = useStaff();

  const handleCreateSale = (saleData: Sale) => {
    addSale(saleData);
    setIsCreating(false);
  };

  const handleClearHistory = (password: string) => {
    const success = clearHistory(password);
    if (success) {
      setIsClearing(false);
      setPasswordError('');
    } else {
      setPasswordError('Contraseña incorrecta');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Ventas</h2>
          {sales.length > 0 && (
            <button
              onClick={() => setIsClearing(true)}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Borrar Historial</span>
            </button>
          )}
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nueva Venta</span>
        </button>
      </div>

      {isCreating && (
        <SaleForm
          products={products}
          clients={clients}
          staff={staff}
          onAddClient={addClient}
          onSubmit={handleCreateSale}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <SaleList
        sales={sales}
        onDelete={deleteSale}
        onCancel={cancelSale}
      />

      {isClearing && (
        <AdminPasswordModal
          onConfirm={handleClearHistory}
          onCancel={() => {
            setIsClearing(false);
            setPasswordError('');
          }}
          error={passwordError}
        />
      )}
    </div>
  );
}