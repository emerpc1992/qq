import React, { useState } from 'react';
import { Expense, ExpenseCategory } from '../../../types/expenses';
import { formatCurrency } from '../../../utils/formatters';
import { Ban, Trash2 } from 'lucide-react';
import { CancellationModal } from './CancellationModal';
import { AdminPasswordModal } from './AdminPasswordModal';

interface ExpenseListProps {
  expenses: Expense[];
  categories: ExpenseCategory[];
  onCancelExpense: (id: string, reason: string) => void;
  onDeleteExpense: (id: string, adminPassword: string) => boolean;
}

export function ExpenseList({ expenses, categories, onCancelExpense, onDeleteExpense }: ExpenseListProps) {
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Sin categoría';
  };

  const handleDeleteAttempt = (password: string) => {
    if (deletingId) {
      const success = onDeleteExpense(deletingId, password);
      if (success) {
        setDeletingId(null);
        setPasswordError('');
      } else {
        setPasswordError('Contraseña incorrecta');
      }
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay gastos registrados</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className={`bg-white p-6 rounded-lg shadow-sm border ${
              expense.status === 'cancelled' ? 'border-red-200 bg-red-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {expense.reason}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    expense.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {expense.status === 'cancelled' ? 'Cancelado' : 'Activo'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Categoría: {getCategoryName(expense.category)}
                </p>
                <p className="text-sm text-gray-500">
                  Fecha: {new Date(expense.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-lg font-medium text-gray-900">
                  {formatCurrency(expense.amount)}
                </p>
              </div>

              <div className="flex space-x-2">
                {expense.status === 'active' && (
                  <button
                    onClick={() => setCancellingId(expense.id)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Cancelar gasto"
                  >
                    <Ban className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => setDeletingId(expense.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                  title="Eliminar gasto"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {expense.notes && (
              <div className="mt-3 text-sm">
                <span className="font-medium text-gray-700">Nota:</span>{' '}
                {expense.notes}
              </div>
            )}

            {expense.status === 'cancelled' && expense.cancellationReason && (
              <div className="mt-3 text-sm text-red-600">
                <span className="font-medium">Motivo de cancelación:</span>{' '}
                {expense.cancellationReason}
              </div>
            )}
          </div>
        ))}
      </div>

      {cancellingId && (
        <CancellationModal
          onConfirm={(reason) => {
            onCancelExpense(cancellingId, reason);
            setCancellingId(null);
          }}
          onCancel={() => setCancellingId(null)}
        />
      )}

      {deletingId && (
        <AdminPasswordModal
          onConfirm={handleDeleteAttempt}
          onCancel={() => {
            setDeletingId(null);
            setPasswordError('');
          }}
          error={passwordError}
        />
      )}
    </>
  );
}