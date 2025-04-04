
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

  return (
    <Link to="/" className={`font-bold ${sizeClasses[size]} flex items-center`}>
      <div className="flex items-center">
        <span className="text-gray-800">V</span>
        <span className="text-gray-800 relative -top-1 -left-1">IBE</span>
        <svg 
          width={size === 'small' ? 24 : size === 'medium' ? 28 : 36} 
          height={size === 'small' ? 24 : size === 'medium' ? 28 : 36} 
          viewBox="0 0 100 100" 
          className="ml-1"
        >
          <path 
            d="M10 50 L40 80 L90 20" 
            stroke="currentColor" 
            strokeWidth="10" 
            fill="none" 
            className="text-gray-800" 
          />
        </svg>
      </div>
    </Link>
  );
};

export default Logo;
