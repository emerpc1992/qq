import React, { useState } from 'react';
import { Sale, SaleProduct, PaymentMethod } from '../../../types/sales';
import { Product } from '../../../types/products';
import { Client } from '../../../types/clients';
import { Staff } from '../../../types/staff';
import { validateStockAvailability } from '../../../utils/inventory';
import { generateSaleId } from '../../../utils/sales';
import { ClientSearchSection } from './sections/ClientSearchSection';
import { StaffSection } from './sections/StaffSection';
import { ProductSection } from './sections/ProductSection';
import { PaymentSection } from './sections/PaymentSection';
import { NotesSection } from './sections/NotesSection';

interface SaleFormProps {
  products: Product[];
  clients: Client[];
  staff: Staff[];
  onAddClient: (client: Client) => void;
  onSubmit: (sale: Sale) => void;
  onCancel: () => void;
}

export function SaleForm({ products, clients, staff, onAddClient, onSubmit, onCancel }: SaleFormProps) {
  const [error, setError] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<SaleProduct[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [commission, setCommission] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [reference, setReference] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedClient) {
      setError('Debe seleccionar un cliente');
      return;
    }

    if (selectedProducts.length === 0) {
      setError('Debe agregar al menos un producto');
      return;
    }

    try {
      // Validate stock availability
      if (!validateStockAvailability(products, selectedProducts)) {
        setError('No hay suficiente stock disponible para algunos productos');
        return;
      }

      const total = selectedProducts.reduce((sum, p) => sum + p.subtotal, 0);
      const commissionAmount = selectedStaff ? (total * commission) / 100 : 0;

      const sale: Sale = {
        id: generateSaleId(),
        date: new Date().toISOString(),
        client: selectedClient,
        products: selectedProducts,
        total,
        notes,
        payment: {
          method: paymentMethod,
          ...(paymentMethod !== 'cash' && { reference })
        },
        staff: selectedStaff ? {
          member: selectedStaff,
          commission,
          commissionAmount
        } : undefined,
        status: 'active'
      };

      onSubmit(sale);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la venta');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <ClientSearchSection
          clients={clients}
          selectedClient={selectedClient}
          onClientSelect={setSelectedClient}
          onAddClient={onAddClient}
        />

        <StaffSection
          staff={staff}
          selectedStaff={selectedStaff}
          commission={commission}
          onStaffSelect={setSelectedStaff}
          onCommissionChange={setCommission}
        />
      </div>

      <ProductSection
        products={products}
        selectedProducts={selectedProducts}
        onProductsChange={setSelectedProducts}
      />

      {selectedProducts.length > 0 && (
        <PaymentSection
          paymentMethod={paymentMethod}
          reference={reference}
          onPaymentMethodChange={setPaymentMethod}
          onReferenceChange={setReference}
        />
      )}

      <NotesSection
        notes={notes}
        onNotesChange={setNotes}
      />

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!selectedProducts.length || !selectedClient || (paymentMethod !== 'cash' && !reference)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
        >
          Completar Venta
        </button>
      </div>
    </form>
  );
}