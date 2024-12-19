import React from 'react';
import { ColorPicker } from '../ColorPicker';
import { Colors } from '../../../../../types/appearance';

interface ColorSectionProps {
  colors: Colors;
  onColorChange: (updates: Partial<Colors>) => void;
}

export function ColorSection({ colors, onColorChange }: ColorSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Colores del Tema</h3>
      <div className="grid gap-6 md:grid-cols-2">
        <ColorPicker
          label="Color Primario"
          value={colors.primary}
          onChange={(color) => onColorChange({ primary: color })}
        />
        <ColorPicker
          label="Color Secundario"
          value={colors.secondary}
          onChange={(color) => onColorChange({ secondary: color })}
        />
        <ColorPicker
          label="Color del Botón de Login"
          value={colors.loginButton}
          onChange={(color) => onColorChange({ loginButton: color })}
        />
      </div>
    </section>
  );
}