import React, { type HTMLAttributes } from 'react';
import './Typography.css';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'muted';
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  as,
  className = '',
  children,
  ...props
}) => {
  const Component = as || (
    variant.startsWith('h') ? variant : variant === 'small' ? 'small' : 'p'
  ) as React.ElementType;

  return (
    <Component className={`typography typography-${variant} ${className}`} {...props}>
      {children}
    </Component>
  );
};
