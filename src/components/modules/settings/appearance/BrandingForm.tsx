import React, { useState } from 'react';
import { Branding } from '../../../../types/appearance';

interface BrandingFormProps {
  branding: Branding;
  onSubmit: (branding: Branding) => void;
}

export function BrandingForm({ branding, onSubmit }: BrandingFormProps) {
  const [formData, setFormData] = useState(branding);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Negocio
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Eslogan
        </label>
        <input
          type="text"
          value={formData.slogan}
          onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título de la Pestaña del Navegador
        </label>
        <input
          type="text"
          value={formData.browserTitle}
          onChange={(e) => setFormData({ ...formData, browserTitle: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ej: MASTER FACTU - Sistema de Gestión"
        />
        <p className="mt-1 text-sm text-gray-500">
          Este texto aparecerá en la pestaña del navegador
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}