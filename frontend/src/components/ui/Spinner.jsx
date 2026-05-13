import React from 'react';
import './Spinner.css';

export default function Spinner({ size = 'md', color = 'var(--accent-primary)', className = '' }) {
  const sizeMap = {
    sm: '20px',
    md: '40px',
    lg: '60px'
  };

  return (
    <div 
      className={`spinner-wrapper ${className}`}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        borderColor: 'var(--glass-border)',
        borderTopColor: color
      }}
    ></div>
  );
}
