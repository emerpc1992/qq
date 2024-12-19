import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Client } from '../../../../types/clients';
import { ClientQuickForm } from './ClientQuickForm';

interface ClientSearchInputProps {
  clients: Client[];
  onClientSelect: (client: Client) => void;
  onAddClient: (client: Client) => void;
}

export function ClientSearchInput({ clients, onClientSelect, onAddClient }: ClientSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const filteredClients = clients.filter(client => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.code.toLowerCase().includes(searchLower) ||
      client.name.toLowerCase().includes(searchLower) ||
      client.phone.includes(searchLower)
    );
  });

  const handleAddClient = (clientData: Omit<Client, 'code'>) => {
    onAddClient({
      ...clientData,
      code: `CLI-${Date.now()}`,
    });
    setIsAddingNew(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Buscar por nombre, código o teléfono..."
        />
      </div>

      {searchTerm && !isAddingNew && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border max-h-60 overflow-auto">
          {filteredClients.length > 0 ? (
            <>
              {filteredClients.map((client) => (
                <button
                  key={client.code}
                  type="button"
                  onClick={() => {
                    onClientSelect(client);
                    setSearchTerm('');
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  <div className="font-medium">{client.name}</div>
                  <div className="text-sm text-gray-500">
                    {client.code} {client.phone && `- ${client.phone}`}
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsAddingNew(true)}
                className="w-full px-4 py-2 text-left hover:bg-blue-50 text-blue-600 flex items-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Agregar nuevo cliente</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsAddingNew(true);
              }}
              className="w-full px-4 py-2 text-left hover:bg-blue-50 text-blue-600 flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Agregar "{searchTerm}" como nuevo cliente</span>
            </button>
          )}
        </div>
      )}

      {isAddingNew && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border p-4">
          <ClientQuickForm
            initialName={searchTerm}
            onSubmit={handleAddClient}
            onCancel={() => {
              setIsAddingNew(false);
              setSearchTerm('');
            }}
          />
        </div>
      )}
    </div>
  );
}