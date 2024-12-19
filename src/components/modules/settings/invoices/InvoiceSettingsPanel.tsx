import React from 'react';
import { useAppearance } from '../../../../hooks/useAppearance';
import { InvoiceTypeSelector } from './InvoiceTypeSelector';
import { InvoiceSettingsForm } from './InvoiceSettingsForm';
import { InvoicePreview } from './InvoicePreview';

type InvoiceType = 'sales' | 'credits';

export function InvoiceSettingsPanel() {
  const [selectedType, setSelectedType] = React.useState<InvoiceType>('sales');
  const { invoiceSettings, updateInvoiceSettings } = useAppearance();

  const handleSettingsChange = (settings: any) => {
    updateInvoiceSettings({
      ...invoiceSettings,
      [selectedType]: settings,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Configuración de Facturas</h2>
        <InvoiceTypeSelector
          value={selectedType}
          onChange={setSelectedType}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <InvoiceSettingsForm
            settings={invoiceSettings[selectedType]}
            onChange={handleSettingsChange}
          />
        </div>
        <div>
          <InvoicePreview
            type={selectedType}
            settings={invoiceSettings[selectedType]}
          />
        </div>
      </div>
    </div>
  );
}