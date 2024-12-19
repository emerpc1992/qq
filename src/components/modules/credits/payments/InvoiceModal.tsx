import React from 'react';
import { Credit, Payment } from '../../../../types/credits';
import { formatCurrency } from '../../../../utils/formatters';
import { calculateRemainingAmount } from '../../../../utils/payments';
import { X, Printer } from 'lucide-react';

interface InvoiceModalProps {
  credit: Credit;
  payment: Payment;
  businessName: string;
  onClose: () => void;
}

function generateInvoiceNumber(payment: Payment): string {
  const timestamp = payment.id.split('-')[1];
  return `FACT-${timestamp}`;
}

export function InvoiceModal({ credit, payment, businessName, onClose }: InvoiceModalProps) {
  const remainingAmount = calculateRemainingAmount(credit.totalAmount, credit.payments);
  const invoiceNumber = generateInvoiceNumber(payment);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-[300px] max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium">Comprobante</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
              title="Imprimir"
            >
              <Printer className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-red-600 rounded-lg transition-colors"
              title="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4" id="printable-invoice">
          <div className="text-center mb-4 pb-4 border-b">
            <h1 className="text-lg font-bold">{businessName}</h1>
            <p className="text-sm">Comprobante de Pago</p>
            <p className="text-sm">N° {invoiceNumber}</p>
          </div>

          <div className="space-y-1 text-sm mb-4">
            <p><strong>Cliente:</strong> {credit.clientName}</p>
            <p><strong>Teléfono:</strong> {credit.clientPhone}</p>
            <p><strong>Fecha:</strong> {new Date(payment.date).toLocaleDateString()}</p>
            <p><strong>Método:</strong> {
              payment.method === 'cash' ? 'Efectivo' :
              payment.method === 'card' ? 'Tarjeta' : 'Transferencia'
            }</p>
            {payment.reference && (
              <p><strong>Ref:</strong> {payment.reference}</p>
            )}
            <p><strong>Crédito:</strong> {credit.code}</p>
          </div>

          <div className="border-t border-b py-2 mb-4">
            <div className="text-sm font-bold mb-2">Productos:</div>
            {credit.products.map((product, index) => (
              <div key={index} className="text-sm mb-2">
                <div>{product.name}</div>
                <div className="flex justify-between">
                  <span>{product.quantity}x {formatCurrency(product.price)}</span>
                  <span>{formatCurrency(product.subtotal)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Total Crédito:</span>
              <span>{formatCurrency(credit.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Monto Pagado:</span>
              <span>{formatCurrency(payment.amount)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Saldo Pendiente:</span>
              <span>{formatCurrency(remainingAmount)}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t text-center text-xs space-y-1">
            <p>¡Gracias por su pago!</p>
            <p>Comprobante válido de pago</p>
          </div>
        </div>
      </div>
    </div>
  );
}