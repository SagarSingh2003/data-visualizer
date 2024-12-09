import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Popup({ isOpen, onClose, title, children }: PopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="popup-overlay"
      onClick={handleOverlayClick}
    >
      <div className="popup-container">
        <div className="popup-header">
          <h2 className="popup-title">{title}</h2>
          <button
            onClick={onClose}
            className="popup-close-btn"
          >
            <X size={20} />
          </button>
        </div>
        <div className="popup-content">
          {children}
        </div>
      </div>
    </div>
  );
}
