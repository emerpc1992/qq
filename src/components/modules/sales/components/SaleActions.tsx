import React, { useState } from 'react';
import { Ban, Trash2, Printer } from 'lucide-react';
import { formatCurrency } from '../../../../utils/formatters';
import { Sale } from '../../../../types/sales';
import { InvoiceModal } from './InvoiceModal';
import { useAppearance } from '../../../../hooks/useAppearance';

interface SaleActionsProps {
  sale: Sale;
  onCancel: () => void;
  onDelete: () => void;
}

export function SaleActions({ sale, onCancel, onDelete }: SaleActionsProps) {
  const [showInvoice, setShowInvoice] = useState(false);
  const { branding } = useAppearance();

  return (
    <>
      <div className="flex items-center space-x-4">
        <p className={`text-lg font-medium ${
          sale.status === 'cancelled' ? 'text-red-600 line-through' : 'text-gray-900'
        }`}>
          {formatCurrency(sale.total)}
        </p>
        <button
          onClick={() => setShowInvoice(true)}
          className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
          title="Ver factura"
        >
          <Printer className="h-5 w-5" />
        </button>
        {sale.status !== 'cancelled' && (
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
            title="Cancelar venta"
          >
            <Ban className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
          title="Eliminar venta"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      {showInvoice && (
        <InvoiceModal
          sale={sale}
          businessName={branding.name}
          onClose={() => setShowInvoice(false)}
        />
      )}
    </>
  );
}