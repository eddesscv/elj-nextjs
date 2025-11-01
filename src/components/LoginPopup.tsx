import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { GoogleLoginButton } from './GoogleLoginButton';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSuccess = (user: any) => {
    onSuccess?.(user);
    onClose();
  };

  const handleError = (error: any) => {
    onError?.(error);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup Content - Match GoogleLoginButton's container exactly */}
      <div className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Embed the actual GoogleLoginButton component */}
        <GoogleLoginButton
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
};