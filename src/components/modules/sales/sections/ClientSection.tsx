import React from 'react';

interface ClientSectionProps {
  clientName: string;
  onClientNameChange: (name: string) => void;
}

export function ClientSection({ clientName, onClientNameChange }: ClientSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Cliente
      </label>
      <input
        type="text"
        value={clientName}
        onChange={(e) => onClientNameChange(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder="Nombre del cliente"
      />
    </div>
  );
}