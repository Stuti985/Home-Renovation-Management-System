import React from 'react';
import './Card.css';

export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`custom-card glass-panel ${className}`} {...props}>
      {children}
    </div>
  );
}
