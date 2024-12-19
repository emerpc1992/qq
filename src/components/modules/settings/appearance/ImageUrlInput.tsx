import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageUrlInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  preview?: boolean;
}

export function ImageUrlInput({ label, value, onChange, preview }: ImageUrlInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>
        {preview && value && (
          <div className="w-16 h-16 border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
            {value ? (
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.classList.add('hidden');
                }}
              />
            ) : (
              <ImageIcon className="w-6 h-6 text-gray-400" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}