import React from 'react';
import { Client } from '../../../../types/clients';
import { ClientSearchInput } from '../../clients/search/ClientSearchInput';

interface ClientSearchSectionProps {
  clients: Client[];
  selectedClient: Client | null;
  onClientSelect: (client: Client) => void;
  onAddClient: (client: Client) => void;
}

export function ClientSearchSection({
  clients,
  selectedClient,
  onClientSelect,
  onAddClient
}: ClientSearchSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Cliente
      </label>
      <ClientSearchInput
        clients={clients}
        onClientSelect={onClientSelect}
        onAddClient={onAddClient}
      />
      {selectedClient && (
        <div className="mt-2 p-2 bg-blue-50 rounded-lg">
          <p className="font-medium">{selectedClient.name}</p>
          <p className="text-sm text-gray-600">
            {selectedClient.code} {selectedClient.phone && `- ${selectedClient.phone}`}
          </p>
        </div>
      )}
    </div>
  );
}