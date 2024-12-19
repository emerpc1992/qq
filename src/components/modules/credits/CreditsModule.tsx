import React, { useState } from 'react';
import { CreditList } from './CreditList';
import { CreditForm } from './CreditForm';
import { CreditSearch } from './CreditSearch';
import { Plus, Trash2 } from 'lucide-react';
import { useCredits } from '../../../hooks/useCredits';
import { useProducts } from '../../../hooks/useProducts';
import { Credit } from '../../../types/credits';
import { AdminPasswordModal } from '../shared/AdminPasswordModal';

export function CreditsModule() {
  const [isCreating, setIsCreating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { credits, addCredit, updateCredit, deleteCredit, clearHistory, addPayment, cancelPayment, deletePayment } = useCredits();
  const { products } = useProducts();

  const handleCreateCredit = (creditData: Omit<Credit, 'payments' | 'remainingAmount'>) => {
    addCredit(creditData);
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

  const filteredCredits = credits.filter(credit => {
    const searchLower = searchTerm.toLowerCase();
    return (
      credit.code.toLowerCase().includes(searchLower) ||
      credit.clientName.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Créditos</h2>
          {credits.length > 0 && (
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
          <span>Nuevo Crédito</span>
        </button>
      </div>

      <div className="md:w-64">
        <CreditSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {isCreating && (
        <CreditForm
          products={products}
          onSubmit={handleCreateCredit}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <CreditList
        credits={filteredCredits}
        onUpdate={updateCredit}
        onDelete={deleteCredit}
        onAddPayment={addPayment}
        onCancelPayment={cancelPayment}
        onDeletePayment={deletePayment}
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