import React from 'react';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AuthLayout defines the basic structure for authentication-related views.
 * It provides a full-screen, centered container for its children (e.g., a login or sign-up form).
 * The children are expected to provide their own card-like styling if needed.
 *
 * @param {React.ReactNode} children - The content to be rendered within the layout (e.g., LoginForm).
 * @param {string} [className] - Optional additional class names for the main layout container.
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className }) => {
  return (
    <main
      className={cn(
        'flex items-center justify-center min-h-screen bg-background',
        className
      )}
    >
      {children}
    </main>
  );
};

export default AuthLayout;
