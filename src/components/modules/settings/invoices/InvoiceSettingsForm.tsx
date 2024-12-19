import React from 'react';
import { InvoiceSettings } from '../../../../types/appearance';
import { ImageUrlInput } from '../appearance/ImageUrlInput';

interface InvoiceSettingsFormProps {
  settings: InvoiceSettings;
  onChange: (settings: InvoiceSettings) => void;
}

export function InvoiceSettingsForm({ settings, onChange }: InvoiceSettingsFormProps) {
  const handleChange = (field: keyof InvoiceSettings, value: any) => {
    onChange({
      ...settings,
      [field]: value,
    });
  };

  const handleLogoChange = (field: keyof typeof settings.logo, value: any) => {
    onChange({
      ...settings,
      logo: {
        ...settings.logo,
        [field]: value,
      },
    });
  };

  const handleHeaderChange = (field: keyof typeof settings.header, value: string) => {
    onChange({
      ...settings,
      header: {
        ...settings.header,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Logo</h3>
        <div className="space-y-4">
          <ImageUrlInput
            label="URL del Logo"
            value={settings.logo.url}
            onChange={(url) => handleLogoChange('url', url)}
            preview
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ancho del Logo (px)
              </label>
              <input
                type="number"
                value={settings.logo.width}
                onChange={(e) => handleLogoChange('width', Number(e.target.value))}
                min={50}
                max={300}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alto del Logo (px)
              </label>
              <input
                type="number"
                value={settings.logo.height}
                onChange={(e) => handleLogoChange('height', Number(e.target.value))}
                min={50}
                max={300}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Dimensiones</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ancho del Ticket (mm)
            </label>
            <input
              type="number"
              value={settings.width}
              onChange={(e) => handleChange('width', Number(e.target.value))}
              min={50}
              max={120}
              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tamaño de Fuente (pt)
            </label>
            <input
              type="number"
              value={settings.fontSize}
              onChange={(e) => handleChange('fontSize', Number(e.target.value))}
              min={8}
              max={14}
              step={0.5}
              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Encabezado</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.showHeader}
              onChange={(e) => handleChange('showHeader', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label className="ml-2 text-sm text-gray-700">
              Mostrar encabezado
            </label>
          </div>

          {settings.showHeader && (
            <div className="space-y-4 pl-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={settings.header.title}
                  onChange={(e) => handleHeaderChange('title', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={settings.header.subtitle}
                  onChange={(e) => handleHeaderChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  value={settings.header.address}
                  onChange={(e) => handleHeaderChange('address', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={settings.header.phone}
                  onChange={(e) => handleHeaderChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.header.email}
                  onChange={(e) => handleHeaderChange('email', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Pie de Página</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.showFooter}
              onChange={(e) => handleChange('showFooter', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label className="ml-2 text-sm text-gray-700">
              Mostrar pie de página
            </label>
          </div>

          {settings.showFooter && (
            <div className="space-y-4 pl-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texto del Pie
                </label>
                <input
                  type="text"
                  value={settings.footerText}
                  onChange={(e) => handleChange('footerText', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas Adicionales
                </label>
                <textarea
                  value={settings.additionalNotes}
                  onChange={(e) => handleChange('additionalNotes', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}