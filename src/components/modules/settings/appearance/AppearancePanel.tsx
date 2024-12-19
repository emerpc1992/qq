import React, { useState } from 'react';
import { useAppearance } from '../../../../hooks/useAppearance';
import { ColorSection } from './sections/ColorSection';
import { ImageSection } from './sections/ImageSection';
import { BrandingSection } from './sections/BrandingSection';
import { SaveNotification } from './SaveNotification';

export function AppearancePanel() {
  const {
    colors,
    images,
    branding,
    updateColors,
    updateImages,
    updateBranding,
  } = useAppearance();
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const showSavedMessage = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleColorChange = (updates: Partial<typeof colors>) => {
    updateColors(updates);
    showSavedMessage();
  };

  const handleImageChange = (updates: Partial<typeof images>) => {
    updateImages(updates);
    showSavedMessage();
  };

  const handleBrandingChange = (updates: typeof branding) => {
    updateBranding(updates);
    showSavedMessage();
  };

  return (
    <div className="space-y-8">
      <SaveNotification show={showSaveMessage} />
      <ColorSection colors={colors} onColorChange={handleColorChange} />
      <ImageSection images={images} onImageChange={handleImageChange} />
      <BrandingSection branding={branding} onBrandingChange={handleBrandingChange} />
    </div>
  );
}