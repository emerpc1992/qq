import React from 'react';
import { SaleForm } from './SaleForm';
import { Product } from '../../../types/products';
import { Client } from '../../../types/clients';
import { Staff } from '../../../types/staff';
import { Sale } from '../../../types/sales';

interface SalesWindowProps {
  products: Product[];
  clients: Client[];
  staff: Staff[];
  onAddClient: (client: Client) => void;
  onSubmit: (sale: Sale) => void;
}

export function SalesWindow({ products, clients, staff, onAddClient, onSubmit }: SalesWindowProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Nueva Venta</h1>
        <SaleForm
          products={products}
          clients={clients}
          staff={staff}
          onAddClient={onAddClient}
          onSubmit={(sale) => {
            onSubmit(sale);
            window.close();
          }}
          onCancel={() => window.close()}
        />
      </div>
    </div>
  );
}