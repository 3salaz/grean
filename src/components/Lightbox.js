import React, { useEffect } from 'react';

const Lightbox = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <img src={src} alt={alt} className="max-w-full max-h-full" onClick={(e) => e.stopPropagation()} />
    </div>
  );
};

export default Lightbox;
