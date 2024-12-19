import React from 'react';
import { ImageUrlInput } from '../ImageUrlInput';
import { Images } from '../../../../../types/appearance';

interface ImageSectionProps {
  images: Images;
  onImageChange: (updates: Partial<Images>) => void;
}

export function ImageSection({ images, onImageChange }: ImageSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Imágenes</h3>
      <div className="space-y-4">
        <ImageUrlInput
          label="Logo de Inicio de Sesión"
          value={images.loginLogo}
          onChange={(url) => onImageChange({ loginLogo: url })}
          preview
        />
        <ImageUrlInput
          label="Favicon"
          value={images.favicon}
          onChange={(url) => onImageChange({ favicon: url })}
          preview
        />
        <ImageUrlInput
          label="Fondo de Inicio de Sesión"
          value={images.loginBackground}
          onChange={(url) => onImageChange({ loginBackground: url })}
          preview
        />
      </div>
    </section>
  );
}