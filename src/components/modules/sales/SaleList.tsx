import React, { useState } from 'react';
import { Sale } from '../../../types/sales';
import { SaleCard } from './components/SaleCard';
import { AdminPasswordModal } from '../shared/AdminPasswordModal';
import { CancellationModal } from '../shared/CancellationModal';

interface SaleListProps {
  sales: Sale[];
  onDelete: (id: string, adminPassword: string) => boolean;
  onCancel: (id: string, reason: string) => void;
}

export function SaleList({ sales, onDelete, onCancel }: SaleListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');

  // Sort sales in reverse chronological order
  const sortedSales = [...sales].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDeleteAttempt = (password: string) => {
    if (deletingId) {
      const success = onDelete(deletingId, password);
      if (success) {
        setDeletingId(null);
        setPasswordError('');
      } else {
        setPasswordError('Contraseña incorrecta');
      }
    }
  };

  if (sales.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay ventas registradas</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {sortedSales.map((sale) => (
          <SaleCard
            key={sale.id}
            sale={sale}
            onCancel={() => setCancellingId(sale.id)}
            onDelete={() => setDeletingId(sale.id)}
          />
        ))}
      </div>

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

      {cancellingId && (
        <CancellationModal
          onConfirm={(reason) => {
            onCancel(cancellingId, reason);
            setCancellingId(null);
          }}
          onCancel={() => setCancellingId(null)}
        />
      )}
    </>
  );
}