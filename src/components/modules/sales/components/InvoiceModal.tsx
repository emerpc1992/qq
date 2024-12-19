import React from 'react';
import { Sale } from '../../../../types/sales';
import { X, Printer } from 'lucide-react';
import { ThermalInvoice } from '../invoice/ThermalInvoice';

interface InvoiceModalProps {
  sale: Sale;
  businessName: string;
  onClose: () => void;
}

function generateInvoiceNumber(sale: Sale): string {
  const timestamp = sale.id.split('-')[1];
  return `FACT-${timestamp}`;
}

export function InvoiceModal({ sale, businessName, onClose }: InvoiceModalProps) {
  const invoiceNumber = generateInvoiceNumber(sale);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-[300px] max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center no-print">
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

        <ThermalInvoice
          sale={sale}
          businessName={businessName}
          invoiceNumber={invoiceNumber}
        />
      </div>
    </div>
  );
}