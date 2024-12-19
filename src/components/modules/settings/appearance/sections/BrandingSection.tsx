import React from 'react';
import { BrandingForm } from '../BrandingForm';
import { Branding } from '../../../../../types/appearance';

interface BrandingSectionProps {
  branding: Branding;
  onBrandingChange: (branding: Branding) => void;
}

export function BrandingSection({ branding, onBrandingChange }: BrandingSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Marca</h3>
      <BrandingForm
        branding={branding}
        onSubmit={onBrandingChange}
      />
    </section>
  );
}