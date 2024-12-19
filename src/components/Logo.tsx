import React from 'react';
import { Receipt } from 'lucide-react';
import { useAppearance } from '../hooks/useAppearance';

interface LogoProps {
  showSlogan?: boolean;
  className?: string;
  variant?: 'default' | 'compact';
}

export function Logo({ showSlogan = true, className = '', variant = 'default' }: LogoProps) {
  const { branding, colors, images } = useAppearance();
  const textSizeClass = variant === 'compact' ? 'text-lg' : 'text-2xl';
  const iconSizeClass = variant === 'compact' ? 'h-6 w-6' : 'h-8 w-8';

  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-center justify-center space-x-2">
        {images.loginLogo ? (
          <img 
            src={images.loginLogo} 
            alt={branding.name}
            className={iconSizeClass}
          />
        ) : (
          <Receipt 
            className={`${iconSizeClass}`}
            style={{ color: colors.primary }}
          />
        )}
        <h2 
          className={`${textSizeClass} font-bold text-gray-900`}
          style={{ color: colors.primary }}
        >
          {branding.name}
        </h2>
      </div>
      {showSlogan && (
        <p 
          className="text-sm font-medium mt-1"
          style={{ color: colors.primary }}
        >
          {branding.slogan}
        </p>
      )}
    </div>
  );
}