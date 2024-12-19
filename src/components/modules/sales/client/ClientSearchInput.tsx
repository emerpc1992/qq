import React, { useState, useEffect } from 'react';
import { Client } from '../../../../types/clients';
import { Search, UserPlus } from 'lucide-react';
import { generateClientCode } from '../../../../utils/clients';

interface ClientSearchInputProps {
  clients: Client[];
  onClientSelect: (client: Client) => void;
  onAddClient: (client: Client) => void;
}

export function ClientSearchInput({ clients, onClientSelect, onAddClient }: ClientSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
  });

  // Reset search results when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setIsAdding(false);
    }
  }, [searchTerm]);

  const filteredClients = clients.filter(client => {
    const search = searchTerm.toLowerCase();
    return (
      client.code.toLowerCase().includes(search) ||
      client.name.toLowerCase().includes(search) ||
      client.phone.includes(search)
    );
  });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name.trim()) return;

    const client: Client = {
      code: generateClientCode(),
      name: newClient.name.trim(),
      phone: newClient.phone.trim(),
    };

    onAddClient(client);
    onClientSelect(client);
    setSearchTerm('');
    setIsAdding(false);
    setNewClient({ name: '', phone: '' });
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
          placeholder="Buscar cliente por nombre, código o teléfono..."
        />
      </div>

      {searchTerm && !isAdding && (
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
                    {client.code} - {client.phone}
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsAdding(true)}
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
                setIsAdding(true);
                setNewClient(prev => ({ ...prev, name: searchTerm }));
              }}
              className="w-full px-4 py-2 text-left hover:bg-blue-50 text-blue-600 flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Agregar "{searchTerm}" como nuevo cliente</span>
            </button>
          )}
        </div>
      )}

      {isAdding && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Cliente</h3>
          <form onSubmit={handleAddClient} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={newClient.name}
                onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={newClient.phone}
                onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setNewClient({ name: '', phone: '' });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Agregar Cliente
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}