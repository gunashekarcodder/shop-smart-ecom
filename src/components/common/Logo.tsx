
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  // Determine size classes
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
  };

  // Set logo dimensions based on size
  const logoSize = {
    small: 30,
    medium: 40,
    large: 50,
  };

  return (
    <Link to="/" className={`font-bold ${sizeClasses[size]} flex items-center`}>
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="rounded-full bg-brand-primary flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/aab8ffe0-b88f-45da-834a-8598d01daeb1.png" 
              alt="VIBE Logo" 
              className="h-auto"
              width={logoSize[size]}
              height={logoSize[size]}
            />
          </div>
        </div>
        <span className="text-brand-primary uppercase tracking-wider">VIBE</span>
      </div>
    </Link>
  );
};

export default Logo;
