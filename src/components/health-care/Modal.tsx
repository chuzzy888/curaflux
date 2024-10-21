// Modal Component
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string; // Adding title as optional for testing
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {title && <h2>{title}</h2>} {/* Make sure title is used */}
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
