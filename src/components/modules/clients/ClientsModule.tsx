import React, { useState } from 'react';
import { ClientList } from './ClientList';
import { ClientForm } from './ClientForm';
import { ClientSearchInput } from './search/ClientSearchInput';
import { Plus } from 'lucide-react';
import { useClients } from '../../../hooks/useClients';
import { Client } from '../../../types/clients';

export function ClientsModule() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { clients, addClient, updateClient, deleteClient } = useClients();

  const handleCreateClient = (clientData: Client) => {
    addClient(clientData);
    setIsCreating(false);
  };

  const handleUpdateClient = (clientData: Client) => {
    updateClient(clientData.code, clientData);
    setEditingClient(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Clientes</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      <div className="md:w-96">
        <ClientSearchInput
          clients={clients}
          onClientSelect={setEditingClient}
          onAddClient={addClient}
        />
      </div>

      {(isCreating || editingClient) && (
        <ClientForm
          client={editingClient}
          onSubmit={editingClient ? handleUpdateClient : handleCreateClient}
          onCancel={() => {
            setIsCreating(false);
            setEditingClient(null);
          }}
        />
      )}

      <ClientList
        clients={clients}
        onEdit={setEditingClient}
        onDelete={deleteClient}
      />
    </div>
  );
}