import React from 'react';
import logoImg from '../assets/images/logo_lideres_futuro_1784939634912.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  variant?: 'icon' | 'full' | 'horizontal';
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  animated = false,
}) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-10 sm:h-12',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-28',
    hero: 'h-32 sm:h-40 md:h-48',
  };

  const animationClass = animated ? 'hover:scale-105 transition-transform duration-300' : '';

  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${sizeMap[size]} aspect-square ${className}`}>
        <img
          src={logoImg}
          alt="Líderes del Futuro"
          className={`w-full h-full object-contain ${animationClass}`}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <img
        src={logoImg}
        alt="Líderes del Futuro"
        className={`h-full w-auto object-contain ${animationClass}`}
      />
    </div>
  );
};


