import React from 'react';
import { Client } from '../../../types/clients';
import { Edit2, Trash2, Phone, MessageCircle } from 'lucide-react';
import { generateClientWhatsAppMessage, getWhatsAppLink } from '../../../utils/whatsapp';

interface ClientListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (code: string) => void;
}

export function ClientList({ clients, onEdit, onDelete }: ClientListProps) {
  const handleWhatsAppClick = (client: Client) => {
    const message = generateClientWhatsAppMessage(client.name);
    const whatsappLink = getWhatsAppLink(client.phone, message);
    window.open(whatsappLink, '_blank');
  };

  if (clients.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay clientes registrados</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {clients.map((client) => (
        <div key={client.code} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {client.name}
              </h3>
              <p className="text-sm text-gray-500">Código: {client.code}</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-1" />
                {client.phone}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handleWhatsAppClick(client)}
                className="p-2 text-gray-400 hover:text-green-600 rounded-lg transition-colors"
                title="Enviar mensaje por WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              <button
                onClick={() => onEdit(client)}
                className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                title="Editar cliente"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(client.code)}
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                title="Eliminar cliente"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {client.notes && (
            <div className="mt-3 text-sm">
              <span className="font-medium text-gray-700">Notas:</span>{' '}
              {client.notes}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}