import React, { useState } from 'react';
import { Credit, Payment } from '../../../types/credits';
import { formatCurrency } from '../../../utils/formatters';
import { calculateRemainingAmount } from '../../../utils/payments';
import { Edit2, Trash2, MessageCircle, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { generateWhatsAppMessage, getWhatsAppLink } from '../../../utils/whatsapp';
import { AdminPasswordModal } from '../shared/AdminPasswordModal';
import { PaymentForm } from './payments/PaymentForm';
import { PaymentList } from './payments/PaymentList';

interface CreditListProps {
  credits: Credit[];
  onUpdate: (code: string, credit: Credit) => void;
  onDelete: (code: string, adminPassword: string) => boolean;
  onAddPayment: (creditCode: string, payment: Payment) => void;
  onCancelPayment: (creditCode: string, paymentId: string, reason: string) => void;
  onDeletePayment: (creditCode: string, paymentId: string, adminPassword: string) => boolean;
}

export function CreditList({ 
  credits, 
  onUpdate, 
  onDelete,
  onAddPayment,
  onCancelPayment,
  onDeletePayment
}: CreditListProps) {
  const [deletingCode, setDeletingCode] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');
  const [payingCredit, setPayingCredit] = useState<Credit | null>(null);
  const [expandedCredits, setExpandedCredits] = useState<Set<string>>(new Set());

  const handleWhatsAppClick = (credit: Credit) => {
    const message = generateWhatsAppMessage({
      clientName: credit.clientName,
      dueDate: credit.dueDate,
      amount: credit.totalAmount,
      products: credit.products,
    });
    const whatsappLink = getWhatsAppLink(credit.clientPhone, message);
    window.open(whatsappLink, '_blank');
  };

  const handleDeleteAttempt = (password: string) => {
    if (deletingCode) {
      const success = onDelete(deletingCode, password);
      if (success) {
        setDeletingCode(null);
        setPasswordError('');
      } else {
        setPasswordError('Contraseña incorrecta');
      }
    }
  };

  const toggleExpand = (code: string) => {
    const newExpanded = new Set(expandedCredits);
    if (newExpanded.has(code)) {
      newExpanded.delete(code);
    } else {
      newExpanded.add(code);
    }
    setExpandedCredits(newExpanded);
  };

  if (credits.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay créditos registrados</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {credits.map((credit) => {
          const remainingAmount = calculateRemainingAmount(credit.totalAmount, credit.payments);
          const isExpanded = expandedCredits.has(credit.code);
          
          return (
            <div key={credit.code} className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleExpand(credit.code)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      <h3 className="text-lg font-medium text-gray-900">
                        {credit.clientName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        credit.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {credit.status === 'completed' ? 'Completado' : 'Pendiente'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 ml-8">Código: {credit.code}</p>
                    <div className="flex justify-between items-center mt-2 ml-8">
                      <p className="text-sm text-gray-500">
                        Vencimiento: {new Date(credit.dueDate).toLocaleDateString()}
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        Restante: {formatCurrency(remainingAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPayingCredit(credit)}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                      title="Agregar pago"
                    >
                      <DollarSign className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleWhatsAppClick(credit)}
                      className="p-2 text-gray-400 hover:text-green-600 rounded-lg transition-colors"
                      title="Enviar mensaje por WhatsApp"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setDeletingCode(credit.code)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Eliminar crédito"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t px-6 py-4 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Productos:</h4>
                    {credit.products.map((product, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{product.name} ({product.quantity}x)</span>
                        <span>{formatCurrency(product.subtotal)}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t flex justify-between font-medium">
                      <span>Total:</span>
                      <span>{formatCurrency(credit.totalAmount)}</span>
                    </div>
                  </div>

                  {credit.notes && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Notas:</span>{' '}
                      {credit.notes}
                    </div>
                  )}

                  {credit.payments.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Pagos:</h4>
                      <PaymentList
                        payments={credit.payments}
                        credit={credit}
                        onCancelPayment={(paymentId, reason) => 
                          onCancelPayment(credit.code, paymentId, reason)
                        }
                        onDeletePayment={(paymentId, adminPassword) => 
                          onDeletePayment(credit.code, paymentId, adminPassword)
                        }
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {deletingCode && (
        <AdminPasswordModal
          onConfirm={handleDeleteAttempt}
          onCancel={() => {
            setDeletingCode(null);
            setPasswordError('');
          }}
          error={passwordError}
        />
      )}

      {payingCredit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Agregar Pago - {payingCredit.clientName}
            </h3>
            <PaymentForm
              maxAmount={calculateRemainingAmount(payingCredit.totalAmount, payingCredit.payments)}
              onSubmit={(payment) => {
                onAddPayment(payingCredit.code, payment);
                setPayingCredit(null);
              }}
              onCancel={() => setPayingCredit(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}