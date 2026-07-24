import React, { type ButtonHTMLAttributes } from 'react';
import './Button.css';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`btn btn-${variant} btn-${size} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="btn-spinner" size={16} />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
