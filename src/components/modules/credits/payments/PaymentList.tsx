import React, { useState } from 'react';
import { Payment, Credit } from '../../../../types/credits';
import { formatCurrency } from '../../../../utils/formatters';
import { Ban, Trash2, Printer } from 'lucide-react';
import { CancellationModal } from './CancellationModal';
import { AdminPasswordModal } from '../../shared/AdminPasswordModal';
import { InvoiceModal } from './InvoiceModal';
import { useAppearance } from '../../../../hooks/useAppearance';

interface PaymentListProps {
  payments: Payment[];
  credit: Credit;
  onCancelPayment: (id: string, reason: string) => void;
  onDeletePayment: (id: string, adminPassword: string) => boolean;
}

export function PaymentList({ payments, credit, onCancelPayment, onDeletePayment }: PaymentListProps) {
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const { branding } = useAppearance();

  const handleDeleteAttempt = (password: string) => {
    if (deletingId) {
      const success = onDeletePayment(deletingId, password);
      if (success) {
        setDeletingId(null);
        setPasswordError('');
      } else {
        setPasswordError('Contraseña incorrecta');
      }
    }
  };

  return (
    <>
      <div className="space-y-2">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className={`p-4 rounded-lg border ${
              payment.status === 'cancelled' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    payment.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {payment.status === 'cancelled' ? 'Cancelado' : 'Activo'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Fecha: {new Date(payment.date).toLocaleDateString()}
                </p>
                <p className="text-lg font-medium text-gray-900">
                  {formatCurrency(payment.amount)}
                </p>
                <p className="text-sm text-gray-600">
                  Método: {
                    payment.method === 'cash' ? 'Efectivo' :
                    payment.method === 'card' ? 'Tarjeta' : 'Transferencia'
                  }
                </p>
                {payment.reference && (
                  <p className="text-sm text-gray-600">
                    Referencia: {payment.reference}
                  </p>
                )}
              </div>

              <div className="flex space-x-2">
                {payment.status === 'active' && (
                  <>
                    <button
                      onClick={() => setSelectedPayment(payment)}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                      title="Ver comprobante"
                    >
                      <Printer className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCancellingId(payment.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Cancelar pago"
                    >
                      <Ban className="h-5 w-5" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setDeletingId(payment.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                  title="Eliminar pago"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {payment.status === 'cancelled' && payment.cancellationReason && (
              <div className="mt-3 text-sm text-red-600">
                <span className="font-medium">Motivo de cancelación:</span>{' '}
                {payment.cancellationReason}
              </div>
            )}
          </div>
        ))}
      </div>

      {cancellingId && (
        <CancellationModal
          onConfirm={(reason) => {
            onCancelPayment(cancellingId, reason);
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

      {selectedPayment && (
        <InvoiceModal
          credit={credit}
          payment={selectedPayment}
          businessName={branding.name}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </>
  );
}