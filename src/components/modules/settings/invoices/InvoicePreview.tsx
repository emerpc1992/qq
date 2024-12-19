import React from 'react';
import { InvoiceSettings } from '../../../../types/appearance';
import { useAppearance } from '../../../../hooks/useAppearance';

interface InvoicePreviewProps {
  type: 'sales' | 'credits';
  settings: InvoiceSettings;
}

export function InvoicePreview({ type, settings }: InvoicePreviewProps) {
  const { branding } = useAppearance();

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Vista Previa</h3>
      
      <div 
        className="border rounded-lg overflow-hidden bg-white"
        style={{ 
          width: `${settings.width}mm`,
          margin: '0 auto',
          fontSize: `${settings.fontSize}pt`,
        }}
      >
        <div className="p-4 space-y-4">
          {settings.showLogo && settings.logo.url && (
            <div className="flex justify-center">
              <img
                src={settings.logo.url}
                alt={settings.header.title || branding.name}
                style={{
                  width: `${settings.logo.width}px`,
                  height: `${settings.logo.height}px`,
                  objectFit: 'contain',
                }}
              />
            </div>
          )}

          {settings.showHeader && (
            <div className="text-center space-y-1">
              <h2 className="font-bold">{settings.header.title || branding.name}</h2>
              {settings.header.subtitle && (
                <p className="text-sm">{settings.header.subtitle}</p>
              )}
              {settings.header.address && (
                <p className="text-xs">{settings.header.address}</p>
              )}
              {settings.header.phone && (
                <p className="text-xs">Tel: {settings.header.phone}</p>
              )}
              {settings.header.email && (
                <p className="text-xs">{settings.header.email}</p>
              )}
            </div>
          )}

          <div className="border-t border-dashed my-2" />

          <div className="space-y-1 text-sm">
            <p><strong>Cliente:</strong> Juan Pérez</p>
            <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>{type === 'sales' ? 'Venta' : 'Crédito'}:</strong> #12345</p>
          </div>

          <div className="border-t border-dashed my-2" />

          <div className="space-y-2">
            <div className="text-sm">
              <div className="font-bold">Producto de Ejemplo</div>
              <div className="flex justify-between">
                <span>2 x $50.00</span>
                <span>$100.00</span>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed my-2" />

          <div className="text-right space-y-1">
            <p><strong>Total:</strong> $100.00</p>
          </div>

          {settings.showFooter && (
            <>
              <div className="border-t border-dashed my-2" />
              <div className="text-center text-sm">
                {settings.footerText && <p>{settings.footerText}</p>}
                {settings.additionalNotes && (
                  <p className="text-xs mt-2">{settings.additionalNotes}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}